//create world
await Canvas(800, 550); 
displayMode(CENTER, PIXELATED, 1);
allSprites.pixelPerfect = true;
world.gravity.y = 7.5;

//set game to start
let gameState = 'start'; 

//player sprite created
let player = new Sprite();
player.x = 0;
player.y = -25;
player.width = 50;
player.height = 64;
player.color = '#00f0ff';
player.stroke = '#ff007f';
player.strokeWeight = 3;
player.physics = 'kinematic';

//play button sprite created
let playButton = new Sprite(); 
playButton.width = 220;
playButton.height = 70;
playButton.color = '#ff007f';
playButton.stroke = '#00f0ff';
playButton.strokeWeight = 3;
playButton.physics = 'static';
playButton.text = "PLAY";
playButton.textSize = 24;
playButton.textColor = '#ffffff';

//startgame function (to be called upon click of playbutton)
function startGame() {
    gameState = 'playing';
    playButton.visible = false;
    playButton.collider = 'none'; 
    player.physics = 'dynamic';
}

//draw start screen function (to be called upon game loading in, issue with loading must be resolved)
function drawStartScreen() {
    background('#7929c4');

    stroke('#ff007f');
    strokeWeight(1);
    for (let i = 0; i < height; i += 30) {
        if (i > 350) {
            line(0, i, width, i);
        }
    }
    
    noStroke(); 
    textSize(54);
    textAlign(CENTER, CENTER);
    fill('#00f0ff');
    text('BigBacks', -2, 0 + 4);
    fill('#ff007f');
    text('BigBacks', 0, 0);

    //FIX: Wrap everything requiring playButton.mouse in a safety check
    if (playButton.mouse) {
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

//drawgame function (to be called upon click of playbutton)
function drawGame() {
    background('#ce3b3b');
    
    if (mouse.presses() || kb.presses('space')) {
        player.vel.y = -5;
    }

    fill('#00f0ff');
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Game started', width / 2, height / 2);
    
    allSprites.draw(); 
}


q5.update = function () {
    if (gameState === 'start') {
        drawStartScreen();
    } else if (gameState === 'playing') {
        drawGame();
    }
};