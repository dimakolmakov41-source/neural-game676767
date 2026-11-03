export function isCalendarDate(date, monthIndex, dayOfMonth) {
    return date.getMonth() === monthIndex && date.getDate() === dayOfMonth;
}
