const Engine =  Matter.Engine;
const World  = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


var bottle,ground,randomNo,virusImage,groundImage,man,manImg,iground,bgImg;
var sling1,engine,world;
var invi,virusG,count;
var gameState="onsling"
var score = 0;


function preload(){
virusImage = loadImage("images/temp.png");

manImg = loadImage("images/man.png");
bgImg = loadImage("images/bg.png");

}

function setup() {
  createCanvas(800,400);
  
engine = Engine.create();
world = engine.world;


//ground = createSprite(400,380,800,20);
invi=createSprite(75,100,30,10);
virusG = new Group();
invi.visible=false;

var ground_options={
  isStatic:true
}
ground= Bodies.rectangle(400,380,800,20,ground_options);
World.add(world,ground);

var man_options={
restitution:0.5,
density:0.9,
friction:0.6

}

man = Bodies.rectangle(75,100,30,10,man_options)
World.add(world,man)
//iground = createSprite(100,240,100,10);
sling1 = new slingshot(man,{x:100,y:100});

}

function draw() {
 background(bgImg)


 Engine.update(engine);

 console.log(gameState)

// noStroke();
        textSize(35)
        
        text("Score  " + score, 200, 50)

 imageMode(CENTER)
 image(manImg,man.position.x,man.position.y,50,50);
 rectMode(CENTER);
 rect(ground.position.x,ground.position.y,800,20)

 
 //man.velocityY = 9;
// man.collide(iground)
 
//iground.visible = false;

 


spawnVirus();

if(invi.isTouching(virusG)){

virusG.destroyEach();
score = score+50;

}




sling1.display();
invi.x=man.position.x;
  invi.y=man.position.y;
  drawSprites();

}

function mouseDragged(){
if(gameState==="onsling"){
  Matter.Body.setPosition(man,{x:mouseX,y:mouseY});
 
}
}

function mouseReleased(){
  
sling1.fly();
gameState="launched";
 
}

function spawnVirus(){

  

if(frameCount%60===0){

  randomNo = Math.round(random(150,400));
 /* var opt={

    isStatic:true
  }
  virus=Bodies.rectangle(800,randomNo,50,50,opt);
  World.add(world,virus);

  rectMode(CENTER);
  rect(virus.position.x,virus.position.y,50,50);
  virus.speed=-3;*/
 var virus = createSprite(800,randomNo,10,10);
  virus.addImage(virusImage)
  virus.scale= 0.09

  virus.velocityX = -3;
  virus.shapeColor="white";
  virus.lifetime = 300;
  virusG.add(virus);

   //if(virus.isTouching(man)){
    // virus.destroy();
   //}*/
   //if(virus.x-man.x<virus.width/2+man.width/2 &&
   // man.x-virus.x<virus.width/2+man.width/2 &&
   // virus.y-man.y<virus.height/2+man.height/2 &&
   // man.y-virus.y<virus.height/2+man.height/2
   // )
    //{
    // virus.destroy();
    // console.log("virus killed")
   //}

}

}

function keyPressed(){

if(keyDown("space") && gameState==="launched"){

  sling1.attach(man);
  gameState="onSling"
  invi.x=man.position.x;
  invi.y=man.position.y;

}

}

