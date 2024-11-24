let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();
let gameEnd;
let stopSound;
let isInFullscreen;
let hitboxesVisible = false;
let muteBtn = false;

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
        gameEnd = false;
        stopSound = false;
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