var tower;
var towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var lose, loseGroup;
var gameState = "play";

function preload() {
    towerImage = loadImage("tower.png");
    doorImage = loadImage("door.png");
    climberImage = loadImage("climber.png");
    ghostImage = loadImage("ghost-standing.png")
}

function setup() {
    createCanvas(600, 600);
    tower = createSprite(300,300, 50, 50);
    tower.addImage("tower", towerImage);
    tower.velocityY = 1;
    doorGroup = new Group(doorGroup);
    climberGroup = new Group (climberGroup);
    ghost = createSprite(200,200,10,10);
    ghost.debug = true;
    ghost.scale = 0.3;
    ghost.addImage("ghost", ghostImage)
    loseGroup = new Group(loseGroup);
}

function draw() {
    background("white");

    if(gameState === "play") {
        
        if(tower.y > 600) {
            tower.y = 300;
        }
    
        if(keyDown(LEFT_ARROW)) {
            ghost.x = ghost.x - 10;
        }
    
        if(keyDown(RIGHT_ARROW)) {
            ghost.x = ghost.x + 10;
        }
    
        if(keyDown(UP_ARROW)) {
            ghost.velocityY = -8;
        }
    
        if (ghost.isTouching(climberGroup)) {
            ghost.velocityY = 0;
            ghost.velocityX = 0;
            ghost.collide(climberGroup);
        }
    
        if (loseGroup.isTouching(ghost) || ghost.y > 600) {
            console.log("hello");
            ghost.destroy();
            gameState = "end";
        }
        ghost.velocityY = ghost.velocityY + 0.5

        doors();
        drawSprites();
    }

    if(gameState === "end") {
        tower.velocityY = 0;
        doorGroup.velocityEach = (0, 0);
        climberGroup.velocityEach = (0, 0);
        textSize(30);
        fill("yellow");
        text("Game Over", 200, 200);
    }
    
}

function doors() {
    if(frameCount % 250 === 0) {
        var door = createSprite(250, -50, 20, 20);
        door.x = Math.round(random(120,400));
        door.velocityY = 1;
        door.addImage("door.png", doorImage);
        door.lifetime = 800;
        doorGroup.add(door);
        
        var climber = createSprite(200, 10);
        climber.addImage("climber.png", climberImage);
        climber.x = door.x;
        climber.velocityY = 1;
        climber.lifetime = 800;
        climberGroup.add(climber);
        climber.debug = true;

        var lose = createSprite(200, 15);
        lose.width = climber.width;
        lose.height = 2;
        lose.x = door.x;
        lose.velocityY = 1;
        lose.lifetime = 800
        loseGroup.add(lose);
        // lose.visible = false;
        lose.debug = true;


        ghost.depth = door.depth;
        ghost.depth = ghost.depth + 1;
    }
}