function update() { // Updates location and reaction of objects to the canvas
  if (currentState === states.splash) {
    // splashTextX += 1;
    splashTextY += 1;

    if (splashTextY >= 300) {
      currentState = states.title;
    }
  }

  if (currentState === states.title) {
    if (keydown.space) {
      currentState = states.Game;
    }
  }

  if (currentState === states.Game) {
    // Player Movement Controls
    if (keydown.left) {
      if (player.velX > -player.speed) {
        player.velX--;
      }
    }

    if (keydown.right) {
      if (player.velX < player.speed) {
        player.velX++;
      }
    }

    if (keydown.up) {
      if (player.velY > -player.speed) {
        player.velY--;
      }
    }

    if (keydown.down) {
      if (player.velY < player.speed) {
        player.velY++;
      }
    }

    player.velX *= player.friction;
    player.x += player.velX;
    player.velY *= player.friction;
    player.y += player.velY;
    // prevents character from going past canvas
    player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
    // prevents character from going past canvas
    player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);

    // Player actions
    if (keydown.space) {
      player.shoot();
    }

    playerBullets.forEach((bullet) => {
      bullet.update();
    });

    playerBullets = playerBullets.filter((bullet) => bullet.active);

    if (keydown.v) {
      player.launch();
    }

    playerMissiles.forEach((missle) => {
      missle.update();
    });

    playerMissiles = playerMissiles.filter((missle) => missle.active);

    // Enemy Update logic
    enemies.forEach((enemy) => {
      enemy.update();
    });

    enemies = enemies.filter((enemy) => enemy.active);

    if (Math.random() < 0.1) {
      enemies.push(Enemy());
    }

    // Handle Collision
    handleCollisions();
  }

  if (currentState === states.End) {
    endTextY += 1;

    if (endTextY >= 300) {
      endTextY = 300;
    }
  }
}
