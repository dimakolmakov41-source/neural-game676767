/** Описывает минимальные данные скина, нужные для расчёта множителя. */
export interface SkinMultiplierEntry {
    id: string;
    mult: number;
}

/** Возвращает множитель выбранного скина; для неизвестного скина — 1. */
export function getSkinMultiplier(
    currentSkin: string,
    skins: readonly SkinMultiplierEntry[],
): number {
    return skins.find((skin) => skin.id === currentSkin)?.mult || 1;
}
