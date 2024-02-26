const infoSection = document.getElementById('info-section');
let zPosition = 100;
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { // Check if the key code is equal to the keycode of the "Escape" key
        zPosition = -zPosition
        infoSection.style.zIndex = zPosition; // Set z-index to a value that places the element behind others
    }
});
