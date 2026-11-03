export function createHtmlEscaper(enabled) {
    return (value) => {
        if (!value) return '';
        if (!enabled) return String(value);

        return String(value).replace(/[&<>'"]/g, (tag) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    };
}
