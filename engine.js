// Generate the Canvas
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
// HD Resolutions -1280x720 and 1920 × 1080 Full HD
const gameCanvas = document.createElement('CANVAS');
gameCanvas.id = 'GameCanvasScreen';
gameCanvas.width = CANVAS_WIDTH;
gameCanvas.height = CANVAS_HEIGHT;
// const canvasElement = $(`<canvas id ='GameCanvasScreen' width='${CANVAS_WIDTH}' height='${CANVAS_HEIGHT}'></canvas>`);
const canvas = gameCanvas.getContext('2d');
document.body.appendChild(gameCanvas);

const canvasElement = $('#GameCanvasScreen');
/** By Ryan Giglio */
function scaleToSmallest() {
  const ratio = CANVAS_WIDTH / CANVAS_HEIGHT;

  if (($(window).width() / ratio) <= $(window).height()) {
    canvasElement.css('width', '100%').css('height', 'auto');
  } else {
    canvasElement.css('height', '100%').css('width', 'auto');
  }
}
scaleToSmallest();

$(window).on('resize', () => {
  scaleToSmallest();
});
// Draw tile map
drawMap(canvas);
// Game State

const states = {
  splash: 0,
  title: 1,
  Game: 2,
  End: 3,
};
let currentState = states.title;

// Game Loop
// var FPS = 60;

// shim layer with setTimeout fallback
window.requestAnimFrame = (() => window.requestAnimationFrame
           || window.webkitRequestAnimationFrame
           || window.mozRequestAnimationFrame
           || function (callback) {
             window.setTimeout(callback, 1000 / 60);
           })();
// Mouse Coordinate Positioning
function writeMessage(canvas, message) {
  const context = canvasid.getContext('2d');
  context.clearRect(0, 0, canvasid.width, canvasid.height);
  context.font = '18pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
  // console.log(message);
}

function getMousePos(canvas, evt) {
  const rect = canvasid.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

var canvasid = document.getElementById('GameCanvasScreen');
const context = canvas;

canvasid.addEventListener('mousemove', (evt) => {
  mousePos = getMousePos(canvasid, evt);
  const message = `Mouse position: ${mousePos.x},${mousePos.y}`;
  writeMessage(canvas, message);
}, false);

function gameloop() {
  controller();
  if (paused == false) {
    update();
    draw();
  }
  window.requestAnimFrame(gameloop);
}

var paused = false;

window.requestAnimFrame(gameloop);

// Keyboard Map
function setUpKeys() {
  window.keydown = {};

  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which]
               || String.fromCharCode(event.which).toLowerCase();
  }

  $(document).bind('keydown', (event) => {
    keydown[keyName(event)] = true;
  });

  $(document).bind('keyup', (event) => {
    keydown[keyName(event)] = false;
  });
}
setUpKeys();

let notyet = 0;
function clearTimer() {
  notyet = 0;
}

function pauseGame() {
  if (notyet == 1) {
    console.log('waiting');
    return;
  }
  notyet = 1;
  paused = !paused;
  setTimeout('clearTimer()', 500);
}

// console.log(keydown.esc);

// Canvas Utlity for preventing objects from going over the edge
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

// Text Variables
const splashTextX = CANVAS_WIDTH / 3;
const splashTextY = 0;
const endTextX = CANVAS_WIDTH / 3;
const endTextY = 0;

// Sound creation
const GameLoopMusic_sound = new Howl({
  src: ['sounds/In-Orbit.mp3'],
  autoplay: false,
  loop: true,
});
const explosion_sound = new Howl({
  src: ['sounds/explosion.mp3', 'sounds/explosion.wav'],
});
const shoot_sound = new Howl({
  src: ['sounds/shoot.mp3', 'sounds/shoot.wav'],
  volume: 0.2,
});

// explosion_sound.play();

// Create The player
const player = {
  // color: "#00A",
  sprite: Sprite('spaceship'),
  x: 220,
  y: 680,
  width: 32,
  height: 32,
  life: 100,
  velX: 0,
  velY: 0,
  speed: 4,
  friction: 0.85,
  draw() {
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x, this.y, this.width, this.height);
    this.sprite.draw(canvas, this.x, this.y);
  },
  shoot() {
    const bulletPosition = this.midpoint();
    shoot_sound.play();

    playerBullets.push(Bullet({
      speed: 5,
      x: bulletPosition.x,
      y: bulletPosition.y,
    }));
  },
  launch() {
    const missilePostition = this.midpoint();
    console.log(Missle.width);
    playerMissiles.push(Missle({
      speed: 2,
      x: missilePostition.x - 500,
      y: missilePostition.y,
    }));
  },
  midpoint() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  },
  explode() {
    this.active = false;
    explosion_sound.play();
    GameLoopMusic_sound.fadeOut(0, 2000);
    currentState = states.End;
    // An explosion sound and then end the game
  },
  lifeChange(change) {
    this.life += change; // Adds or subtracts health based on the value added in the function

    if (this.life <= 0) {
      this.explode();
    }

    return this.life;
  },
};

