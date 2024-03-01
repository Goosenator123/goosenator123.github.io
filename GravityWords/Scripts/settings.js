// Retrieving references from HTML
const infoSection = document.getElementById('info-section');
const settingButton = document.getElementById('setting-button');

// Set zIndex value
let zPosition = 100;

function putBack() {
    zPosition = -zPosition
    infoSection.style.zIndex = zPosition; // Set z-index to a value that places the element behind others
}

// Execute if user click on <Escape>
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { // Check if the key code is equal to the keycode of the "Escape" key
        putBack();
    }
});

// Execute if user click on setting button
settingButton.addEventListener('click', () => {
    putBack();
})
