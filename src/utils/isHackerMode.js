/**
 * Проверяет, активен ли хакерский режим по локальному времени устройства.
 */
export function isHackerMode(now = Date.now()) {
    const start = new Date(2026, 8, 29).getTime();
    const end = new Date(2026, 9, 5).getTime();
    return now >= start && now <= end;
}
