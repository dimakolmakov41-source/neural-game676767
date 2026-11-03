/**
 * Проверяет, должна ли быть активна хэллоуинская тема.
 * Сохраняет прежние правила выбора темы из script.js.
 */
export function isHalloween(customTheme: string, date: Date = new Date()): boolean {
    if (customTheme === 'halloween') return true;
    if (customTheme !== 'normal' && customTheme !== '') return false;
    return date.getMonth() === 9 && date.getDate() >= 5 && date.getDate() <= 31;
}
