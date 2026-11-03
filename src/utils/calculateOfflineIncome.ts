/**
 * Рассчитывает награду за время отсутствия игрока.
 * Чистая функция: не обращается к состоянию игры или браузера.
 */
export function calculateOfflineIncome(
  now: number,
  lastSaveTime: number,
  clickPower: number,
  maxHours: number,
  rate: number,
): number {
  const awaySeconds = Math.min((now - lastSaveTime) / 1000, maxHours * 3600);
  if (awaySeconds < 60) return 0;
  return Math.floor(clickPower * awaySeconds * rate);
}
