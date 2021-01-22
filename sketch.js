const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;

let blocks = [];

let polygon_img, polygon;

let score = 0;

let bgcol;

var gameState = "onSling";

function preload() {
  time();
  polygon_img = loadImage("polygon.png");
}

function setup() {
  createCanvas(800, 400);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height, width, 50);
  platform1 = new Ground(390, 315, 250, 40);

  for (let i = 300; i <= 480; i += 30) {
    blocks.push(new Block(i, 275, 30, 40));
  }

  for (let i = 330; i <= 450; i += 30) {
    blocks.push(new Block(i, 235, 30, 40));
  }

  for (let i = 360; i <= 420; i += 30) {
    blocks.push(new Block(i, 195, 30, 40));
  }

  blocks.push(new Block(390, 155, 30, 40));

  polygon = Bodies.circle(100, 200, 20, { density: 1.2, restitution: 0.4, friction: 1 });
  World.add(world, polygon);

  sling = new SlingShot(polygon, { x: 100, y: 200 });

  Engine.run(engine);
}

function draw() {
  if (bgcol)
    background(bgcol);

  ground.display();
  platform1.display();

  sling.display();

  imageMode(CENTER);
  image(polygon_img, polygon.position.x, polygon.position.y, 40, 40);

  noStroke();
  textSize(30);
  text("Score: " + score, 650, 70);

  textAlign(CENTER);
  if (gameState == "onSling") {
    text("Drag the hexagonal stone and throw it on the blocks", 400, 30);
  } else {
    text("Press space to get the stone back", 400, 30);
  }

  if (score == 320) {
    text("You Win!", 400, 200);
  }

  for (let block of blocks) {
    block.display();
    block.score();
  }

  drawSprites();

  if (mouseIsPressed) {
    Body.setPosition(polygon, { x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  sling.fly();
}

function keyPressed() {
  if (key == ' ') {
    sling.attach(polygon, {x: 100, y: 200});
  }
}

async function time() {
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/kolkata");
  var res = await response.json();
  var datetime = res.datetime.toString().slice(11, 13);

  let col;

  if (datetime > 6 && datetime < 18) {
    col = color(241, 171, 42);
  } else {
    col = color(19, 15, 45);
  }
  bgcol = col;
}