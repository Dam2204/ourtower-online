import { config } from '../../config/config.js';
import {
  CANVAS_HEIGH,
  CANVAS_WIDTH,
  INIT_BASE_DATA,
  INIT_BASE_HP,
  INIT_GOLD,
  INIT_MONSTER_SPAWN_INTERVAL,
  INIT_TOWER_COST,
} from '../../constants/game.js';
import {
  findHighScoreByUserId,
  findUserIdByAccountId,
  updateHighScore,
} from '../../db/user/user.db.js';
import {
  gameStartNotification,
  gameOverNotification,
  updateBaseHpNotification,
} from '../../utils/notification/game.notification.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = config.game.state.waiting;
    this.path = [];
  }

  // Game에 User가 참가
  addUser(user) {
    this.users.push(user);

    if (this.users.length >= config.game.maxPlayer) {
      // throw new Error('게임 인원이 가득 차 참가하실 수 없습니다.');
    }

    if (this.users.length === config.game.maxPlayer) {
      setTimeout(() => {
        this.startGame(user.id);
      }, 2000);
    }
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
    // this.intervalManager.removePlayer(userId);
  }

  getOpponentUserId(userId) {
    const opponentUser = this.users.find((user) => user.id !== userId);
    return opponentUser.id;
  }

  async getUserHighScore(userId) {
    const user = this.getUser(userId);
    const dbUserHighScore = await findHighScoreByUserId(user.id);
    return dbUserHighScore;
  }

  async startGame(userId) {
    if (this.users.length !== config.game.maxPlayer) {
      return false;
    }

    this.state = config.game.state.playing;
    this.path = this.initMonsterPath(CANVAS_WIDTH, CANVAS_HEIGH);

    const playerHighScore = await this.getUserHighScore(userId);
    const opponentUserId = this.getOpponentUserId(userId);
    const opponentHighScore = await this.getUserHighScore(opponentUserId);

    const initialGameState = {
      baseHp: INIT_BASE_HP,
      towerCost: INIT_TOWER_COST,
      initialGold: INIT_GOLD,
      monsterSpawnInterval: INIT_MONSTER_SPAWN_INTERVAL,
    };
    const playerData = {
      gold: INIT_GOLD,
      base: INIT_BASE_DATA,
      highScore: playerHighScore,
      towers: [],
      monsters: [],
      monsterLevel: 0,
      score: 0,
      monsterPath: this.path,
      basePosition: this.path[this.path.length - 1],
    };
    const opponentData = {
      gold: INIT_GOLD,
      base: INIT_BASE_DATA,
      highScore: opponentHighScore,
      towers: [],
      monsters: [],
      monsterLevel: 0,
      score: 0,
      monsterPath: this.path,
      basePosition: this.path[this.path.length - 1],
    };

    this.users.forEach((user, index) => {
      let startPacket = null;
      if (userId === user.id)
        startPacket = gameStartNotification(initialGameState, playerData, opponentData);
      else startPacket = gameStartNotification(initialGameState, opponentData, playerData);
      user.socket.write(startPacket);
    });

    return true;
  }

  initMonsterPath(width, height) {
    const path = [];
    let currentX = 10;
    let currentY = Math.floor(Math.random() * 21) + 400; // 500 ~ 520 범위의 y 시작 (캔버스 y축 중간쯤에서 시작할 수 있도록 유도)

    path.push({ x: currentX, y: currentY });

    while (currentX < width) {
      currentX += Math.floor(Math.random() * 100) + 50; // 50 ~ 150 범위의 x 증가
      // x 좌표에 대한 clamp 처리
      if (currentX < 0) {
        currentX = 0;
      }
      if (currentX > width) {
        currentX = width;
      }

      currentY += Math.floor(Math.random() * 200) - 100; // -100 ~ 100 범위의 y 변경
      // y 좌표에 대한 clamp 처리
      if (currentY < 0) {
        currentY = 0;
      }
      if (currentY > height) {
        currentY = height;
      }

      path.push({ x: currentX, y: currentY });
    }

    return path;
  }

  getAllBaseHp(attackedUserId, attackedUserBaseHp) {
    this.users.forEach((user) => {
      let packet = null;
      if (user.id === attackedUserId) {
        packet = updateBaseHpNotification(false, attackedUserBaseHp);
      } else {
        packet = updateBaseHpNotification(true, attackedUserBaseHp);
      }
      user.socket.write(packet);
    });
  }

  async gameOver() {
    for (const user of this.users) {
      const dbUserId = await findUserIdByAccountId(user.id);
      const dbHighScore = await findHighScoreByUserId(dbUserId);
      if (user.score > dbHighScore) {
        await updateHighScore(user.score, dbUserId);
      }

      let packet = null;
      if (user.baseHp > 0) {
        packet = gameOverNotification(true);
      } else {
        packet = gameOverNotification(false);
      }
      user.socket.write(packet);
    }
  }

}

export default Game;
