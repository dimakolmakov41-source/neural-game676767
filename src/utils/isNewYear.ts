/**
 * Проверяет, должна ли быть активна новогодняя тема.
 * Сохраняет прежние правила выбора темы из script.js.
 */
export function isNewYear(customTheme: string, date: Date = new Date()): boolean {
    if (customTheme === 'newyear') return true;
    if (customTheme !== 'normal' && customTheme !== '') return false;
    return (date.getMonth() === 11 && date.getDate() === 31) ||
        (date.getMonth() === 0 && date.getDate() === 1);
}
