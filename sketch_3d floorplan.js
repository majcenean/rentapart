/*************************************************************************
  3D Room
          by Maj Jenkins

    Overview:
    

    ---------------------------------------------------------------------
    Notes: 
     (1) 
**************************************************************************/

/*************************************************************************
// Global variables
**************************************************************************/

//////////////////// state variable
// Variable that is a function 
var drawFunction;
var stateNumber = 0;
var gTextOffset = 50;
var instruct = ["INSTRUCTIONS", "________", "USE [W][A][S][D] to navigate", "Press [Q] for debug mode", "Press [F] for fullscreen", "________", "CLICK ANYWHERE TO CONTINUE"]

//////////////////// scene setup variable
// DebugMode
var gDebugMode = false;

// Trapezoid
  var x1;
  var x2;
  var y;
  var quadx1;
  var quady1;
  var quadx2;
  var quady2;
  var quadx3;
  var quady3;
  var quadx4;
  var quady4;
  var boxH;
  var offsetx1;
  var offsetx2;
  var upperQuadXCoords;
  var lowerQuadXCoords;
  var quadYCoords;






//////////////////// p5 play variables

// Scene
var SCENE_W;
var SCENE_H;

// Background texture sprite
var bg;

// Main Sprite
var mainsprite;
var mainspriteW = 50;
var mainspriteH = 90;

// Main Sprite Controls
var speedleftup = 0;
var speedrightdown = 0;
var facing = 1;
var isidle = 0;
var stamina = 200;


/*************************************************************************
// Window resize
**************************************************************************/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*************************************************************************
// Function setup
**************************************************************************/
function setup() {
  // create the canvas
  createCanvas(windowWidth, windowHeight);

  // specifications
  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

  //////////////////// p5 play setup
  SCENE_W = windowWidth/4;
  SCENE_H = windowHeight/9;

  bg = new Group();
  mainsprite = createSprite(SCENE_W/2, SCENE_H/2, mainspriteW, mainspriteH);

  // // background texture
  // for (var i = 0; i < 25; i++) {
  //   var scuffs = createSprite(random(100, SCENE_W - 100), random(100, SCENE_H - 100));
  //   scuffs.addAnimation('usual', 'assets/img/bg_texture/scuff.png');
  //   bg.add(scuffs);
  // }

  // mainsprite
  var mainspriteMove = mainsprite.addAnimation('idle',
    'assets/img/mainsprite/1.png', 'assets/img/mainsprite/3.png');

  mainsprite.addAnimation('moving', 'assets/img/mainsprite/1.png', 'assets/img/mainsprite/2.png');



  //////////////////// state setup
  drawFunction = drawSplash;
}


/*************************************************************************
// Function draw
**************************************************************************/
function draw() {
  background('#8A7B67');
  frameRate(46.5);

//////////////////// state functions
    // Call the state machine function (a variable)
    drawFunction();

//////////////////// scene draw functions


//////////////////// debug mode

    // Toggle debug Mode
  if( gDebugMode == true ) {
    drawDebugInfo();
  }

    push();
  fill(255);
  noStroke();
  textSize(20);
  text('Press [Q] for debug mode', 10, 20);
  pop();
}



/*************************************************************************
// State functions
**************************************************************************/
//-- drawSplash() will draw the image at index 5 from the array
drawSplash = function() {
  background(200);
  textSize(width/30);
  textAlign(CENTER);
  text("CLICK ANYWHERE TO START", width/2, 3*(height/4));
}

// Instructions state
drawInstructions = function() {
  background(250);
  // starting i at 0, as long as i is less than 9, add one to i
  // draw text calling from the instruct array, using the variable i to determine number in the array
  for (i=0; i < 9; i++) {
    push();
    textSize(30);
    fill(30);
    text(instruct[i], width/2, height/3.5+(i*gTextOffset));
    pop();
  }
}

