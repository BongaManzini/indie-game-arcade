// ============================================================================
// THE BLIGHTSTEAD - UNIFIED INPUT SYSTEM (KEYBOARD, MOUSE & GAMEPAD)
// ============================================================================

class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = {};
    this.mouseButtons = {};
    this.mouseX = 0;
    this.mouseY = 0;
    this.screenCenterX = window.innerWidth / 2;
    this.screenCenterY = window.innerHeight / 2;

    this.axes = [0, 0, 0, 0];
    this.buttons = [];
    this.gamepadConnected = false;
    this.gamepadAiming = false;
    this.gamepadAngle = 0;

    // Single-frame triggers
    this.justPressed = {};
    this.justClicked = {};

    this.initListeners();
  }

  initListeners() {
    window.addEventListener('keydown', e => {
      if (!this.keys[e.code]) {
        this.justPressed[e.code] = true;
      }
      this.keys[e.code] = true;
      // Prevent browser scrolling on space/arrows
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });

    window.addEventListener('mousemove', e => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.screenCenterX = rect.width / 2;
      this.screenCenterY = rect.height / 2;
      this.gamepadAiming = false;
    });

    this.canvas.addEventListener('mousedown', e => {
      if (!this.mouseButtons[e.button]) {
        this.justClicked[e.button] = true;
      }
      this.mouseButtons[e.button] = true;
    });

    window.addEventListener('mouseup', e => {
      this.mouseButtons[e.button] = false;
    });

    // Disable default context menu on right click for tactical aim
    this.canvas.addEventListener('contextmenu', e => e.preventDefault());

    // Gamepad connection
    window.addEventListener('gamepadconnected', () => {
      this.gamepadConnected = true;
    });

    window.addEventListener('gamepaddisconnected', () => {
      this.gamepadConnected = false;
    });
  }

  pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = gamepads[0];
    if (!gp) return;

    this.axes = gp.axes || [0, 0, 0, 0];
    this.buttons = gp.buttons.map(b => (typeof b === 'object' ? b.pressed : b === 1.0));

    // Right stick aim
    const rx = this.axes[2];
    const ry = this.axes[3];
    if (Math.hypot(rx, ry) > 0.3) {
      this.gamepadAiming = true;
      this.gamepadAngle = Math.atan2(ry, rx);
    }
  }

  update() {
    this.pollGamepad();
  }

  clearTriggers() {
    this.justPressed = {};
    this.justClicked = {};
  }

  isKeyJustPressed(code) {
    return !!this.justPressed[code];
  }

  isClickJustPressed(button) {
    return !!this.justClicked[button];
  }
}

window.InputManager = InputManager;
