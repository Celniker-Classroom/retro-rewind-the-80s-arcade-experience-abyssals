//create world
await Canvas(800, 550);
displayMode(CENTER, PIXELATED, 1);
allSprites.pixelPerfect = true;
world.gravity.y = 7.5;

//global var
let gameState = 'start';
let player, playButton;

// CREATE SPRITES HERE
player = new Sprite();
player.x = 0;
player.y = -25;
player.w = 50;
player.h = 64;
player.color = '#00f0ff';
player.stroke = '#ff007f';
player.strokeWeight = 3;
player.physics = 'kinematic';

playButton = new Sprite();
playButton.x = 0;
playButton.y = 100;
playButton.w = 220;
playButton.h = 70;
playButton.color = '#ff007f';
playButton.stroke = '#00f0ff';
playButton.strokeWeight = 3;
playButton.collider = 'static';

function startGame() {
    gameState = 'playing';
    playButton.visible = false;
    player.physics = 'dynamic';
}

function drawStartScreen() {
    background('#f1f0d1');

    fill('#085f1b');
    textSize(54);
    textAlign(CENTER, CENTER);
    text('BigBacks', 0, 0);

    // BUTTON
    rectMode(CENTER);

    fill('#085f1b');
    rect(playButton.x, playButton.y, playButton.w, playButton.h);

    fill('#ffffff');
    textSize(24);
    textAlign(CENTER, CENTER);
    text('PLAY', playButton.x, playButton.y);

    // Click detection
    if (mouse.presses()) {
        const insideButton =
            mouse.x > playButton.x - playButton.w / 2 &&
            mouse.x < playButton.x + playButton.w / 2 &&
            mouse.y > playButton.y - playButton.h / 2 &&
            mouse.y < playButton.y + playButton.h / 2;

    if (insideButton) {
        startGame();
    }
}

    allSprites.draw();
}

function drawGame() {
    background('#f1f0d1');

    if (mouse.presses() || kb.presses('space')) {
        player.vel.y = -5;
    }

    fill('#00f0ff');
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Game started', 0, 0);

    allSprites.draw();
}

q5.update = function () {
    world.step();

    if (gameState === 'start') {
        drawStartScreen();
    } else {
        drawGame();
    }
};