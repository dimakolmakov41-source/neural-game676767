/**
 * Рассчитывает награду за время отсутствия игрока.
 * Скомпилированная браузерная версия src/utils/calculateOfflineIncome.ts.
 */
export function calculateOfflineIncome(now, lastSaveTime, clickPower, maxHours, rate) {
    const awaySeconds = Math.min((now - lastSaveTime) / 1000, maxHours * 3600);
    if (awaySeconds < 60) return 0;
    return Math.floor(clickPower * awaySeconds * rate);
}
