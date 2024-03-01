const infoButton = document.getElementById('info-button');
const infoSection = document.getElementById('instruction-section');
const infoIcon = document.getElementById('info-icon');
let zPosition = 100;

function putBack () {
    zPosition = -zPosition
    inputPosition = -inputPosition
    infoSection.style.zIndex = zPosition; // Set z-index to a value that places the element behind others
    userInput.style.top = -inputPosition + '%';
    cover.style.zIndex = zPosition;
    console.log(userInput.style.zIndex)
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { // Check if the key code is equal to the keycode of the "Escape" key
        putBack();
        condition = -condition;
        userInput.focus();
    }
});

infoButton.addEventListener('click', () => {
    putBack();
    infoIcon.classList.toggle('spin-animation');
    condition = -condition;
});