drawFloor1 = function () {
    background(50);
    //////////////////// scene setup functions
    drawBackgroundBox();
    
    perspectiveArrays();
    
    drawMainBath();

    //////////////////// p5 play functions

    //set the camera position to the mainsprite position
    // camera.position.x = mainsprite.position.x;
    // camera.position.y = mainsprite.position.y;

    // draw the background sprites;
    // drawSprites(bg);

    // draw the main sprite;
    drawMainSprite();
    drawSprites();

    // needs to be at bottom to be drawn last
    drawForegroundBox();
}



function mousePressed() {
  // If the splash or instruction states are up, a mouse click moves it along linearly
  if (drawFunction === drawSplash) {
      drawFunction = drawInstructions;
  }
    else if (drawFunction === drawInstructions) {
        drawFunction = drawFloor1;
    }
}


/*************************************************************************
// Scene draw functions
**************************************************************************/
// The first part of drawing the box, will always be on bottom.
function drawBackgroundBox() {
  noFill();
  stroke(255);
  strokeWeight(3);
  
    //////////////// declaring trapezoid values///////////////////////////
  //   Number variables to draw the trapezoid
  x1 = 6;    // Larger number = longer upper line
  x2 = 9;    // Larger number = longer lower line
  y  = 2.7;    // Smaller number = skinnier trapezoid

  //   Trapezoid variables
  quadx1 = (x1-1)*width/x1;
  quady1 = height/y;
  quadx2 = width/x1;
  quady2 = height/y;
  quadx3 = width/x2;
  quady3 = (y-1)*height/y;
  quadx4 = (x2-1)*width/x2;
  quady4 = (y-1)*height/y;

  //   Height of the room
  boxH = height/5;

  //   Offsets to make it more angled
  offsetx1 = 50;
  offsetx2 = offsetx1*2;
  ////////////////////////////////////////////////////////////
  
  //   Bottom trapezoid
  push();    // Push-pop for translate to not affect the whole sketch
  translate(0, boxH);
  fill('#B69271');
  quad(quadx1, quady1, quadx2, quady2, quadx3, quady3, quadx4, quady4);
  pop();
}

// The second part of drawing the box, will always be on top.
function drawForegroundBox() {
  
  push();    // Push-pop for translate to not affect the whole sketch
  translate(0, boxH);
//   Formula for drawing lines: (x, y, x, y + boxH)
  //   Draw right upper line
  line(quadx1, quady1, quadx1+offsetx1, quady1-boxH);
  //   Draw left upper line
  line(quadx2, quady2, quadx2-offsetx1, quady2-boxH);
  //   Draw left lower line
  line(quadx3, quady3, quadx3-50, quady3-boxH);
  //   Draw right lower line
  line(quadx4, quady4, quadx4+50, quady4-boxH);
  pop();
  
  //   Top trapezoid
  quad(quadx1+offsetx1, quady1, quadx2-offsetx1, quady2, quadx3-50, quady3, quadx4+50, quady4);
}

function drawMeasure() {
//   Ruler for X-axis
  let measureLength = 10;
  let measureNumber = 0;
  
  push();
  translate(0, boxH + measureLength*3);
    for (let i = quadx3; i <= quadx4 + 2; i += (quadx4-quadx3)/23) {
      line(i, quady4, i, quady4 - measureLength);
      push();
      noStroke();
      fill(255);
      textAlign(CENTER);
      textSize(20);
      text(measureNumber, i, quady4 + measureLength*3);
      pop();
      measureNumber = measureNumber + 3;
    }
  pop();
  
//   Ruler for Y-axis
  let measureNumberY = 0;
  let measureLengthY = 10;
  
  push();
  translate(0, boxH);
    for (let i = quady2; i <= quady3 + 2; i += (quady3-quady2)/9) {
      line(quadx3 - measureLengthY, i, quadx3 - measureLengthY*2, i);
      push();
      noStroke();
      fill(255);
      textAlign(CENTER);
      textSize(20);
      text(measureNumberY, quadx3 - measureLengthY*4, i);
      pop();
      measureNumberY = measureNumberY + 3;
    }
  
  pop();
}

