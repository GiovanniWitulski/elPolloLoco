/**
 * Checks the screen size and orientation and displays the appropriate layout.
 */
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

/**
 * Displays the portrait mode layout.
 *
 * @param {HTMLElement} portraitMessage - The element displaying the portrait message.
 * @param {HTMLElement} startBtnContainer - The container for the start button.
 * @param {HTMLElement} keybindsBtn - The keybinds button element.
 * @param {HTMLElement} settingsBtnContainer - The container for the settings button.
 */
function displayPortraitMode(portraitMessage, startBtnContainer, keybindsBtn, settingsBtnContainer) {
  portraitMessage.classList.remove('d-none');
  startBtnContainer.style.opacity = '0.5';
  keybindsBtn.style.opacity = '0.5';
  settingsBtnContainer.style.opacity = '0.5';
}

/**
 * Displays the landscape mode layout.
 *
 * @param {HTMLElement} portraitMessage - The element displaying the portrait message.
 * @param {HTMLElement} startBtnContainer - The container for the start button.
 * @param {HTMLElement} keybindsBtn - The keybinds button element.
 * @param {HTMLElement} settingsBtnContainer - The container for the settings button.
 */
function displayLandscapeMode(portraitMessage, startBtnContainer, keybindsBtn, settingsBtnContainer) {
  startBtnContainer.style.opacity = '1';
  keybindsBtn.style.opacity = '1';
  settingsBtnContainer.style.opacity = '1';
  portraitMessage.classList.add('d-none');
}

/**
 * Toggles fullscreen mode for the canvas.
 */
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

/**
 * Adapts the styling of the canvas and fullscreen icon for fullscreen mode.
 *
 * @param {HTMLElement} fullscreen - The fullscreen element.
 * @param {HTMLElement} fullscreenIcon - The fullscreen icon element.
 */
function styleAdaptToFullscreen(fullscreen, fullscreenIcon) {
  document.getElementById('canvas').classList.add('canvas-fullscreen');
  fullscreen.classList.add('canvas-fullscreen');
  fullscreenIcon.src = 'img/icons/compress.svg';
  fullscreenIcon.classList.add('compress-screen-icon');
}

/**
 * Adapts the styling of the fullscreen icon for windowed mode.
 *
 * @param {HTMLElement} fullscreenIcon - The fullscreen icon element.
 */
function styleAdaptToWindowScreen(fullscreenIcon) {
  fullscreenIcon.src = 'img/icons/expand.svg';
  fullscreenIcon.classList.remove('compress-screen-icon');
}

/**
 * Enters fullscreen mode for the given element.
 *
 * @param {HTMLElement} element - The element to enter fullscreen mode for.
 */
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

/**
 * Exits fullscreen mode.
 */
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

/**
 * Toggles the visibility of an element.
 *
 * @param {string} elementId - The ID of the element to toggle.
 * @param {boolean} show - Whether to show or hide the element.
 */
function toggleElement(elementId, show) {
  let element = document.getElementById(elementId);
  if (show) {
    element.classList.remove('d-none');
  } else {
    element.classList.add('d-none');
  }
}

/**
 * Toggles the keybinds menu.
 */
function keybindsMenu() {
  toggleMenu(
    'keybindsBtnContainer',
    'keybindsBtn',
    'keybindsExplanationContainer',
    'openKeybinds', { backgroundColor: 'transparent', filter: 'none', borderColor: 'transparent' },
    { backgroundColor: 'rgb(248,199,105)', filter: 'drop-shadow(0px 0px 3px black)', borderColor: 'white' }
  );
}

/**
 * Toggles the settings menu.
 */
function settingsMenu() {
  toggleMenu(
    'settingsBtnContainer',
    'settingsBtn',
    'changeSettingsContainer',
    'openSettings', { backgroundColor: 'transparent', filter: 'none', borderColor: 'transparent' },
    { backgroundColor: 'rgb(199,103,88)', filter: 'drop-shadow(0px 0px 3px black)', borderColor: 'white' }
  );
}

/**
 * Toggles the visibility of a menu.
 *
 * @param {string} containerId - The ID of the menu container.
 * @param {string} btnId - The ID of the menu button.
 * @param {string} contentId - The ID of the menu content.
 * @param {string} openClass - The class to add to the container when the menu is open.
 * @param {object} activeStyles - The styles to apply to the button when the menu is open.
 * @param {object} inactiveStyles - The styles to apply to the button when the menu is closed.
 */
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

/**
 * Hides the mobile control buttons temporarily.
 */
function hideMobileBtns() {
  let elements = document.querySelectorAll('.mobile-control-btn-img');

  elements.forEach(element => {
    element.classList.add('d-none');
  });

  setTimeout(() => {
    elements.forEach(element => {
      element.classList.remove('d-none');
    });
  }, 6000);
}

/**
 * Toggles the mute image for mobile devices.
 */
function toggleMuteImg() {
  let mobileMuteImg = document.getElementById('mobileMuteImg');
  if (world.isMuted) {
    mobileMuteImg.src = 'img/icons/mute.png';
  } else {
    mobileMuteImg.src = 'img/icons/volume.png';
  }
}

/**
 * Toggles the visibility of start screen buttons.
 *
 * @param {string} containerId1 - The ID of the first button container.
 * @param {string} containerId2 - The ID of the second button container.
 */
function toggleStartScreenBtns(containerId1, containerId2) {
  startScreenBtns = !startScreenBtns;
  [containerId1, containerId2].forEach(containerId => {
    toggleElement(containerId, startScreenBtns);
  });
}

/**
 * Toggles the display of hitboxes.
 */
function toggleHitboxes() {
  hitboxes = !hitboxes;

  let switchImg = document.getElementById('switchImg');
  if (hitboxes) {
    switchImg.src = 'img/icons/on.png';
  } else {
    switchImg.src = 'img/icons/off.png';
  }
}