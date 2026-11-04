/** Браузерная версия расчёта множителя перерождения. */
export function getPrestigeMultiplier(prestigeLevel, bonusPerLevel) {
    return 1 + prestigeLevel * bonusPerLevel;
}
