const portionsSlider = document.getElementById('portions');
const portionDisplay = document.getElementById('portion-display');
const basePortions = 2;

const scalables = document.querySelectorAll('.qty');

function updatePortions() {
  const current = parseInt(portionsSlider.value, 10);
  portionDisplay.textContent = current;
  const factor = current / basePortions;

  scalables.forEach(el => {
    const base = parseFloat(el.dataset.base);
    if (isNaN(base)) return;
    const scaled = Math.round(base * factor);
    const unit = el.dataset.unit;
    el.textContent = scaled + ' ' + unit;
  });
}

portionsSlider.addEventListener('input', updatePortions);
updatePortions();

document.querySelector('.print-btn').addEventListener('click', () => {
  window.print();
});
