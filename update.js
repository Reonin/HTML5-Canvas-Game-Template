function update() { //Updates location and reaction of objects to the canvas


    if (currentState === states.splash) {

        //splashTextX += 1;
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


        //Player Movement Controls
        if (keydown.left && leftTurnOff == false) {
            /*if (player.velX > -player.speed) {
                player.velX--;
            }*/
            player.angle -= player.keyboardTurnSpeed;
          //  console.log("left angle :" + player.angle);
        }

        if (keydown.right && rightTurnOff == false) {
            player.angle += player.keyboardTurnSpeed;
          //  console.log("right angle :" + player.angle);
        }

        if (keydown.up && engineOff == false) {
            /*if (player.velY > -player.speed) {
                player.velY--;
            }*/// Calculate distance to center
            player.speed = player.keyboardThrust;

        }

        if (keydown.down) {
            if (player.velY < player.speed) {
                player.velY++;
            }

        }
      /*   var dx = BACKGROUND_CENTER_X - player.x;
            var dy = BACKGROUND_CENTER_Y - player.y;
            console.log("dx: " + dx);
            // Calculate angle to center
            var centerAngle = Math.atan2(dy, dx);
            var centerVelX = Math.cos(player.angle) * player.speed;
            var centerVelY = Math.sin(player.angle) * player.speed;
            console.log("x: " + centerVelX);
            console.log("y : " + centerVelY);
            //var velX = Math.cos(player.angle) * player.speed;
            //var velY = Math.sin(player.angle) * player.speed;
            player.x += centerVelX;
            player.y += centerVelY; */


        if(engineOff == true){
            if(secondEngineFix == true && keydown.shift){
                message = "Engines been fixed Pilot!";
                engineOff = false;
                firstEngineFix = false;
                secondEngineFix = false;
                setTimeout( triggerEvent, 15000)
            }
            if(firstEngineFix == true && keydown.shift == false){
                secondEngineFix = true;
            }
            if(keydown.shift){
            firstEngineFix = true;
            }
        }

        if(leftTurnOff == true){
            if(leftSecondFix == true && keydown.k){
                message = "The Left Wing been fixed Pilot!";
                leftTurnOff = false;
                leftFirstFix = false;
                leftSecondFix = false;
                setTimeout( triggerEvent, 15000)
            }
            if(leftFirstFix == true && keydown.k == false){
                leftSecondFix = false;
            }
            if(keydown.k){
             leftFirstFix = true;

            }
        }

        if(rightTurnOff == true){

            if(keydown.j){
                message = "The Right Wing been fixed Pilot!";
                rightTurnOff = false;
                setTimeout( triggerEvent, 15000)
               }
        }
/*
        player.velX *= player.friction;
        player.x += player.velX;
        player.velY *= player.friction;
        player.y += player.velY;
        */
        player.x = player.x.clamp(0, CANVAS_WIDTH - player.width); //prevents character from going past canvas


        player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height); //prevents character from going past canvas


        //Player actions
        if (keydown.space) {
            // player.shoot();
        }
        player.update();

        //Powerup Update logic
				powerups.forEach(function(powerup){
					powerup.update();
				});

				powerups = powerups.filter(function(powerup) {
						return powerup.active;
				});

				if (Math.random() < 0.001) {
						powerups.push(Powerup());
				}

        // playerBullets.forEach(function (bullet) {
        //     bullet.update();
        // });

        // playerBullets = playerBullets.filter(function (bullet) {
        //     return bullet.active;
        // });


        // if (keydown.v) {
        //     player.launch();
        // }

        // playerMissiles.forEach(function (missle) {
        //     missle.update();
        // });

        // playerMissiles = playerMissiles.filter(function (missle) {
        //     return missle.active;
        // });


        // //Enemy Update logic
        // enemies.forEach(function (enemy) {
        //     enemy.update();
        // });

        // enemies = enemies.filter(function (enemy) {
        //     return enemy.active;
        // });

        // if (Math.random() < 0.1) {
        //     enemies.push(Enemy());
        // }

        //Handle Collision
        handleCollisions();




    }



    if (currentState === states.End) {


        endTextY = endTextY + 1;

        if (endTextY >= 300) {

            endTextY = 300;
        }

    }


}
