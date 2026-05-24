//create world
await Canvas(800, 550);
displayMode(CENTER, PIXELATED, 1);
allSprites.pixelPerfect = true;

//global var
let gameState = 'start';

let player;

let score = 0;
let tick = 0;

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
player.debug = true;

// ground
let ground = new Sprite();
ground.x = 0;
ground.y = 250;
ground.w = 800;
ground.h = 40;
ground.physics = STATIC;
ground.color = '#654321';
ground.visible = true;
ground.rotationLock = true;
ground.debug = true;

// play button
let playButton = {
    x: 0,
    y: 100,
    w: 220,
    h: 70
};

// START GAME
function startGame() {
    gameState = 'playing';
    player.visible = true;
    player.sleeping = false;
    player.vel.x = 0;
    player.vel.y = 0;
    player.rotation = 0;
}

// START SCREEN
function drawStartScreen() {
    world.gravity.y = 0;
    fill('#085f1b');
    textSize(54);
    textAlign(CENTER, CENTER);
    strokeWeight(0);
    text('BigBacks', 0, -45);

    // button
    rectMode(CENTER);
    fill('#085f1b');
    stroke('#085f1b');
    strokeWeight(3);
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

    // click detection
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
}

// game loop
function drawGame() {
    world.gravity.y = 6.5;
    player.visible = true;
    player.vel.x = 0;
    player.rotation = 0;

    if (mouse.presses() || kb.presses('space')) {
        player.vel.y = -4;
    }

    tick++;

    if (tick % 180 === 0) {
        spawnLettuce();
    }

    if (tick % 150 === 0) {
        spawnBurger();
    }

    // REMOVE LISTS
    let lettucesToRemove = [];
    let burgersToRemove = [];

    // LETTUCE
    for (let l of lettuces) {
        if (player.overlaps(l)) {
            score = max(0, score - 1);
            lettucesToRemove.push(l);
        }

        else if (l.x < -450) {
            lettucesToRemove.push(l);
        }
    }

    // BURGER
    for (let b of burgers) {
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
        l.x = -9999;
        l.y = -9999;
        l.vel.x = 0;
    }

    for (let b of burgersToRemove) {
        b.active = false;
        b.visible = false;
        b.x = -9999;
        b.y = -9999;
        b.vel.x = 0;
    }

    // score
    fill('#085f1b');
    strokeWeight(0);
    textSize(24);
    textAlign(LEFT, TOP);
    text(
        'Score: ' + score,
        -380,
        -250
    );
}

// spawn lettuce
function spawnLettuce() {
    let l = new lettuces.Sprite();
    l.img = 'sprites/lettuce.png';
    l.x = 380;
    l.y = random(-200, 200);
    l.diameter = 22;
    l.collider = 'sensor';
    l.gravityScale = 0;
    l.vel.x = -2.5;
    l.rotationLock = true;
    l.debug = true;
    l.active = true;
}

// spawn burger
function spawnBurger() {
    let b = new burgers.Sprite();
    b.img = 'sprites/burger.png';
    b.x = 380;
    b.y = random(-200, 200);
    b.w = 30;
    b.h = 24;
    b.collider = 'sensor';
    b.gravityScale = 0;
    b.vel.x = -2;
    b.rotationLock = true;
    b.debug = true;
    b.active = true;
}

// control loop
q5.update = function () {
    camera.x = 0;
    camera.y = 0;
    background('#f1f0d1');

    if (gameState === 'start') {
        drawStartScreen();
    }

    else {
        drawGame();
    }
};