var playerBullets = [];

function Bullet(I) {
  I.active = true;

  I.xVelocity = 0;
  I.yVelocity = -I.speed;
  I.width = 3;
  I.height = 3;
  I.color = '#000';

  I.inBounds = function () {
    return I.x >= 0 && I.x <= CANVAS_WIDTH
               && I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function () {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function () {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}

var playerMissiles = [];

function Missle(I) {
  I.active = true;

  I.xVelocity = 0;
  I.mousePosX = mousePos.x;
  I.mousePosY = mousePos.y;
  I.yVelocity = -I.speed;
  I.width = 1002;
  I.height = 32;
  I.color = '#34DDDD';

  I.inBounds = function () {
    return I.x >= 0 && I.x <= CANVAS_WIDTH
               && I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function () {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function () {
    I.x += I.mousePosX;
    I.y += I.mousePosY + I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}

let enemies = [];

function Enemy(I) {
  I = I || {};

  I.active = true;
  I.age = Math.floor(Math.random() * 128);

  I.sprite = Sprite('enemy');
  // I.color = "#A2B";

  I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
  I.y = 0;
  I.xVelocity = 0;
  I.yVelocity = 2;

  I.width = 32;
  I.height = 32;

  I.inBounds = function () {
    return I.x >= 0 && I.x <= CANVAS_WIDTH
               && I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function () {
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x, this.y, this.width, this.height);
    this.sprite.draw(canvas, this.x, this.y);
  };

  I.explode = function () {
    this.active = false;
    explosion_sound.play();
    // Extra Credit: Add an explosion graphic
  };

  I.update = function () {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);

    I.age++;

    I.active = I.active && I.inBounds();
  };

  return I;
}

// Collision Detection
function collides(a, b) {
  return a.x < b.x + b.width
           && a.x + a.width > b.x
           && a.y < b.y + b.height
           && a.y + a.height > b.y;
}

function collisionDetection() {
  /*
        * private function initialize()
        *
        * Initializes the object
        *
        */
  this.initialize = function () { };

  /*
        * public function hitTest()
        *
        * Checks if two objects collide. First with box-model detection
        * and then on a per-pixel detection.
        *
        * Both source and target objects are expected to look like this:
        *
        * {
        *    x: (Number) current x position,
        *    y: (Number) current y position,
        *    width: (Number) object height,
        *    height: (Number) object width,
        *    pixelmap: (Object) pixel map object generated from buildPixelMap()
        * }
        *
        * @param source (Object) The source object
        * @param target (Object) The target object
        *
        * @return boolean, true on collision
        *
        */
  this.hitTest = function (source, target) {
    let hit = false;
    const start = new Date().getTime();

    if (this.boxHitTest(source, target)) {
      if (this.pixelHitTest(source, target)) {
        hit = true;
      }
    }

    const end = new Date().getTime();

    if (hit == true) {
      // console.log( 'detection took: ' + (end - start) + 'ms' );
    }

    return hit;
  };

  /*
        * private function boxHitTest()
        *
        * Checks if two objects collide with box-model detection.
        *
        * Both source and target objects are expected to look like this:
        *
        * {
        *    x: (Number) current x position,
        *    y: (Number) current y position,
        *    width: (Number) object height,
        *    height: (Number) object width
        * }
        *
        * @param source (Object) The source object
        * @param target (Object) The target object
        *
        * @return boolean, true on collision
        *
        */
  this.boxHitTest = function (source, target) {
    return !(
      ((source.y + source.height) < (target.y))
               || (source.y > (target.y + target.height))
               || ((source.x + source.width) < target.x)
               || (source.x > (target.x + target.width))
    );
  };

  /*
        * private function pixelHitTest()
        *
        * Checks if two objects collide on a per-pixel detection.
        *
        * Both source and target objects are expected to look like this:
        *
        * {
        *    x: (Number) current x position,
        *    y: (Number) current y position,
        *    width: (Number) object height,
        *    height: (Number) object width,
        *    height: (Number) object width,
        *    pixelmap: (Object) pixel map object generated from buildPixelMap()
        * }
        *
        * @param source (Object) The source object
        * @param target (Object) The target object
        *
        * @return boolean, true on collision
        *
        */
  this.pixelHitTest = function (source, target) {
    const top = parseInt(Math.max(source.y, target.y));
    const bottom = parseInt(Math.min(source.y + source.height, target.y + target.height));
    const left = parseInt(Math.max(source.x, target.x));
    const right = parseInt(Math.min(source.x + source.width, target.x + target.width));

    for (let y = top; y < bottom; y++) {
      for (let x = left; x < right; x++) {
        const pixel1 = source.pixelMap.data[`${x - source.x}_${y - source.y}`];
        const pixel2 = target.pixelMap.data[`${x - target.x}_${y - target.y}`];

        if (!pixel1 || !pixel2) {
          continue;
        }

        if (pixel1.pixelData[3] == 255 && pixel2.pixelData[3] == 255) {
          return true;
        }
      }
    }

    return false;
  };

  /*
        * public function buildPixelMap()
        *
        * Creates a pixel map on a canvas image. Everything
        * with a opacity above 0 is treated as a collision point.
        * Lower resolution (higher number) will generate a faster
        * but less accurate map.
        *
        *
        * @param source (Object) The canvas object
        * @param resolution (int)(DEPRECATED!) The resolution of the map
        *
        * @return object, a pixelMap object
        *
        */
  this.buildPixelMap = function (source) {
    const resolution = 1;
    const ctx = source.getContext('2d');
    const pixelMap = [];

    for (let y = 0; y < source.height; y++) {
      for (let x = 0; x < source.width; x++) {
        const dataRowColOffset = `${y}_${x}`;// ((y * source.width) + x);
        const pixel = ctx.getImageData(x, y, resolution, resolution);
        const pixelData = pixel.data;

        pixelMap[dataRowColOffset] = { x, y, pixelData };
      }
    }
    return {
      data: pixelMap,
      resolution,
    };
  };

  // Initialize the collider
  this.initialize();

  // Return our outward facing interface.
  return {
    hitTest: this.hitTest.bind(this),
    buildPixelMap: this.buildPixelMap.bind(this),
  };
}
const myNewCollission = new collisionDetection();
function handleCollisions() {
  playerBullets.forEach((bullet) => {
    enemies.forEach((enemy) => {
      if (collides(bullet, enemy)) {
        enemy.explode();
        bullet.active = false;
      }
    });
  });

  playerMissiles.forEach((missle) => {
    enemies.forEach((enemy) => {
      if (collides(missle, enemy)) {
        enemy.explode();
        missle.active = false;
      }
    });
  });

  enemies.forEach((enemy) => {
    if (collides(enemy, player)) {
      enemy.explode();
      player.lifeChange(-10);
    }
  });
}

/** * Parallax background tutorial http://javacoffee.de/?p=866 * */
// Parallax background

/**
    * Data structure to hold layer data
    * @param s <string> Absolute path to the image
    * @param x <int> X coordinate
    * @param Y </int><int> Y coordinate
    */
function Layer(s, x, y) {
  this.img = new Image();
  this.img.src = s;
  this.x = x;
  this.y = y;
}

/**
    * Main ParallaxScrolling class
    * @param ctx <context> Canvas context
    * @param imgdata <array> Array with absolute image paths
    */
function ParallaxScrolling(canvas, imgdata) {
  const self = this;
  if (typeof imgdata === 'undefined') {
    imgdata = []; // fill it with paths to images for the parralax
  }
  this.canvas = canvas;

  // Initialize the layers
  this.layers = new Array(imgdata.length);
  for (i = 0; i < imgdata.length; i++) {
    this.layers[i] = new Layer(imgdata[i], 0, 0);
  }

  // Function: Move all layer except the first one
  this.Move = function () {
    for (let i = 1; i < self.layers.length; i++) {
      if (self.layers[i].x > self.layers[i].img.width) self.layers[i].x = 0;
      self.layers[i].x += i;
    }
  };

  // Function: Draw all layer in the canvas
  this.Draw = function () {
    self.Move();
    for (let i = 0; i < self.layers.length; i++) {
      const x1 = (self.layers[i].x - self.layers[i].img.width);
      self.canvas.drawImage(self.layers[i].img, 0, 0, self.layers[i].img.width, self.layers[i].img.height,
        self.layers[i].x, 0, self.layers[i].img.width, self.layers[i].img.height);
      self.canvas.drawImage(self.layers[i].img, 0, 0, self.layers[i].img.width, self.layers[i].img.height,
        x1, 0, self.layers[i].img.width, self.layers[i].img.height);
    }
  };
}

const layer = new Array('images/space-wall.jpg', 'images/planet.png');
const parallax = new ParallaxScrolling(canvas, layer);

function controller() {
  // Pause the game
  if (keydown.p) {
    pauseGame();
    console.log(paused);
  }
}
