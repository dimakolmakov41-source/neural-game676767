/**
 * Базовые типы проекта «Кликер: Эволюция Нейросетей».
 * Это только описание данных: файл не меняет работу игры в браузере.
 */

export interface PlayerIdentity {
  playerId: string;
  nickname: string;
}

export interface LeaderboardEntry {
  player_id: string;
  nickname: string;
  score: number;
}

export interface GlobalEventSnapshot {
  eventId: number;
  enabled: boolean;
  goal: number;
  totalClicks: number;
  rewardPoints: number;
  rewardStars: number;
}
