export function isHalloween(customTheme, date = new Date()) {
    if (customTheme === 'halloween') return true;
    if (customTheme !== 'normal' && customTheme !== '') return false;
    return date.getMonth() === 9 && date.getDate() >= 5 && date.getDate() <= 31;
}
