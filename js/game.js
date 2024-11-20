let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();
let gameEnd;
let isInFullscreen;
let hitboxesVisible = false;
let muteBtn = false;

function init() {

}

function checkScreenSize() {
    let portraitMessage = document.getElementById('portraitMessage');
    let startBtnContainer = document.getElementById('startBtnContainer');
    let keybindsBtn = document.getElementById('keybindsBtn');
    let settingsBtnContainer = document.getElementById('settingsBtnContainer');
  
    if (window.innerWidth <= 770 && 
        (typeof window.orientation === 'undefined' ||
         window.orientation === 0 || window.orientation === 180)) {
        displayPortraitMode(portraitMessage, startBtnContainer, keybindsBtn, settingsBtnContainer);      
    } else {
        displayLandscapeMode(portraitMessage, startBtnContainer, keybindsBtn, settingsBtnContainer);
    }
}

window.addEventListener('load', checkScreenSize);
window.addEventListener("resize", checkScreenSize);
window.addEventListener('orientationchange', checkScreenSize);
checkScreenSize();

function startGame() {
        gameEnd = false;
        isInFullscreen = false;
        document.getElementById('fullscreenIcon').classList.remove('d-none');
        let portraitMessage = document.getElementById('portraitMessage');
        portraitMessage.classList.add('d-none');
        hideStartScreen();
        hideEndScreen();
        displayCanvas();
        clearCanvas();
        initLevel();
        world = new World(canvas, keyboard);
} 

function settings() {

}

function keybindsMenu() {
    let keybindsBtnContainer = document.getElementById('keybindsBtnContainer');
    if (!keybindsBtnContainer.classList.contains('bigger')) {
        displayKeybindsContainer(keybindsBtnContainer);
        displayKeybinds();
    } else {
        hideKeybindsContainer(keybindsBtnContainer);
        hideKeybinds();
    }
}

function displayKeybindsContainer(keybindsBtnContainer) {
    keybindsBtnContainer.classList.add('bigger');
    let keybindsBtn = document.getElementById('keybindsBtn');
    keybindsBtn.style.backgroundColor = 'transparent';
    keybindsBtn.style.filter = 'none';
    keybindsBtn.style.borderColor = 'transparent';
}

function hideKeybindsContainer(keybindsBtnContainer) {
    keybindsBtnContainer.classList.remove('bigger');
    let keybindsBtn = document.getElementById('keybindsBtn');
    keybindsBtn.style.backgroundColor = 'rgb(248,199,105)';
    keybindsBtn.style.filter = 'drop-shadow(0px 0px 3px black)';
    keybindsBtn.style.borderColor = 'white';
}

function displayKeybinds() {
    setTimeout(() => {
        document.getElementById('keybindsExplanationContainer').classList.remove('d-none');
    }, 175);
}

function hideKeybinds() {
        document.getElementById('keybindsExplanationContainer').classList.add('d-none');
}

function displayPortraitMode(portraitMessage, startBtnContainer, keybindsBtn, settingsBtnContainer) {
    portraitMessage.classList.remove('d-none');
    startBtnContainer.style.opacity = '0.5';
    keybindsBtn.style.opacity = '0.5';
    settingsBtnContainer.style.opacity = '0.5';

}

function displayLandscapeMode(portraitMessage, startBtnContainer, keybindsBtn, settingsBtnContainer) {
    startBtnContainer.style.opacity = '1';
    keybindsBtn.style.opacity = '1';
    settingsBtnContainer.style.opacity = '1';
    portraitMessage.classList.add('d-none');
}

function fullscreen() {
    let fullscreen = document.getElementById('canvasBgrContainer');
    let fullscreenIcon = document.getElementById('fullscreenIcon'); 
    if (fullscreen.classList.contains('canvas-fullscreen')) {
        closeFullscreen();
        styleAdaptToWindowScreen(fullscreenIcon);
    } else {
        enterFullscreen(fullscreen);
        styleAdaptToFullscreen(fullscreen, fullscreenIcon);
    }
}

function styleAdaptToFullscreen(fullscreen, fullscreenIcon) {
    document.getElementById('canvas').classList.add('canvas-fullscreen');
    fullscreen.classList.add('canvas-fullscreen');
    fullscreenIcon.src = 'img/icons/compress.svg';
    fullscreenIcon.classList.add('compress-screen-icon');
}

function styleAdaptToWindowScreen(fullscreenIcon) {
    fullscreenIcon.src = 'img/icons/expand.svg';
    fullscreenIcon.classList.remove('compress-screen-icon');
}

function enterFullscreen(element) {
    if (!isInFullscreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        isInFullscreen = true;
    }
}

function closeFullscreen() {
    if (isInFullscreen) {
        document.getElementById('canvas').classList.remove('canvas-fullscreen');
        document.getElementById('canvasBgrContainer').classList.remove('canvas-fullscreen');
        document.getElementById('fullscreenIcon').src = 'img/icons/expand.svg';
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        isInFullscreen = false;
    }
}

function clearCanvas() {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function interval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id)
}

function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

function selectEndScreen(gameEndThrough) {
    document.getElementById('fullscreenIcon').classList.add('d-none');
    if (gameEndThrough === 'endbossDead') {
        gameEnd = true;
        closeFullscreen();
        displayWinScreen();
    }
    if (gameEndThrough === 'zeroHp') {
        gameEnd = true;
        closeFullscreen();
        displayGameOverScreen();
    }
}

function displayWinScreen() {
    let winScreen = document.getElementById('winImg'); 
    winScreen.classList.remove('d-none');
    clearCanvas();
    hideCanvas(); 
    setTimeout(() => {
    winScreen.classList.add('d-none');
        displayEndScreen();
    }, 3000);
}

function displayGameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverImg')
    gameOverScreen.classList.remove('d-none');
    setTimeout(() => {
        gameOverScreen.classList.add('d-none');
        displayEndScreen();
        clearCanvas();
        hideCanvas();
    }, 3000);
}

function hideGameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverImg')
    gameOverScreen.classList.add('d-none');
}


function hideStartScreen() {
    let startScreen = document.getElementById('startScreenContainer'); 
    startScreen.classList.add('d-none');
}

function displayStartScreen() {
    let startScreen = document.getElementById('startScreenContainer'); 
    startScreen.classList.remove('d-none');
}

function displayCanvas() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
}

function hideCanvas() {
    canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
}

function displayEndScreen() {
    let endScreen = document.getElementById('endScreenContainer');
    endScreen.classList.remove('d-none');
}

function hideEndScreen() {
    let endScreen = document.getElementById('endScreenContainer');
    endScreen.classList.add('d-none');
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    };

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    // if (e.keyCode == 77) {
    //     muteAll();
    // }
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    };

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

const buttonMap = {
    'moveLeftBtn': 'LEFT',
    'moveRightBtn': 'RIGHT',
    'mobileJumpBtn': 'SPACE',
    'mobileThrowBtn': 'D'
};

for (const buttonId in buttonMap) {
  const element = document.getElementById(buttonId);
  const key = buttonMap[buttonId];

  element.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard[key] = true;
  });

  element.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard[key] = false;
  });
}