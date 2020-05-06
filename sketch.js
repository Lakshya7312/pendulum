const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground;
var holder;
var ball;
var string;

function setup() {
  createCanvas(600,500);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(300, 490, 593, 10);

  holder = new Holder(280, 90, 200, 15);

  var ball_options = {
    'density' : 0.8,
    'restitution' : 1.0
  }
  ball = Bodies.circle(300, 400, 40, ball_options);
  World.add(world, ball);


  var string_options = {
    bodyA: ball,
    bodyB: holder.body,
    stiffness: 0.03,
    length: 250 
  }

  string = Constraint.create(string_options);
  World.add(world, string);
 }

function draw() {
  background("black");  
  Engine.update(engine);

  fill("white");
  textSize(20);
  text("Press SPACE to move the pendulum with the mouse", 100, 30);

  fill("white");
  textSize(20);
  text("Press ENTER to release the pendulum", 140, 55);

  fill("red");
  ellipseMode(RADIUS);
  ellipse(ball.position.x, ball.position.y, 40, 40);

  strokeWeight(6);
  stroke("white");
  line(ball.position.x, ball.position.y, holder.body.position.x, holder.body.position.y);

  if(keyCode === 32) {
    ball.position.x = mouseX;
    ball.position.y = mouseY;
  }

  else if(keyCode === ENTER) {  
    ball.position.x = 300;
  }

  ground.show();

  holder.display();
}

function Ground(x, y, width, height){
   var options = {
     isStatic: true
   }
   this.body = Bodies.rectangle(x, y, width, height, options);
   this.width = width;
   this.height = height;
   World.add(world, this.body);

   this.show = function() {
   var pos = this.body.position;
   strokeWeight(2);
   stroke("white");
   fill("black");
   rectMode(CENTER);
   rect(pos.x, pos.y, this.width, this.height);
   }
};
