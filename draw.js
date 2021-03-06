function draw() { //Draws objects to the canvas

    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (currentState === states.splash) {

        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = '25pt Calibri';
        var SPLASH_SCREEN_TEXT = "Team Splash Screen";
        splashTextX = canvas.measureText(SPLASH_SCREEN_TEXT).width;
        canvas.fillText(SPLASH_SCREEN_TEXT, (CANVAS_WIDTH / 2) - (splashTextX / 2), splashTextY);
    }

    if (currentState === states.title) {

        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = 'bold 40pt Calibri';
        var GAME_NAME_TEXT = "GAME NAME";
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

    }

    if (currentState === states.Game) {
        parallax.Draw(); //draw background
        player.draw();

        tileArray.forEach(function (tile) {
            tile.draw();
        });

        playerBullets.forEach(function (bullet) {
            bullet.draw();
        });

        playerMissiles.forEach(function (missle) {
            missle.draw();
        });

        //Enemy Draw
        enemies.forEach(function (enemy) {
            enemy.draw();
        });

        //Life Bar top is pink static background
        canvas.strokeRect(20, 20, 100 * 2, 10);
        canvas.fillStyle = "#8B8989";
        canvas.fillRect(20, 20, 100 * 2, 10);

        //Second bar is red dynamic one
        canvas.strokeRect(20, 20, 100 * 2, 10);
        canvas.fillStyle = "#F00";
        canvas.fillRect(20, 20, player.life * 2, 10);


    }



    if (currentState === states.End) {


        canvas.fillStyle = "#F00"; // Set color to red
        canvas.font = '25pt Calibri';

        var GameOVER_TEXT = "Game Over";
        endTextX = canvas.measureText(GameOVER_TEXT).width; //Centers the text based on length
        //canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH/2) - (GameOVER_TEXTx/2) , CANVAS_HEIGHT-CANVAS_HEIGHT/4);

        canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY - 90);


        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = '20pt Calibri';
        endTextX = canvas.measureText("First Firstnameson").width;
        canvas.fillText("First Firstnameson", (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY - 45);


        canvas.fillStyle = "#000"; // Set color to black
        canvas.font = '20pt Calibri';
        canvas.fillText("Second Secondton", (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY);



    }


}