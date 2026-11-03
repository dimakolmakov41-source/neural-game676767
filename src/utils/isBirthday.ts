/** Проверяет, приходится ли указанная дата на день рождения игры — 17 марта. */
export function isBirthday(date: Date = new Date()): boolean {
    return date.getMonth() === 2 && date.getDate() === 17;
}
