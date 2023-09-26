  
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
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(255);
  
  if (gameState === "play") {
    
    if(keyDown(LEFT_ARROW)){
  ghost.x-=5
  
    if(keyDown(RIGHT_ARROW)){
  ghost.x+=5
    }
    if(keyDown("space")){
  ghost.velocityY=-5
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
   
  if(tower.y>600){
tower.y=tower.width/2
  }
    
      spawnDoors();
if(climbersGroup.isTouching(ghost)){
ghost.velocityY=0
}
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
gameState="end"
ghost.destroy()
}


  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}
}
function spawnDoors()
 {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x=Math.round(random(120,400))
   climber.x=door.x
invisibleBlock.x=door.x
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

   ghost.depth=door.depth
    ghost.depth+=1
     
door.lifetime=300
climber.lifetime=300
invisibleBlock.lifetime=300
    
doorsGroup.add(door)
climbersGroup.add(climber)
invisibleBlockGroup.add(invisibleBlock)
   
  }
}

