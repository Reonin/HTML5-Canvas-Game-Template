function draw() { //Draws objects to the canvas

    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (currentState === states.splash) {

        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = '25pt Calibri';
        var SPLASH_SCREEN_TEXT = "Team Splash Screen";
        splashTextX = canvas.measureText(SPLASH_SCREEN_TEXT).width;
        canvas.fillText(SPLASH_SCREEN_TEXT, (CANVAS_WIDTH / 2) - (splashTextX / 2), splashTextY);
    }

    else if (currentState === states.title) {

        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = 'bold 40pt Calibri';
        var GAME_NAME_TEXT = "Dream Team : R.E.M Cycle Repair";
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; //Centers the text based on length
        canvas.fillText(GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - (gameTextx / 2) - 3, CANVAS_HEIGHT / 3);
        //The next two create a special text effect
        canvas.fillStyle = "#F00";
        canvas.fillText(GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - (gameTextx / 2), CANVAS_HEIGHT / 3);

        canvas.fillStyle = "00F";
        canvas.fillText(GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - (gameTextx / 2) + 3, CANVAS_HEIGHT / 3);

        canvas.fillStyle = "#F00";
        canvas.font = 'bold 20pt Calibri';
        var SPACEBAR_TEXT = "Press Space to Continue";
        spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; //Centers the text based on length
        canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 4);

        canvas.drawImage(titleImg1, (CANVAS_WIDTH / 2) - 100, (CANVAS_HEIGHT / 2));
        canvas.drawImage(titleImg2, (CANVAS_WIDTH / 2) + 100, (CANVAS_HEIGHT / 2));

    }
    else if (currentState === states.instruct) {
        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = 'bold 40pt Calibri';
        var GAME_NAME_TEXT = "The sleep space R. E. M cycle rail has been broken. Help number 2 and 8 of the dream team fix it and get us back to a restful nights sleep. Their ship the 'Counting Sheep' has seen better days and needs your help to keep it moving";
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; //Centers the text based on length
        // canvas.fillText(GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - (gameTextx / 2) - 3, CANVAS_HEIGHT / 3);
        // //The next two create a special text effect
        // canvas.fillStyle = "#F00";
        // canvas.fillText(GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - (gameTextx / 2), CANVAS_HEIGHT / 3);

  

        canvas.fillStyle = "#F00";
        canvas.font = 'bold 20pt Calibri';
        var SPACEBAR_TEXT = "Click to Continue";
        spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; //Centers the text based on length
        canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 4);


        wrapText(canvas, GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - 650, 400, CANVAS_WIDTH/2 ,25 )

        wrapText(canvas, "Use 'W' 'A' 'S' to steer ", (CANVAS_WIDTH / 2) - 400, 500, CANVAS_WIDTH/2 ,25 )
        wrapText(canvas, "Press Down arrow to hit the hay", (CANVAS_WIDTH / 2) - 400, 550, CANVAS_WIDTH/2 ,25 )
        wrapText(canvas, "Press Space to saw logs", (CANVAS_WIDTH / 2) - 400, 600, CANVAS_WIDTH/2 ,25 )
        wrapText(canvas, "Click to use the extinguisher and take the lights out", (CANVAS_WIDTH / 2) - 400, 650, CANVAS_WIDTH/2 ,25 )

        canvas.drawImage(titleImg1, 1200, (CANVAS_HEIGHT / 2));
        canvas.drawImage(titleImg2, 300, (CANVAS_HEIGHT / 2));
    }

  else if (currentState === states.Game) {

        parallax.Draw(); //draw background
        player.draw();
        drawrail();
        writeMessage(canvas, message);

        // tileArray.forEach(function (tile) {
        //     tile.draw();
        // });

        // playerBullets.forEach(function (bullet) {
        //     bullet.draw();
        // });

        // playerMissiles.forEach(function (missle) {
        //     missle.draw();
        // });

        //Enemy Draw
        enemies.forEach(function (enemy) {
            if(enemy.active===true){
                enemy.draw();
                if(enemy.spinning === true){
                    enemy.rotate();
                }
            }
        });

        //PowerUp Draw
		    powerups.forEach(function(powerup) {
                    powerup.draw();
        });
        restArea.draw();
        //Life Bar top is pink static background
        canvas.strokeRect(20, 20, 100 * 2, 10);
        canvas.fillStyle = "#8B8989";
        canvas.fillRect(20, 20, 100 * 2, 10);

        //Second bar is red dynamic one
        canvas.strokeRect(20, 20, 100 * 2, 10);
        canvas.fillStyle = "#F00";
        canvas.fillRect(20, 20, player.life * 2, 10);

        canvas.fillStyle = "yellow";
        canvas.font = 'bold 20pt Calibri';
        var SCORE_TEXT = 'ZZZ x: ' + timer;
        canvas.fillText(SCORE_TEXT, 750 + messageX, 50 + messageY);
        

        if(endFlag == false){
            endZoomOutFactor = endZoomOutFactor - 0.00001;   
            canvas.scale(endZoomOutFactor,endZoomOutFactor);
        }
       
    }

  else if (currentState === states.End) {


        canvas.fillStyle = "#F00"; // Set color to red
        canvas.font = '25pt Calibri';

        var GameOVER_TEXT = "Game Over";
        endTextX = canvas.measureText(GameOVER_TEXT).width; //Centers the text based on length
        canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH/2) - (GameOVER_TEXT/2) , CANVAS_HEIGHT-CANVAS_HEIGHT/4);

        canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY - 90);


        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = '20pt Calibri';
        endTextX = canvas.measureText("Blake Balick-Shreiber").width;
        canvas.fillText("Blake Balick-Shreiber", (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY - 45);


        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = '20pt Calibri';
        canvas.fillText("Corey Jeffers", (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY);



    }


}
