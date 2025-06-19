document.addEventListener('DOMContentLoaded', () => {
  const modeSelect = document.getElementById('mode-select');
  const themeToggle = document.getElementById('theme-toggle');
  const display = document.getElementById('display');
  const buttonsContainer = document.getElementById('buttons');

  // Initialize theme from localStorage or default to light
  const storedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', storedTheme);
  themeToggle.textContent = storedTheme === 'light' ? '🌙' : '🌞';

  // Mode-specific button layouts
  const buttonLayouts = {
    standard: ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+','C'],
    scientific: ['sin', 'cos', 'tan', 'log', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'],
    programmer: ['BIN', 'OCT', 'DEC', 'HEX', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'],
    statistics: ['mean', 'median', 'mode', 'stddev', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'],
    conversion: ['km', 'm', 'cm', 'mm', 'kg', 'g', 'lb', 'oz', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'],
    graphing: ['x²', '√x', 'sin', 'cos', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C']
  };

  // Update button layout based on selected mode
  function updateButtonLayout(mode) {
    buttonsContainer.innerHTML = '';
    buttonLayouts[mode].forEach(label => {
      const button = document.createElement('button');
      button.textContent = label;
      button.classList.add('calculator-button');
      buttonsContainer.appendChild(button);
    });
  }

  // Handle button clicks
  buttonsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const value = e.target.textContent;
      if (value === '=') {
        try {
          display.textContent = eval(display.textContent);
        } catch {
          display.textContent = 'Error';
        }
      } else if (value === 'C') {
        display.textContent = '';
      } else {
        display.textContent += value;
      }
    }
  });

  // Handle mode change
  modeSelect.addEventListener('change', () => {
    updateButtonLayout(modeSelect.value);
  });

  // Handle theme toggle
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '🌞';
    localStorage.setItem('theme', newTheme);
  });

  // Initialize with default mode
  updateButtonLayout(modeSelect.value);
});