function perspectiveArrays() {
//   Arrays of values
  let upperQX = ((quadx1-quadx2)/10);
  upperQuadXCoords = [upperQX, upperQX*2, upperQX*3, upperQX*4, upperQX*5, upperQX*6, upperQX*7, upperQX*8, upperQX*9, upperQX*10, upperQX*11, upperQX*12]
  
  let lowerQX = ((quadx4-quadx3)/10);
  lowerQuadXCoords = [lowerQX, lowerQX*2, lowerQX*3, lowerQX*4, lowerQX*5, lowerQX*6, lowerQX*7, lowerQX*8, lowerQX*9, lowerQX*10, lowerQX*11, lowerQX*12]
  
  let QY = ((quady3-quady2)/9);
  quadYCoords = [quady2, quady2 + QY, quady2 + QY*2, quady2 + QY*3, quady2 + QY*4, quady2 + QY*5, quady2 + QY*6, quady2 + QY*7, quady2 + QY*8, quady2 + QY*9, quady2 + QY*10]
}

function drawPerspective () {
  //   Y-lines
  push();
  translate(0, boxH);
  line(quadx3, quadYCoords[0], quadx4, quadYCoords[0]);
  line(quadx3, quadYCoords[1], quadx4, quadYCoords[1]);
  line(quadx3, quadYCoords[2], quadx4, quadYCoords[2]);
  line(quadx3, quadYCoords[3], quadx4, quadYCoords[3]);
  line(quadx3, quadYCoords[4], quadx4, quadYCoords[4]);
  line(quadx3, quadYCoords[5], quadx4, quadYCoords[5]);
  line(quadx3, quadYCoords[6], quadx4, quadYCoords[6]);
  line(quadx3, quadYCoords[7], quadx4, quadYCoords[7]);
  line(quadx3, quadYCoords[8], quadx4, quadYCoords[8]);
  line(quadx3, quadYCoords[9], quadx4, quadYCoords[9]);
  pop();
  
  push();    // translate push
  translate(0, boxH);
  
//   X-Lines drawn with these values
  push();
  translate(((quadx1-quadx2)/10)/2, 0);
//   Line 1
  line(lowerQuadXCoords[0], quady4, upperQuadXCoords[1], quady1);
//   Line 2
  line(lowerQuadXCoords[1], quady4, upperQuadXCoords[2], quady1);
//   Line 3
  line(lowerQuadXCoords[2], quady4, upperQuadXCoords[3], quady1);
//   Line 4
  line(lowerQuadXCoords[3], quady4, upperQuadXCoords[4], quady1);
//   Line 5
  line(lowerQuadXCoords[4], quady4, upperQuadXCoords[5], quady1);
//   Line 6
  line(lowerQuadXCoords[5], quady4, upperQuadXCoords[6], quady1);
//   Line 7
  line(lowerQuadXCoords[6], quady4, upperQuadXCoords[7], quady1);
//   Line 8
  line(lowerQuadXCoords[7], quady4, upperQuadXCoords[8], quady1);
//   Line 9
  line(lowerQuadXCoords[8], quady4, upperQuadXCoords[9], quady1);
//   Line 10
  line(lowerQuadXCoords[9], quady4, upperQuadXCoords[10], quady1);
//   Line 11
  line(lowerQuadXCoords[10], quady4, upperQuadXCoords[11], quady1);
  pop();
  
//   Red circles for points
  for (let i = quadx3; i <= quadx4 + 2; i += (quadx4-quadx3)/20) {
    push();
    fill('red');
    noStroke();
    ellipse(i, quady4, 10);
    pop();
  }
  
  for (let i = quadx2; i <= quadx1 + 2; i += (quadx1-quadx2)/20) {
    push();
    fill('red');
    noStroke();
    ellipse(i, quady2, 10);
    pop();
  }
  
//   "half-line" ( "half-works", too)
  push();
  translate(((quadx1-quadx2)/10)/2, 0);
  stroke('blue');
  line(lowerQuadXCoords[3] + lowerQuadXCoords[3]/35, quady4 - boxH/2, upperQuadXCoords[4], quady1);
  pop();
  
  pop();    //translate pop
}

