export function isCalendarDate(date: Date, monthIndex: number, dayOfMonth: number): boolean {
    return date.getMonth() === monthIndex && date.getDate() === dayOfMonth;
}
