// Audio data
const audioFiles = {
    menuBg: './assets/audio/menuBg.mp3',
    gameBg: './assets/audio/gameBg.mp3',
    select: './assets/audio/select.mp3',
    firework: './assets/audio/firework.mp3',
    key: './assets/audio/key.mp3',
    success: './assets/audio/success.mp3',
};

// Function to create audio elements for each audio file
const createAudioElements = (audioFiles) => {
    const audioElements = {};
    for (const key in audioFiles) {
        if (audioFiles.hasOwnProperty(key)) {
            // Create an audio element for each audio file and store them in audioElements object
            audioElements[key] = new Audio(audioFiles[key]);
        }
    }
    return audioElements;
};

// Call the function to create audio elements
const audioElements = createAudioElements(audioFiles);

// Function to play or pause audio based on parameters
function playPauseAudio(audio, play = true, volume = 1) {
    // If play is false, pause the audio and return
    if (!play) {
        audioElements[audio].pause();
        return;
    }

    // If the audio is 'key', adjust the playback rate
    if (audio === 'key') {
        audioElements[audio].playbackRate = 2;
    }

    // If the audio is background music, put it on loop
    if (audio === 'menuBg' || audio === 'gameBg') {
        audioElements[audio].loop = true;
    }

    // Set volume, reset currentTime, and play the audio
    audioElements[audio].volume = volume;
    audioElements[audio].currentTime = 0;
    audioElements[audio].play();
}

// Function to play the firework sound
function playFireworkSound() {
    // Create a new audio element for the firework sound, set volume, and play
    const newAudio = new Audio(audioFiles.firework);
    newAudio.volume = 0.4;
    newAudio.play();
}
