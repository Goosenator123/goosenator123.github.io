const playerRock = document.getElementById('player-rock');

playerRock.addEventListener('click', () => {
    playerRock.style.transform = 'translate(200px)';
    setTimeout(()=>{
        playerRock.style.transform = 'none';
    }, 1000)
})