function drawMainBath() {
  push();    // translate push
  translate(0, boxH);
  
//   dots to think out the coordinates to draw the bathroom from
  push();
//   floor quad
  fill(30);
  stroke(30);
  beginShape();
    vertex(upperQuadXCoords[10], quady2);
    vertex(upperQuadXCoords[8], quady2);
    vertex(upperQuadXCoords[8] + upperQuadXCoords[8]/60, quadYCoords[4]);
    vertex(upperQuadXCoords[10] + upperQuadXCoords[10]/40, quadYCoords[4]);
  endShape(CLOSE);

  // push();
  //   rectMode(CORNER);
  //   bathroom = createSprite(upperQuadXCoords[8], quady2);
  //   bathroom.setCollider('rectangle', 0, 0, upperQuadXCoords[1], quadYCoords[0]);

  //   mainsprite.collide(bathroom);
  //   bathroom.debug = mouseIsPressed;
  // pop();

//   wall lines
//   two upper lines
  push();
  translate(-upperQuadXCoords[0] - upperQuadXCoords[0]/2,0);
  line(quadx1, quady1, quadx1+offsetx1/1.5, quady1-boxH);
  pop();
  
  push();
  translate(upperQuadXCoords[5] + upperQuadXCoords[0]/2,0);
  line(quadx2, quady2, quadx2+offsetx1/8, quady2-boxH);
  pop();
  
//   two bottom lines
  push();
  // translate(upperQuadXCoords[5] + upperQuadXCoords[0]/2, quadYCoords[0]);
  line(upperQuadXCoords[8] + upperQuadXCoords[8]/60, quadYCoords[4], upperQuadXCoords[8] + upperQuadXCoords[8]/35, quadYCoords[4] - boxH);
  line(upperQuadXCoords[10] + upperQuadXCoords[10]/40, quadYCoords[4], upperQuadXCoords[10] + upperQuadXCoords[10]/20, quadYCoords[4] - boxH);
  pop();
  
//   upper quad
  noFill();
  beginShape();
    vertex(upperQuadXCoords[10] + upperQuadXCoords[10]/20, quadYCoords[4] - boxH);
    vertex(upperQuadXCoords[8] + upperQuadXCoords[8]/35, quadYCoords[4] - boxH);
    vertex(quadx2+offsetx1/8 + upperQuadXCoords[5] + upperQuadXCoords[0]/2, quady2-boxH);
    vertex(quadx1+offsetx1/1.5 -upperQuadXCoords[0] - upperQuadXCoords[0]/2, quady1-boxH);
  endShape(CLOSE);
  
  pop();
  pop();    //translate pop
}







/*************************************************************************
// Fullscreen and debug functions
**************************************************************************/

// // Get coordinates from click (disable background to use)
// function mouseClicked() {
//     print(mouseX, mouseY);
//     fill(205);
//     ellipseMode(CENTER);
//     ellipse(mouseX, mouseY, 5, 5);
// }

// Debug mode
function drawDebugInfo() {
  // draw text with mouse x/y coords
  push();
    fill(255);
    noStroke();
    textSize(20);
    text("X: " + mouseX + "   Y: " + mouseY, 10, 50);
  pop();

  // draw perspective
  drawMeasure();
  drawPerspective();

    // allow player to zoom in and out with click
  zoomInOut();
}

// keyTyped for debugMode and fullscreen
function keyTyped() {
  if (key === 'q') {
    gDebugMode = !gDebugMode;
  }
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
 }


