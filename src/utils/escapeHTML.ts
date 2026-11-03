export function createHtmlEscaper(enabled: boolean): (value: unknown) => string {
    return (value: unknown): string => {
        if (!value) return '';
        if (!enabled) return String(value);

        return String(value).replace(/[&<>'"]/g, (tag: string) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    };
}
