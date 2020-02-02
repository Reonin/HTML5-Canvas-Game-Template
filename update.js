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
          
            currentState = states.instruct;
          
        }


    }

   else if (currentState === states.instruct) {

        if (isMouseDown) {
          GameLoopMusic_sound.play();
            currentState = states.Game;
            canvas.scale(2,2);
            setTimeout( triggerEvent, 3000);
        }


    }

    else if (currentState === states.Game) {

      if(player.x < 960  && player.y < 540 && quadrant.firstRoom == false){
        if (quadrant.secondRoom == true) {
            canvas.translate( 960 ,0);
        }
        else if(quadrant.thirdRoom){
            canvas.translate(0,540);
        }
        messageX = 0;
        messageY = 0;

        for( var key in quadrant ) {
          quadrant[key] = false;
        }
        quadrant.firstRoom = true;

      }
      else if(player.x > 960 && player.y < 540 && quadrant.secondRoom == false){
        //debugger;
        if (quadrant.firstRoom == true) {
              canvas.translate(-960,0);
        }
        else if(quadrant.fourthRoom){
            canvas.translate(0,540);
        }

        messageX = 960;
        messageY = 0;

        for( var key in quadrant ) {
          quadrant[key] = false;
        }
        quadrant.secondRoom = true;

      }
      else if(player.x < 960  && player.y > 540 && quadrant.thirdRoom == false){
//debugger;
        if (quadrant.fourthRoom == true) {
            canvas.translate(960 ,0);
        }
        else if(quadrant.firstRoom){
          canvas.translate(0,-540);
        }

        messageX = 0;
        messageY = 540;

        for( var key in quadrant ) {
          quadrant[key] = false;
        }
        quadrant.thirdRoom = true;


      }
      else if(player.x > 960 && player.y > 540 && quadrant.fourthRoom == false){
      //  debugger;
        if (quadrant.thirdRoom == true) {
            canvas.translate(-960 ,0);
        }
        else if(quadrant.secondRoom == true){
          canvas.translate(0,-540);
        }

        messageX = 960;
        messageY = 540;

        for( var key in quadrant ) {
          quadrant[key] = false;
        }
        quadrant.fourthRoom = true;

      }
        //Player Movement Controls
        if (keydown.a && leftTurnOff == false) {
            /*if (player.velX > -player.speed) {
                player.velX--;
            }*/
            player.angle -= player.keyboardTurnSpeed;
          //  console.log("left angle :" + player.angle);
        }

        if (keydown.d && rightTurnOff == false) {
            player.angle += player.keyboardTurnSpeed;
          //  console.log("right angle :" + player.angle);
        }

        if (keydown.w && engineOff == false) {
            /*if (player.velY > -player.speed) {
                player.velY--;
            }*/// Calculate distance to center
            player.speed = player.keyboardThrust;

        }

        if (keydown.s) {
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
            if(secondEngineFix == true && keydown.down){
                message = "Engines back online!";
                engineOff = false;
                firstEngineFix = false;
                secondEngineFix = false;
                setTimeout( triggerEvent, 10000)
            }
            if(firstEngineFix == true && keydown.down == false){
                secondEngineFix = true;
            }
            if(keydown.down){
            firstEngineFix = true;
            }
        }

        if(leftTurnOff == true){
            if(leftSecondFix == true && keydown.space){
                message = "Left turn repaired!";
                leftTurnOff = false;
                leftFirstFix = false;
                leftSecondFix = false;
                setTimeout( triggerEvent, 10000)
            }
            if(leftFirstFix == true && keydown.space == false){
                leftSecondFix = true;
            }
            if(keydown.space){
             leftFirstFix = true;

            }
        }

        if(rightTurnOff == true){

            if(isMouseDown){
                message = "Right turn repaired!";
                rightTurnOff = false;
                setTimeout( triggerEvent, 10000)
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


        if(enemies.length < 40){
           // console.log("Length: " + enemies.length)
            var enemy = new Enemy();


            if(enemies.length < 17){
                lastEnemyLocY += 80;
                enemy.type = .1;
                enemy.rotation = 1;
                enemy.spinning = true;
            }
            else if(enemies.length === 17){
                lastEnemyLocX = 500;
                lastEnemyLocY = 100;

            }
            else if(enemies.length === 23){
                lastEnemyLocX = 1550;
                lastEnemyLocY = 0;
            }
            if(enemies.length >= 17 && enemies.length < 23){
                lastEnemyLocX += 90;
                lastEnemyLocY += 40;
                enemy.spinning = true;
            }
            if(enemies.length >= 23 && enemies.length <40){
                lastEnemyLocY += 80;
            }

            enemy.x = lastEnemyLocX;
            enemy.y = lastEnemyLocY;
            enemies.push(enemy);

           // if(enemies.length > 17){
            //    enemy.rotate();
           // }

        }
            enemies.forEach(function(enemy){
                enemy.update();
            });
            enemies = enemies.filter(function(enemy){
                return enemy.active;
            })
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
