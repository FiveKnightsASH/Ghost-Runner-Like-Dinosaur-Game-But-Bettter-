var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  tower = createSprite(300, 300, 600, 600);
  tower.addImage(towerImg);
  tower.velocityY = 2;

  ghost = createSprite( 200, 200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  
}

function draw() {
  background(0);
  console.log(gameState);

  if(gameState == "play"){
 // Infinite tower
  if(tower.y>400){
  tower.y = 300;
}

  if(keyDown("LEFT_ARROW")){
  ghost.x -= 3;
}

  if(keyDown("RIGHT_ARROW")){
  ghost.x += 3;
}

  if(keyDown("space")){
  ghost.velocityY = -10;
}

  ghost.velocityY += 0.8;

if(ghost.isTouching(climbersGroup)){
  ghost.velocityY = 0;
}

if(ghost.isTouching(invisibleBlockGroup) || ghost.y >600){
  ghost.destroy();
  gameState = "end";

}

spawnDoors()

  }

  else if(gameState == "end"){

    textSize(30);
    fill("yellow");
    text("Game Over", 250, 300);
    tower.destroy();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    
  }
 
  
  drawSprites();
}

function spawnDoors(){
  if(frameCount % 200 ==0){
    door = createSprite(200, -50);
    door.addImage(doorImg);

    door.velocityY = 2;
    door.x = Math.round(random(150,450));
    door.lifetime = 310;


    doorsGroup.add(door);

    climber = createSprite(200, 10);
    climber.addImage(climberImg);

    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 310;
    climbersGroup.add(climber);


    ghost.depth = door.depth + 1;
    ghost.depth = climber.depth +1;

    invisibleBlock = createSprite(200, 15, 100, 2);
    invisibleBlock.velocityY = 2;
    invisibleBlock.x = climber.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.debug = true;
    //invisibleBlock.visible = false;
    invisibleBlock.lifetime = 300;
    
    invisibleBlockGroup.add(invisibleBlock);
    
  }

}
