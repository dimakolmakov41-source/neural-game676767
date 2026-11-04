/**
 * Применяет выбранный цвет кнопок и сохраняет настройку.
 * Поведение совпадает с прежней функцией из script.js.
 */
export function applyButtonColor(
    color: string | null | undefined,
    doc: Document = document,
    storage: Storage = localStorage
): void {
    const selectedColor = color || 'blue';

    doc.body.classList.remove('btn-blue', 'btn-green', 'btn-red', 'btn-purple', 'btn-gold');

    if (color && color !== 'blue') {
        doc.body.classList.add('btn-' + color);
    }

    storage.setItem('btnColor', selectedColor);

    doc.querySelectorAll<HTMLElement>('.color-btn').forEach((button) => {
        button.classList.toggle('active', button.dataset.color === selectedColor);
    });
}
