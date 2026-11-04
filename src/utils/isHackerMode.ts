/**
 * Проверяет, активен ли хакерский режим по локальному времени устройства.
 * Сохраняет исходный календарный интервал: с 29 сентября по 5 октября 2026 года.
 */
export function isHackerMode(now: number = Date.now()): boolean {
    const start = new Date(2026, 8, 29).getTime();
    const end = new Date(2026, 9, 5).getTime();
    return now >= start && now <= end;
}
