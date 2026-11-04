/** Проверяет, действует ли обычный временный буст. */
export function isBoostActive(boostEndTime, now = Date.now()) {
    return now < boostEndTime;
}