/*************************************************************************
// p5 play functions
**************************************************************************/
function drawHouse() {
    // the house background
  push();
  rectMode(CORNER);
  fill(200);
  noStroke();
  rect(0, 0, windowWidth, windowHeight * 3);
  pop();
}

function drawMainSprite() {
  //accelerate with shift
  if ((keyIsDown(16)) && (stamina >= 0)) {
    speedleftup -= 0.2;
    speedrightdown += 0.2;
    stamina -= 2.5;
  } else {
    speedleftup = 0;
    speedrightdown = 0;
    stamina += 2;
  }
  //keep stamina within 0 to 200 points
  if (stamina >= 200) {
    stamina = 200;
  }
  if (stamina <= 0) {
    stamina = 0;
  }
  //if stamina runs out, cannot run anymore
  if (stamina == 0) {
    mainsprite.velocity.x = -4;
    mainsprite.velocity.y = -4;
    speedleftup = 0;
    speedrightdown = 0;
  }

  //control mainsprite with WASD
  //left with A
  if (keyIsDown(65)) {
    mainsprite.changeAnimation('moving');
    mainsprite.mirrorX(-1);
    mainsprite.velocity.x = -4 + speedleftup;
    facing = -1;
    isidle = 1;
  }
  //right with D
  else if (keyIsDown(68)) {
    mainsprite.changeAnimation('moving');
    mainsprite.mirrorX(1);
    mainsprite.velocity.x = 4 + speedrightdown;
    facing = 1;
    isidle = 1;
  }
  //down with S
  else if (keyIsDown(83)) {
    mainsprite.changeAnimation('moving');
    mainsprite.velocity.y = 4 + speedrightdown;
    isidle = 1;
  }
  //up with W
  else if (keyIsDown(87)) {
    mainsprite.changeAnimation('moving');
    mainsprite.velocity.y = -4 + speedleftup;
    isidle = 1;
  } else {
    mainsprite.changeAnimation('idle');
    mainsprite.velocity.x = 0;
    mainsprite.velocity.y = 0;
    isidle = 0;
  }

  //trapping the main sprite inside the housebox
 if (mainsprite.position.x < quadx3-50 + mainspriteW/2)
    mainsprite.position.x = quadx3-50 + mainspriteW/2;
  if (mainsprite.position.y < quady2 + mainspriteH*2)
    mainsprite.position.y = quady2 + mainspriteH*2;
  if (mainsprite.position.x > quadx4+50 - mainspriteW/2)
    mainsprite.position.x = quadx4+50 - mainspriteW/2;
  if (mainsprite.position.y > quady4+boxH - mainspriteH/2)
    mainsprite.position.y = quady4+boxH - mainspriteH/2;

  //shadow underneath the main sprite
  push();
  noStroke();
  fill(25, 25, 25, 70);
  ellipse(mainsprite.position.x, mainsprite.position.y + mainspriteH/2, mainspriteW+mainspriteW/3, mainspriteH/6);
  pop();

  // draw the mainsprite
  // drawSprite(mainsprite);

  // if the shift key is down OR stamina is less than 180 pts; then draw the stamina bar above head of mainsprite
  if ((keyIsDown(16)) || (stamina <= 180)) {
    // draw the stamina bar
    drawStamina();
  }

}

function drawStamina() {
  push();
  rectMode(CORNER);
  noStroke();
  fill(100);
 rect(mainsprite.position.x - mainspriteW/1.5, mainsprite.position.y - mainspriteH, 210/3, 15);
  fill('lightgreen');
  rect(mainsprite.position.x + 15/4 - mainspriteW/1.5, mainsprite.position.y + 15/4 - mainspriteH, stamina/3, 7.5);
  pop();
}

function zoomInOut() {
  if (mouseIsPressed)
    camera.zoom = 0.5;
  else
    camera.zoom = 0.9;
}