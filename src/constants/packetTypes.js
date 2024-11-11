export const PAYLOAD_LENGTH = 4;
export const PACKET_TYPE_LENGTH = 2;
export const VERSION_LENGTH = 1;
export const SEQUENCE_LENGTH = 4;

// PACKET_TYPES : 패킷 타입의 넘버
export const PACKET_TYPES = {
  // 회원가입 및 로그인
  REGISTER_REQUEST: 1,
  REGISTER_RESPONSE: 2,
  LOGIN_REQUEST: 3,
  LOGIN_RESPONSE: 4,

  // 매칭
  MATCH_REQUEST: 5,
  MATCH_START_NOTIFICATION: 6,

  // 상태 동기화
  STATE_SYNC_NOTIFICATION: 7,

  // 타워 구입 및 배치
  TOWER_PURCHASE_REQUEST: 8,
  TOWER_PURCHASE_RESPONSE: 9,
  ADD_ENEMY_TOWER_NOTIFICATION: 10,

  // 몬스터 생성
  SPAWN_MONSTER_REQUEST: 11,
  SPAWN_MONSTER_RESPONSE: 12,
  SPAWN_ENEMY_MONSTER_NOTIFICATION: 13,

  // 전투 액션
  TOWER_ATTACK_REQUEST: 14,
  ENEMY_TOWER_ATTACK_NOTIFICATION: 15,
  MONSTER_ATTACK_BASE_REQUEST: 16,

  // 기지 HP 업데이트 및 게임 오버
  UPDATE_BASE_HP_NOTIFICATION: 17,
  GAME_OVER_NOTIFICATION: 18,

  // 게임 종료
  GAME_END_REQUEST: 19,

  // 몬스터 사망 통지
  MONSTER_DEATH_NOTIFICATION: 20,
  ENEMY_MONSTER_DEATH_NOTIFICATION: 21,
};

// PACKET_TYPE_NAMES : 페이로드 타입 넘버에 해당하는 message 이름들
export const PACKET_TYPE_NAMES = {
  // 회원가입 및 로그인
  [PACKET_TYPES.REGISTER_REQUEST]: 'registerRequest',
  [PACKET_TYPES.REGISTER_RESPONSE]: 'registerResponse',
  [PACKET_TYPES.LOGIN_REQUEST]: 'loginRequest',
  [PACKET_TYPES.LOGIN_RESPONSE]: 'loginResponse',

  // 매칭
  [PACKET_TYPES.MATCH_REQUEST]: 'matchRequest',
  [PACKET_TYPES.MATCH_START_NOTIFICATION]: 'matchStartNotification',

  // 상태 동기화
  [PACKET_TYPES.STATE_SYNC_NOTIFICATION]: 'stateSyncNotification',

  // 타워 구입 및 배치
  [PACKET_TYPES.TOWER_PURCHASE_REQUEST]: 'towerPurchaseRequest',
  [PACKET_TYPES.TOWER_PURCHASE_RESPONSE]: 'towerPurchaseResponse',
  [PACKET_TYPES.ADD_ENEMY_TOWER_NOTIFICATION]: 'addEnemyTowerNotification',

  // 몬스터 생성
  [PACKET_TYPES.SPAWN_MONSTER_REQUEST]: 'spawnMonsterRequest',
  [PACKET_TYPES.SPAWN_MONSTER_RESPONSE]: 'spawnMonsterResponse',
  [PACKET_TYPES.SPAWN_ENEMY_MONSTER_NOTIFICATION]:
    'spawnEnemyMonsterNotification',

  // 전투 액션
  [PACKET_TYPES.TOWER_ATTACK_REQUEST]: 'towerAttackRequest',
  [PACKET_TYPES.ENEMY_TOWER_ATTACK_NOTIFICATION]:
    'enemyTowerAttackNotification',
  [PACKET_TYPES.MONSTER_ATTACK_BASE_REQUEST]: 'monsterAttackBaseRequest',

  // 기지 HP 업데이트 및 게임 오버
  [PACKET_TYPES.UPDATE_BASE_HP_NOTIFICATION]: 'updateBaseHpNotification',
  [PACKET_TYPES.GAME_OVER_NOTIFICATION]: 'gameOverNotification',

  // 게임 종료
  [PACKET_TYPES.GAME_END_REQUEST]: 'gameEndRequest',

  // 몬스터 사망 통지
  [PACKET_TYPES.MONSTER_DEATH_NOTIFICATION]: 'monsterDeathNotification',
  [PACKET_TYPES.ENEMY_MONSTER_DEATH_NOTIFICATION]:
    'enemyMonsterDeathNotification',
};
