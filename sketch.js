//create world
await Canvas(800, 550);
displayMode(CENTER, PIXELATED, 1);

allSprites.pixelPerfect = true;

//global var
let gameState = 'start';
let player, playButton;
let score = 0;
let tick = 0;

let lettuces = [];
let burgers = [];

// player
player = new Sprite();
player.img = 'sprites/player.png';
player.x = 0;
player.y = -25;
player.w = 100;
player.h = 100;
player.color = '#00f0ff';
player.stroke = '#ff007f';
player.strokeWeight = 3;
player.collider = 'dynamic';
player.rotationLock = true;
player.sleeping = true; // freeze until game starts

// ground
let ground = new Sprite();
ground.y = -275;
ground.w = 800;
ground.h = 40;
ground.collider = 'static';
ground.visible = false;

// play button
playButton = new Sprite();
playButton.x = 0;
playButton.y = 100;
playButton.w = 220;
playButton.h = 70;
playButton.color = '#ff007f';
playButton.stroke = '#00f0ff';
playButton.strokeWeight = 3;
playButton.collider = 'static';

// start game
function startGame() {
    gameState = 'playing';
    playButton.visible = false;

    player.sleeping = false; // unfreeze player
}

// start screen
function drawStartScreen() {
    world.gravity.y = 0;
    fill('#085f1b');
    textSize(54);
    textAlign(CENTER, CENTER);
    text('BigBacks', 0, -45);

    rectMode(CENTER);
    fill('#085f1b');
    rect(playButton.x, playButton.y, playButton.w, playButton.h);

    player.visible = false;

    fill('#ffffff');
    textSize(24);
    text('PLAY', playButton.x, playButton.y);

    if (mouse.presses()) {
        const insideButton =
            mouse.x > playButton.x - playButton.w / 2 &&
            mouse.x < playButton.x + playButton.w / 2 &&
            mouse.y > playButton.y - playButton.h / 2 &&
            mouse.y < playButton.y + playButton.h / 2;

        if (insideButton) startGame();
    }
}

// GAME LOOP
function drawGame() {
    world.gravity.y = 6.5;
    player.visible = true;
    // jump
    if (mouse.presses() || kb.presses('space')) {
        player.vel.y = -4;
    }

    tick++;

    if (tick % 150 === 0) spawnLettuce();
    if (tick % 130 === 0) spawnBurger();

    // LETTUCE
    for (let i = lettuces.length - 1; i >= 0; i--) {
        let l = lettuces[i];

        l.vel.x = -2.5;          // MOVE LEFT (kinematic works)
        l.collider = 'kinematic';

        if (player.overlaps(l)) {
            score = max(0, score - 1);
            l.remove();
            lettuces.splice(i, 1);
            continue;
        }

        if (l.x < -450) {
            l.remove();
            lettuces.splice(i, 1);
        }
    }

    // BURGER
    for (let i = burgers.length - 1; i >= 0; i--) {
        let b = burgers[i];

        b.vel.x = -2;
        b.collider = 'kinematic';

        if (player.overlaps(b)) {
            score += 1;
            b.remove();
            burgers.splice(i, 1);
            continue;
        }

        if (b.x < -450) {
            b.remove();
            burgers.splice(i, 1);
        }
    }

    // SCORE
    fill('#085f1b');
    textSize(24);
    textAlign(LEFT, TOP);
    text('Score: ' + score, -380, -250);
}

// spawn lettuce
function spawnLettuce() {
    let l = new Sprite();
    l.img = 'sprites/lettuce.png';

    l.x = 380;
    l.y = random(-200, 200);
    l.w = 45;
    l.h = 45;

    l.collider = 'kinematic';
    l.vel.x = -2.5;

    lettuces.push(l);
}

// spawn burger (animated)
function spawnBurger() {
    let b = new Sprite();
    b.img = 'sprites/burger.png';

    b.x = 380;
    b.y = random(-200, 200);
    b.w = 50;
    b.h = 50;

    b.collider = 'kinematic';
    b.vel.x = -2;

    burgers.push(b);
}

// MASTER LOOP
q5.update = function () {

    background('#f1f0d1');

    world.step();

    camera.x = 0;
    camera.y = 0;

    camera.on();
    allSprites.draw();
    camera.off();

    if (gameState === 'start') {
        drawStartScreen();
    } else {
        drawGame();
    }
};