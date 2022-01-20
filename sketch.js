var ball, paddle, blocks, edges, score=0, life=3
var gamestate = "serve";
var brickSound,gameOverSound,bgSound;
var goImage,paddleImg,ballImg,bgImg;
var boxImg1;

function preload(){
  brickSound=loadSound("BreakingOfBrick.mp3");
  gameOverSound=loadSound("gameOver.wav");
  bgSound=loadSound("bgSound.mp3");
  goImage=loadImage("images/gameOver.png");
  bgImage=loadImage("images/bg.png");
  paddleImg = loadAnimation("images/p1.png","images/p2.png","images/p3.png","images/p4.png","images/p5.png","images/p6.png","images/p7.png","images/p8.png","images/p9.png","images/p10.png","images/p11.png","images/p12.png","images/p13.png","images/p14.png","images/p15.png","images/p16.png");
  ballImg = loadAnimation("images/b1.png","images/b2.png","images/b3.png","images/b4.png","images/b5.png","images/b6.png","images/b7.png","images/b8.png","images/b9.png","images/b10.png","images/b11.png","images/b12.png")
  boxImg1 = loadAnimation("images/bo1.png","images/bo2.png","images/bo3.png","images/bo4.png","images/bo5.png","images/bo6.png",
  "images/bo7.png","images/bo8.png","images/bo9.png")
}

function brickHit(ball,brick){
  brickSound.play();
  brick.remove();
  score+=25;
  if(ball.velocityY<12&&ball.velocityY>-12){
    ball.velocityX*=1.05;
    ball.velocityY*=1.05;
  }
}

function setup() {
  createCanvas(900,500);

  ball= createSprite(450, 350, 20, 21);
  ball.addAnimation("ball",ballImg);
  ball.scale = 0.5;
  paddle= createSprite(450,450,100,15);
  paddle.addAnimation("paddle",paddleImg);
  paddle.scale = 0.18;
  blocks=new Group();
  createBrick(50,"red");
  createBrick(90,"green");
  createBrick(130,"#31ebf5");
  createBrick(170,"yellow");
  createBrick(210,"orange");
 
  edges=createEdgeSprites();
}

function draw() {
 
  background(bgImage); 
  fill(255);
  text("Score- "+score,width-110,25);
  text("Lives- "+life,55,25);
  if(gamestate==="serve"){
    text("PRESS SPACE TO SERVE",380,300);
    if(keyDown("space")){
      gamestate="play"
      ball.velocityX=2;
      ball.velocityY=4;
    }
  }
  else if (gamestate==="end"){
   // text("GAME OVER",410 ,300)
   imageMode(CENTER);
   image(goImage,450,250,500,500);
  }
  else {
    play();
  }
  drawSprites();
}

function play(){
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1])
  ball.bounceOff(edges[2])
  ball.bounceOff(paddle);
  ball.bounceOff(blocks,brickHit);
  
  if(keyDown(LEFT_ARROW)){
    paddle.x-=10
  }
  if(keyDown(RIGHT_ARROW)){
    paddle.x+=10
  }
  if(!bgSound.isPlaying()){
    bgSound.play()
  }

  if(ball.y>500){
  gameOver()
  }
  paddle.collide(edges[0])
  paddle.collide(edges[1])
}


function createBrick(y,colour ){
  for(var i=0;i<8;i++){
    var brick=createSprite(100+100*i,y,95,25)
    brick.addAnimation("block",boxImg1);
    brick.scale= 0.59;
    //brick.shapeColor=colour
    blocks.add(brick) 
  }
}

function gameOver(){
  ball.setVelocity(0,0)
  ball.x=450
  ball.y=350
  
  life--
  if (life>=1)
  gamestate="serve"
  else 
  {
    if(bgSound.isPlaying()){
      bgSound.stop()
    }
    if(!gameOverSound.isPlaying()){
      gameOverSound.play()

    }
    gamestate="end"
    blocks.destroyEach()
    paddle.destroy()
    ball.destroy()
  } 
}