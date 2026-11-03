export function selectFactOfDay(facts, date = new Date()) {
    const dayOfYear = Math.floor(
        (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
    );

    return facts[dayOfYear % facts.length];
}
