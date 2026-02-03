const container = document.querySelector('#container');
const body = document.querySelector("body");

let currentGridSize = 16;
let globalShadeCount = 0;

function createGrid(size = 16) {
    currentGridSize = size;
    globalShadeCount = 0; // Reset shade count on new grid
    container.innerHTML = ''; // Clear existing grid
    
    // Update CSS variable or style for item size if needed, 
    // but for simple flex wrap with percentage:
    const percentage = 100 / size;
    
    // We can't easily change the CSS class rule from here without more logic,
    // so let's set the style directly on elements or update style sheet.
    // Simpler approach for this task: inline styles for width/height.
    
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.style.width = `${percentage}%`;
        div.style.height = `${percentage}%`;
        container.appendChild(div);
    }
}

// Controls
const buttonReset = document.createElement("button");
buttonReset.textContent = "Reset";
buttonReset.setAttribute("id", "button-reset");

const textInput = document.createElement("input");
textInput.setAttribute("type", "number");
textInput.setAttribute("id", "grid-size");
textInput.setAttribute("min", "1");
textInput.setAttribute("max", "100");
textInput.value = 16;

const buttonCreate = document.createElement("button");
buttonCreate.textContent = "Create Grid";
buttonCreate.setAttribute("id", "button-create");

const controlDiv = document.createElement("div");
controlDiv.setAttribute("id", "control-div");
controlDiv.appendChild(textInput);
controlDiv.appendChild(buttonCreate);
controlDiv.appendChild(buttonReset);

// Insert before container
body.insertBefore(controlDiv, container);

// Event Listeners
// Event Listeners
playArea = container; // Alias for consistency with user snippet
let isRGBMode = true;

playArea.addEventListener('mouseover', function (event) {
    if (event.target.classList.contains('grid-item')) {
        if (isRGBMode) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            event.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        } else {
            // Global Progressive Mode
            // Increase darkness as you draw more
            globalShadeCount++;
            
            // Calculate lightness: starts at 100 (white) and goes to 0 (black)
            // It reaches 0 when globalShadeCount == currentGridSize
            // We clamp it so it stays black after that.
            let brightnessFactor = globalShadeCount / currentGridSize;
            if (brightnessFactor > 1) brightnessFactor = 1;
            
            const lightness = 100 - (brightnessFactor * 100);
            event.target.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
        }
    }
});

const buttonMode = document.createElement("button");
buttonMode.textContent = "Mode: RGB";
buttonMode.setAttribute("id", "button-mode");
controlDiv.appendChild(buttonMode);

buttonMode.addEventListener('click', () => {
    isRGBMode = !isRGBMode;
    buttonMode.textContent = isRGBMode ? "Mode: RGB" : "Mode: Gray";
    globalShadeCount = 0; // Reset shade count when switching modes
});

buttonCreate.addEventListener('click', () => {
    let size = parseInt(textInput.value);
    if (size > 100) size = 100; // Limit max size
    if (size < 1) size = 1;
    createGrid(size);
});

buttonReset.addEventListener('click', () => {
    const items = document.querySelectorAll('.grid-item');
    items.forEach(item => item.style.backgroundColor = '');
    globalShadeCount = 0; // Reset shade count on reset
});

// Initial grid
createGrid(16);
