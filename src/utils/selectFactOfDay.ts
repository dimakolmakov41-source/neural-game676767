export function selectFactOfDay(facts: readonly string[], date: Date = new Date()): string | undefined {
    const dayOfYear = Math.floor(
        (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
    );

    return facts[dayOfYear % facts.length];
}
