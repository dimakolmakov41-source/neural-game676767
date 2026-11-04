/** Проверяет, действует ли обычный временный буст. */
export function isBoostActive(boostEndTime: number, now: number = Date.now()): boolean {
    return now < boostEndTime;
}
