/** Проверяет, приходится ли указанная дата на 8 марта. */
export function isMarch8(date: Date = new Date()): boolean {
    return date.getMonth() === 2 && date.getDate() === 8;
}
