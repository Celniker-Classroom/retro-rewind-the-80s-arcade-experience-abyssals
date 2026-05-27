//create world
await Canvas(800, 550);
displayMode(CENTER, PIXELATED, 1);
allSprites.pixelPerfect = true;

//global var
let gameState = 'start';
let player;
let score = 0;
let tick = 0;
let finalScore = 0;

// groups
let lettuces = new Group();
let burgers = new Group();

// player
player = new Sprite();
player.img = 'sprites/player.png';
player.x = 0;
player.y = -25;
player.scale = 2;
player.diameter = 56;
player.collider = 'dynamic';
player.rotationLock = true;
player.sleeping = true;

// ground
let ground = new Sprite();
ground.x = 0;
ground.y = 250;
ground.w = 800;
ground.h = 45;
ground.physics = STATIC;
ground.color = '#4B2E83';
ground.visible = false;
ground.rotationLock = true;

let ceiling = new Sprite();
ceiling.x = 0;
ceiling.y = -250;
ceiling.w = 800;
ceiling.h = 45;
ceiling.physics = STATIC;
ceiling.color = '#6A3EA1';
ceiling.visible = false;
ceiling.rotationLock = true;

// play button
let playButton = {
    x: 0,
    y: 40,
    w: 220,
    h: 70
};

// how to play button
let howToButton = {
    x: 0,
    y: 120,
    w: 220,
    h: 60
};

// write-up button
let writeUpButton = {
    x: 0,
    y: 200,
    w: 260,
    h: 60
};

function startGame() {
    gameState = 'playing';
    ground.visible = true;
    ceiling.visible = true;
    player.visible = true;
    player.sleeping = false;
    player.vel.x = 0;
    player.vel.y = 0;
    player.rotation = 0;
}

function drawStartScreen() {
    world.gravity.y = 0;
    fill('#00FF9C');
    textSize(54);
    textAlign(CENTER, CENTER);
    strokeWeight(0);
    text('BigBacks', 0, -110);

    // button
    rectMode(CENTER);
    fill('#FF4FD8');
    rect(
        playButton.x,
        playButton.y,
        playButton.w,
        playButton.h
    );

    player.visible = false;

    // button text
    fill('#ffffff');
    strokeWeight(0);
    textSize(24);
    text(
        'PLAY',
        playButton.x,
        playButton.y
    );

    // htp button
    fill('#4B7BFF');
    rect(
        howToButton.x,
        howToButton.y,
        howToButton.w,
        howToButton.h
    );
    fill('#ffffff');
    strokeWeight(0);
    textSize(20);

    // htp button text
    text(
        'HOW TO PLAY',
        howToButton.x,
        howToButton.y
    );

    // write-up button
    fill('#FFB347');
    rect(
        writeUpButton.x,
        writeUpButton.y,
        writeUpButton.w,
        writeUpButton.h
    );

    fill('#ffffff');
    strokeWeight(0);
    textSize(20);

    text(
        'PROJECT WRITE-UP',
        writeUpButton.x,
        writeUpButton.y
    );

    if (mouse.presses()) {
        // play btn
        const insidePlay =
            mouse.x > playButton.x - playButton.w / 2 &&
            mouse.x < playButton.x + playButton.w / 2 &&
            mouse.y > playButton.y - playButton.h / 2 &&
            mouse.y < playButton.y + playButton.h / 2;

        // htp btn
        const insideHowTo =
            mouse.x > howToButton.x - howToButton.w / 2 &&
            mouse.x < howToButton.x + howToButton.w / 2 &&
            mouse.y > howToButton.y - howToButton.h / 2 &&
            mouse.y < howToButton.y + howToButton.h / 2;

        // writeup btn
        const insideWriteUp =
            mouse.x > writeUpButton.x - writeUpButton.w / 2 &&
            mouse.x < writeUpButton.x + writeUpButton.w / 2 &&
            mouse.y > writeUpButton.y - writeUpButton.h / 2 &&
            mouse.y < writeUpButton.y + writeUpButton.h / 2;

        if (insidePlay) {
            startGame();
        }

        if (insideHowTo) {
            gameState = 'howToPlay';
        }

        if (insideWriteUp) {
            gameState = 'writeUp';
        }
    }  
}

function drawHowToPlay() {
    background('#161925');
    fill('#00FF9C');
    textAlign(CENTER, CENTER);
    textSize(42);
    text('HOW TO PLAY', 0, -180);
    textSize(24);
    fill('#ffffff');
    text('Collect burgers for points.', 0, -60);
    text('Avoid lettuce; don\'t eat too much!', 0, 0);
    text('Click or press SPACE to jump', 0, 60);
    fill('#FF4FD8');
    textSize(20);
    text('CLICK ANYWHERE TO RETURN', 0, 180);
    if (mouse.presses()) {
        gameState = 'start';
    }
}

