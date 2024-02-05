const playerRock = document.getElementById('player-rock');
const playerContainer = document.getElementById('player-choice-container');
const item = document.getElementsByClassName('player-choice');

function moveForward(choice) {
    let x = document.getElementById('player-choice-container').offsetWidth * 0.35;

    choice.style.transform = `translate(${x}px)`;
    setTimeout(() => {
        choice.style.transform = 'none';
    }, 1000);
}

// for (let i in item) {
//     i.addEventListener('click', () => {
//         moveForward(item);
//         console.log('olasfds')
//     })
// }

item.forEach(element => {
    element.addEventListener('click', () => {
        moveForward(element);
    })
});

playerRock.addEventListener('click', () => {
    moveForward(playerRock);
})