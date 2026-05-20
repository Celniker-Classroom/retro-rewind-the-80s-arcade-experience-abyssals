// 1. Create the world instantly at top-level
await Canvas(800, 550); 
displayMode(CENTER, PIXELATED, 1);
allSprites.pixelPerfect = true;
world.gravity.y = 7.5;

// Define global variables
let gameState = 'start'; 
let player, playButton;

// 2. Wrap initialization inside a standard engine lifecycle hook
// This guarantees q5play has attached all methods to the instance.
q5.preload = function() {
    // Player sprite created
    player = new Sprite();
    player.x = 0;
    player.y = -25;
    player.w = 50;         
    player.h = 64;         
    player.color = '#00f0ff';
    player.stroke = '#ff007f';
    player.strokeWeight = 3;
    player.physics = 'kinematic';

    // Play button sprite created
    playButton = new Sprite(); 
    playButton.x = 0;      
    playButton.y = 100;    
    playButton.w = 220;    
    playButton.h = 70;     
    playButton.color = '#ff007f';
    playButton.stroke = '#00f0ff';
    playButton.strokeWeight = 3;
    playButton.physics = 'static';
    playButton.text = "PLAY";
    playButton.textSize = 24;
    playButton.textColor = '#ffffff';
};

// Startgame function
function startGame() {
    gameState = 'playing';
    playButton.visible = false;
    playButton.collider = 'none'; 
    player.physics = 'dynamic';
}

// Draw start screen function
function drawStartScreen() {
    background('#7929c4');

    // Retro grid lines matching centered camera coordinates
    stroke('#ff007f');
    strokeWeight(1);
    for (let i = 0; i < height / 2; i += 30) {
        line(-width / 2, i, width / 2, i);
    }
    
    noStroke(); 
    textSize(54);
    textAlign(CENTER, CENTER);
    fill('#00f0ff');
    text('BigBacks', -2, 4);
    fill('#ff007f');
    text('BigBacks', 0, 0);

    // Mouse interaction safety check
    if (playButton && playButton.mouse) {
        if (playButton.mouse.hovering()) {
            playButton.color = '#00f0ff';
            playButton.stroke = '#ff007f';
            cursor(HAND);
        } else {
            playButton.color = '#ff007f';
            playButton.stroke = '#00f0ff';
            cursor(ARROW);
        }
        
        if (playButton.mouse.presses()) {
            startGame();
        }
    }
    
    allSprites.draw(); 
}

// Drawgame function
function drawGame() {
    background('#ce3b3b');
    
    if (mouse.presses() || kb.presses('space')) {
        player.vel.y = -5;
    }

    fill('#00f0ff');
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Game started', 0, 0); 
    
    allSprites.draw();  
}

// Core engine loop
q5.update = function () {
    world.step(); 

    if (gameState === 'start') {
        drawStartScreen();
    } else if (gameState === 'playing') {
        drawGame();
    }
};