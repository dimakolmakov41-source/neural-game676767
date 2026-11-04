/**
 * Применяет выбранный цвет кнопок и сохраняет настройку.
 */
export function applyButtonColor(color, doc = document, storage = localStorage) {
    const selectedColor = color || 'blue';

    doc.body.classList.remove('btn-blue', 'btn-green', 'btn-red', 'btn-purple', 'btn-gold');

    if (color && color !== 'blue') {
        doc.body.classList.add('btn-' + color);
    }

    storage.setItem('btnColor', selectedColor);

    doc.querySelectorAll('.color-btn').forEach((button) => {
        button.classList.toggle('active', button.dataset.color === selectedColor);
    });
}
