//create world
await Canvas(800, 550);
displayMode(CENTER, PIXELATED, 1);
allSprites.pixelPerfect = true;
world.gravity.y = 6.5; 

//global var
let gameState = 'start';
let player, playButton;
let score = 0;
let tick = 0;

let lettuces = [];
let burgers = [];

// CREATE SPRITES HERE
player = new Sprite();
player.x = 0;
player.y = -25;
player.w = 50;
player.h = 64;
player.color = '#00f0ff';
player.stroke = '#ff007f';
player.strokeWeight = 3;
player.collider = 'kinematic';

let ground = new Sprite();
ground.y = 250;
ground.w = 800;
ground.h = 40;
ground.collider = 'static';
ground.visible = false;

playButton = new Sprite();
playButton.x = 0;
playButton.y = 100;
playButton.w = 220;
playButton.h = 70;
playButton.color = '#ff007f';
playButton.stroke = '#00f0ff';
playButton.strokeWeight = 3;
playButton.collider = 'static';

//start game function, called upon button press
function startGame() {
    gameState = 'playing';
    playButton.visible = false;
    player.collider = 'dynamic';
}

//creates start screen
function drawStartScreen() {
    fill('#085f1b');
    textSize(54);
    textAlign(CENTER, CENTER);
    text('BigBacks', 0, -45);

    // BUTTON
    rectMode(CENTER);
    fill('#085f1b');
    rect(playButton.x, playButton.y, playButton.w, playButton.h);

    fill('#ffffff');
    textSize(24);
    textAlign(CENTER, CENTER);
    text('PLAY', playButton.x, playButton.y);

    // YOUR BULLETPROOF MANUAL CLICK DETECTION
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

function drawGame() {
    // player movement (flappy jump)
    if (mouse.presses() || kb.presses('space')) {
        player.vel.y = -12; 
        console.log("test");
    }

    // spawn logic
    tick++;

    if (tick % 90 === 0) {
        spawnLettuce();
    }

    if (tick % 140 === 0) {
        spawnBurger();
    }

    // lettuce collision (lose or reset position)
    for (let i = lettuces.length - 1; i >= 0; i--) {
        let l = lettuces[i];

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

    // burger collision (score gain)
    for (let i = burgers.length - 1; i >= 0; i--) {
        let b = burgers[i];

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

    // draw score
    fill('#085f1b');
    textSize(24);
    textAlign(LEFT, TOP);
    text('Score: ' + score, -380, -250);
}

function spawnLettuce() {
    let l = new Sprite();
    l.img = 'sprites/lettuce.png'; 
    l.x = 450;
    l.y = random(-200, 200);
    l.w = 50;
    l.h = 50;
    l.vel.x = -4;
    l.collider = 'static';

    lettuces.push(l);
    console.log("lettuce spawned");
}

function spawnBurger() {
    let b = new Sprite();
    b.img = 'sprites/burger.png';
    b.x = 450;
    b.y = random(-200, 200);
    b.w = 45;
    b.h = 45;
    b.vel.x = -4;
    b.collider = 'static';

    burgers.push(b);
    console.log("burger spawned");
}

// MASTER CONTROLLER LOOP
q5.update = function () {
    // 1. Wipe canvas first
    background('#f1f0d1');

    // 2. Keep physics running behind the scenes
    world.step();

    // 3. Keep camera forced to center view so sprites aren't rendered off screen
    camera.x = 0;
    camera.y = 0;

    // 4. Force engine to draw everything cleanly onto our viewport matrix
    camera.on();
    allSprites.draw();
    camera.off();

    // 5. Draw text and states over the sprites
    if (gameState === 'start') {
        drawStartScreen();
    } else {
        drawGame();
    }
};