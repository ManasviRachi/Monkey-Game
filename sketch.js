
var monkey , monkey_running , ground , player;
var banana ,bananaImage, obstacle, obstacleImage;
var gameOver,gameOverImage;
var FoodGroup, obstacleGroup;
var gameOverSound;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
   createCanvas(500,500);
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameOver.png");
  gameOverSound = loadSound("game-over-sound-effect.mp3");

 
}

function setup() {
  player = createSprite(100,340,20,50);
  player.addAnimation("monkey" , monkey_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  gameOver = createSprite(200,200);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible = false;
  
  survivalTime.visible = true
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
   background(255);
  
  if(gameState === PLAY){
    food();
    obstacles();
    
    stroke("black");
  textSize(20);
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50)
    
  textSize(15);
  text("Score: " + score,150,80);
   
    if(ground.x<0){
   ground.x=ground.width/2;
  }
  
  if(keyDown("space") && player.y >= 250) {
   player.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.8;
  
  player.collide(ground);
  
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score+1;
  }
    
  else if(obstacleGroup.isTouching(player)){
          gameState = END;
        gameOverSound.play();
        foodGroup.destroyEach();
        obstacleGroup.destroyEach();
        foodGroup.velocityX = 0;
        obstacleGroup.velocityX = 0;
        player.visible = false;
        ground.visible = false;
        gameOver.visible = true;
         
  }
}
  drawSprites();
  
}

function food(){
  if(frameCount%80===0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.lifetime=115;
    banana.scale=0.1;
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
     var obstacle = createSprite(800,320,10,40);
     obstacle.velocityX = -6;
     obstacle.addImage("obstacle" ,obstacleImage);
     obstacle.scale = 0.15;
     obstacle.lifetime = 300;
     obstacleGroup.add(obstacle);
    // obstacle.debug = true;
  
  }
}




