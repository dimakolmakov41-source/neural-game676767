export function isNewYear(customTheme, date = new Date()) {
    if (customTheme === 'newyear') return true;
    if (customTheme !== 'normal' && customTheme !== '') return false;
    return (date.getMonth() === 11 && date.getDate() === 31) ||
        (date.getMonth() === 0 && date.getDate() === 1);
}
