/** Браузерная версия функции расчёта множителя выбранного скина. */
export function getSkinMultiplier(currentSkin, skins) {
    return skins.find((skin) => skin.id === currentSkin)?.mult || 1;
}
