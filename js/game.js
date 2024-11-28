let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();
let gameEnd;
let isInFullscreen;
let hitboxes = false;
let startScreenBtns = true;
let overallVolume;

function init() {
    canvas = document.getElementById('canvas');
    let mobileMuteBtn = document.getElementById('mobileMuteBtn');
    mobileMuteBtn.addEventListener('touchstart', () => {
        world.toggleMute();
        toggleMuteImg();
    });
    changeVolume();
}

function startGame() {
        gameEnd = false;
        isInFullscreen = false;
        toggleElement('portraitMessage', false);
        toggleElement('fullscreenIcon', true);
        toggleElement('startScreenContainer', false);
        toggleElement('endScreenContainer', false);
        toggleElement('canvas', true);
        clearCanvas();
        initLevel();
        world = new World(canvas, keyboard);
}

function clearCanvas() {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function interval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id)
    return id;
}

function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

function selectEndScreen(gameEndThrough) {
    gameEnd = true;
    toggleElement('fullscreenIcon', false);
    closeFullscreen();
    if (gameEndThrough === 'endbossDead') {
        displayWinScreen();
    } else if (gameEndThrough === 'zeroHp') {
        displayGameOverScreen();
    }
}

function displayWinScreen() {
    toggleElement('winImg', true);
    clearCanvas();
    toggleElement('canvas', false);
    setTimeout(() => {
        toggleElement('winImg', false);
        toggleElement('endScreenContainer', true);
        toggleElement('introBgr', true);
        toggleElement('ingameBgr', false);
        clearCanvas();
    }, 3000);
}

function displayGameOverScreen() {
    toggleElement('gameOverImg', true);
    toggleElement('canvas', false);
    setTimeout(() => {
        toggleElement('gameOverImg', false);
        toggleElement('endScreenContainer', true);
        toggleElement('introBgr', true);
        toggleElement('ingameBgr', false);
        clearCanvas();
    }, 3000);
}

function changeVolume(change) {
    let volumeCounter = document.getElementById('volumeCounter');

    if (change == 'plus') {
        overallVolume = overallVolume + 1;
        if (overallVolume > 10) {
            overallVolume = 10;
        }
    } else if (change == 'minus') {
        overallVolume = overallVolume - 1;
        if (overallVolume < 0) {
            overallVolume = 0;
        }
    } else {
        overallVolume = 5;
    }
    volumeCounter.innerHTML = overallVolume;
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
  let element = document.getElementById(buttonId);
  let key = buttonMap[buttonId];

  element.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard[key] = true;
    }, { passive: false });

  element.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard[key] = false;
    }, { passive: false }); 
}