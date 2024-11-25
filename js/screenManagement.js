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
  
function displayWinScreen() {
    toggleElement('winImg', true);
    clearCanvas();
    toggleElement('canvas', false);
    setTimeout(() => {
        toggleElement('winImg', false);
        toggleElement('endScreenContainer', true);
        clearCanvas();
    }, 3000);
}

function displayGameOverScreen() {
    toggleElement('gameOverImg', true);
    toggleElement('canvas', false);
    setTimeout(() => {
        toggleElement('gameOverImg', false);
        toggleElement('endScreenContainer', true);
        clearCanvas();
    }, 3000);
}

function toggleElement(elementId, show) {
    let element = document.getElementById(elementId);
    if (show) {
      element.classList.remove('d-none');
    } else {
      element.classList.add('d-none');
    }
}
  
function keybindsMenu() {
  toggleMenu(
    'keybindsBtnContainer', 
    'keybindsBtn', 
    'keybindsExplanationContainer', 
    'openKeybinds',
    {backgroundColor: 'transparent', filter: 'none', borderColor: 'transparent'}, 
    {backgroundColor: 'rgb(248,199,105)', filter: 'drop-shadow(0px 0px 3px black)', borderColor: 'white'}
  );
}

function settingsMenu() {
  toggleMenu(
    'settingsBtnContainer', 
    'settingsBtn', 
    'changeSettingsContainer', 
    'openSettings',
    {backgroundColor: 'transparent', filter: 'none', borderColor: 'transparent'}, 
    {backgroundColor: 'rgb(199,103,88)', filter: 'drop-shadow(0px 0px 3px black)', borderColor: 'white'}
  );
}

function toggleMenu(containerId, btnId, contentId, openClass, activeStyles, inactiveStyles) {
    let container = document.getElementById(containerId);
    let btn = document.getElementById(btnId);
    let content = document.getElementById(contentId);
  
    if (!container.classList.contains(openClass)) {
      container.classList.add(openClass); 
      Object.assign(btn.style, activeStyles);
      setTimeout(() => content.classList.remove('d-none'), 175);
    } else {
      container.classList.remove(openClass); 
      Object.assign(btn.style, inactiveStyles);
      content.classList.add('d-none');
    }
}

function hideMobileBtns() {
    toggleElement('mobileControlContainer', false);
}