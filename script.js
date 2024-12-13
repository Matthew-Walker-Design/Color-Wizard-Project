// JavaScript

// Const
const colorInput = document.getElementById('color-input');
const getColorButton = document.getElementById('get-color');
const colorDisplay = document.getElementById('color-display');
const colorInfo = document.getElementById('color-info');
const colorError = document.getElementById('color-error');

// API
const API_BASE_URL = 'https://www.thecolorapi.com/id';

getColorButton.addEventListener('click', () => {
    const colorValue = colorInput.value.trim();

    
    colorDisplay.style.backgroundColor = '';
    colorInfo.innerHTML = '';
    colorError.textContent = '';

    // Input
    if (!colorValue) {
        colorError.textContent = 'Please enter a color value.';
        return;
    }

    // Fetch
    fetch(`${API_BASE_URL}?hex=${encodeURIComponent(colorValue.replace('#', ''))}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch color data. Please check the input.');
            }
            return response.json();
        })
        .then(data => {
            // Ensure response contains required info from API
            if (!data.hex || !data.name || !data.rgb || !data.hsl || !data.contrast) {
                throw new Error('Unexpected API response. Please check the input format.');
            }

            // Display
            colorDisplay.style.backgroundColor = data.hex.value;
            colorInfo.innerHTML = `
                <p><strong>Color Name:</strong> ${data.name.value}</p>
                <p><strong>HEX:</strong> ${data.hex.value}</p>
                <p><strong>RGB:</strong> ${data.rgb.value}</p>
                <p><strong>HSL:</strong> ${data.hsl.value}</p>
                <p><strong>Closest Contrast Color:</strong> ${data.contrast.value}</p>
            `;
        })
        .catch(error => {
            colorError.textContent = error.message || 'Something went wrong.';
        });
});