function drawWriteUp() {
    background('#161925');
    textAlign(CENTER, CENTER);
    fill('#00FF9C');
    textSize(38);
    text('PROJECT WRITE-UP', 0, -220);
    fill('#ffffff');
    textSize(16);

    text(
        'Our game, BigBacks, is based off of the 80s-style\n' +
        'classic game Flappy Bird, itself inspired by Helicopter.\n\n' +

        'We borrowed the same player mechanics, as the player only \n' +
        'controls vertical movement, while objects move toward the player.\n\n' +

        'However, we added a scoring system using burgers and lettuce,\n' +
        'instead of the FlappyBirdian instant death obstacles.\n\n' +

        'Burgers increase the score, while lettuce decreases it.\n' +
        'Eating too much lettuce causes game over.\n\n' +

        'Also unlike Flappy Bird, the player can survive multiple obstacles,\n' +
        'and burgers/lettuce move at different speeds.\n\n' +

        'All in all, we made some \'big\' changes to the classic game format.\n' +
        'We hope you enjoy BigBacks!!!',
        0,
        0
    );

    fill('#FF4FD8');
    textSize(20);

    text(
        'CLICK ANYWHERE TO RETURN',0,220);

    if (mouse.presses()) {
        gameState = 'start';
    }
}

function drawGameOver() {
    background('#161925');
    fill('#FF4FD8');
    textAlign(CENTER, CENTER);
    textSize(54);
    text('GAME OVER', 0, -60);
    fill('#ffffff');
    textSize(28);
    text('You were too healthy.', 0, 20);
    fill('#00FF9C');
    textSize(20);
    text('CLICK TO RETURN TO MENU', 0, 140);
    if (mouse.presses()) {
        for (let l of lettuces) {
            l.active = false;
            l.visible = false;
            l.collider = 'none';
            l.x = -9999;
            l.y = -9999;
            l.vel.x = 0;
            l.vel.y = 0;
        }
        for (let b of burgers) {
            b.active = false;
            b.visible = false;
            b.collider = 'none';
            b.x = -9999;
            b.y = -9999;
            b.vel.x = 0;
            b.vel.y = 0;
        }
        score = 0;
        tick = 0;
        player.x = 0;
        player.y = -25;
        player.vel.x = 0;
        player.vel.y = 0;
        player.rotation = 0;
        player.sleeping = true;
        player.visible = false;
        gameState = 'start';
    }
}

function drawGame() {
    world.gravity.y = 6.5;
    player.visible = true;
    player.vel.x = 0;
    player.rotation = 0;

    if (mouse.presses() || kb.presses('space')) {
        player.vel.y = -4;
    }

    tick++;

    if (tick % 30 === 0) {
        spawnLettuce();
    }

    if (tick % 45 === 0) {
        spawnBurger();
    }

    // REMOVE LISTS
    let lettucesToRemove = [];
    let burgersToRemove = [];

    // LETTUCE
    // LETTUCE
    for (let l of lettuces) {
        if (!l.active) continue;

        if (player.overlaps(l)) {
            score -= 1;
            lettucesToRemove.push(l);

            if (score <= -5) {
                finalScore = score;
                gameState = 'gameOver';

                player.sleeping = true;
                player.vel.x = 0;
                player.vel.y = 0;
            }
        }

        else if (l.x < -450) {
            lettucesToRemove.push(l);
        }
    }

    // BURGER
    for (let b of burgers) {
        if (!b.active) continue;

        if (player.overlaps(b)) {
            score += 1;
        burgersToRemove.push(b);
        }
        else if (b.x < -450) {
            burgersToRemove.push(b);
        }
    }

    for (let l of lettucesToRemove) {
        l.active = false;
        l.visible = false;
        l.collider = 'none';
        l.x = -9999;
        l.y = -9999;
        l.vel.x = 0;
        l.vel.y = 0;
    }

    for (let b of burgersToRemove) {
        b.active = false;
        b.visible = false;
        b.collider = 'none';
        b.x = -9999;
        b.y = -9999;
        b.vel.x = 0;
        b.vel.y = 0;
    }  

    // score
    fill('#00FF9C');
    strokeWeight(0);
    textSize(24);
    textAlign(LEFT, TOP);
    text('Score: ' + score, -380, -220);
}

function spawnLettuce() {
    let l = new lettuces.Sprite();
    l.img = 'sprites/lettuce.png';
    l.x = 420;
    l.y = random(-200, 200);
    l.scale = 1.5;
    l.diameter = 33;
    l.collider = 'sensor';
    l.gravityScale = 0;
    l.vel.x = -2.5;
    l.rotationLock = true;
    l.active = true;
}

function spawnBurger() {
    let b = new burgers.Sprite();
    b.img = 'sprites/burger.png';
    b.x = 420;
    b.y = random(-200, 200);
    b.w = 26;
    b.h = 30;
    b.scale = 1.5;
    b.collider = 'sensor';
    b.gravityScale = 0;
    b.vel.x = -8;
    b.rotationLock = true;
    b.active = true;
}

q5.update = function () {
    camera.x = 0;
    camera.y = 0;
    background('#161925');

    if (gameState === 'start') {
        drawStartScreen();
    }

    else if (gameState === 'howToPlay') {
        drawHowToPlay();
    }

    else if (gameState === 'writeUp') {
        drawWriteUp();
    }

    else if (gameState === 'playing') {
        drawGame();
    }

    else if (gameState === 'gameOver') {
        drawGameOver();
    }
};