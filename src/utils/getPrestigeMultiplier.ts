/** Рассчитывает множитель перерождения по текущему уровню. */
export function getPrestigeMultiplier(
    prestigeLevel: number,
    bonusPerLevel: number,
): number {
    return 1 + prestigeLevel * bonusPerLevel;
}
