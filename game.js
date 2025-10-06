// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

var plrspeed = 0.03
var jumpforce = 0.08
var boxsize = 40
var moveDirX = 0
var isHoldingSpace = false

// create two boxes and a ground
var charObj = Bodies.rectangle(300, 120, 40, 40, {friction: 0.5});
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [charObj, boxA, boxB, ground]);

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine);

// Get a reference to the element where you want to listen for key events
// For example, the whole document or a specific input field
const targetElement = document; // or document.getElementById('myInputField');
targetElement.addEventListener('click', (event) => {
    const mouseX = event.clientX; // X coordinate relative to the viewport
    const mouseY = event.clientY; // Y coordinate relative to the viewport

    var boxC = Bodies.rectangle(mouseX, mouseY, boxsize, boxsize);
    Composite.add(engine.world, [boxC]);
    //console.log('evil boxy boo');
});
targetElement.addEventListener('keydown', (event) => {
  // The 'event' object contains information about the key press
  const pressedKey = event.key;
  //console.log(`Key pressed: ${pressedKey}`);

  if (pressedKey === 'a') {
    //charObj.force.x -= plrspeed;
    if (moveDirX != -1) {
        moveDirX = -1
    }
  }
  if (pressedKey === 'd') {
    //charObj.force.x += plrspeed;
    if (moveDirX != 1) {
        moveDirX = 1
    }
  }
  if (pressedKey === 'w') {
    if (holdingSpace == false) {
        holdingSpace = true
    }
    //charObj.force.y -= jumpforce;
  }
  if (pressedKey === 's') {
    charObj.force.x = 0;
    charObj.force.y = 0;
  }
  if (pressedKey === 'e') {
    boxsize += 10;
    console.log("changed boxsize to "+boxsize)
  }
  if (pressedKey === 'q') {
    boxsize -= 10;
    if (boxsize < 0) {
    boxsize = 10;
    }
    console.log("changed boxsize to "+boxsize)
  }
  if (pressedKey === ' ') {
    event.preventDefault();
  }
});
targetElement.addEventListener('keyup', (event) => {
  // The 'event' object contains information about the key press
  const pressedKey = event.key;
  //console.log(`Key pressed: ${pressedKey}`);

  if (pressedKey === 'a') {
    //charObj.force.x -= plrspeed;
    if (moveDirX === -1) {
        moveDirX = 0
    }
  }
  if (pressedKey === 'd') {
    //charObj.force.x += plrspeed;
    if (moveDirX === 1) {
        moveDirX = 0
    }
  }
  if (pressedKey === 'w') {
    if (holdingSpace == false) {
        holdingSpace = true
    }
    //charObj.force.y -= jumpforce;
  }

  
  if (pressedKey === ' ') {
    event.preventDefault();
  }
});


while (true) {
    charObj.force.x = moveDirX * plrspeed;
}
