/*************************************************************************
  Rent Apart
      by Maj Jenkins
      Dec. 7, 2021

    Overview:
    

    ---------------------------------------------------------------------
    Notes: 
**************************************************************************/

/*************************************************************************
// Global variables
**************************************************************************/


// Colors
var palette_tan = '#875E17';
var palette_white = '#D3D0BA';
var palette_cream = '#B5AC91';
var palette_grey = '#77716A';
var palette_black = '#090B0C';


//////////////////// state variable
// Variable that is a function 
var drawFunction;
var stateNumber = 0;
var gTextOffset = 50;
var instruct = ["INSTRUCTIONS", "________", "USE [W][A][S][D] to navigate", "Press [Q] for debug mode", "Press [F] for fullscreen", "________", "CLICK ANYWHERE TO CONTINUE"]

//////////////////// scene setup variable
// DebugMode
var gDebugMode = false;


// Room Background Rectangle
var rectPosX;
var rectPosY;
var rectW;
var rectH;
var rectLeft;
var rectRight;
var rectUp;
var rectDown;
var rIncrX;
var rIncrY;
var rCoordsX;
var rCoordsY;


//////////////////// p5 play variables

// Scene
var SCENE_W;
var SCENE_H;

// Background texture sprite
var money;

// Main Sprite
var mainsprite;
var mainspriteW = 55;
var mainspriteH = 100;

var sizeFactor = 20/2;
// 100 px / 5ft = 20 px = 1 ft

// Main Sprite Controls
var speedleftup = 0;
var speedrightdown = 0;
var facing = 1;
var isidle = 0;
var stamina = 200;



//////////////////// reset rectangle room width and height
var roomSize = 600;
var roomSizeX;
var roomSizeY;



//////////////////// read CSV of housing data
var roomData;
var roomDataRows;
var address = [];
var moneyText = [];
var moneyNum = [];
var bedNum = [];
var bathNum = [];
var sqFt = [];
var placeImg = [];

var indexVariable;

var rentButton;



//////////////////// timer
var fireTimer;
var fireTimerTime = 10000;
var waitForClick = true;
var fireTimerX = 100;
var fireTimerY = 600;

var fireBarWidth;
var fireBarHeight = 20;
var hMargin = 40;
var vMargin = 100;

var showTimerDebug = false;



//////////////////// playerBudget
var playerBudget = 1000;
var playerBudgetTxt;

/*************************************************************************
// Function preload
**************************************************************************/
function preload() {

  roomData = loadTable("assets/trulia.csv", "csv", "header");
}


/*************************************************************************
// Window resize
**************************************************************************/
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

/*************************************************************************
// Function setup
**************************************************************************/
function setup() {
  // create the canvas
  createCanvas(1366, 768);

  // specifications
  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  textSize(width/25);
  textAlign(CENTER);




  //////////////////// p5 play setup
  rectPosX = width/3;
  rectPosY = height/2;
  SCENE_W = rectPosX;
  SCENE_H = rectPosY;


  // mainsprite
  mainsprite = createSprite(SCENE_W, SCENE_H, mainspriteW, mainspriteH);

  var mainspriteMove = 
  mainsprite.addAnimation('idle',
    'assets/img/mainsprite/1.png', 'assets/img/mainsprite/3.png');
  mainsprite.addAnimation('moving', 'assets/img/mainsprite/1.png', 'assets/img/mainsprite/2.png');



  // background money
  money = new Group();

  // for (var i = 0; i < 10; i++) {
  //   // Test positioning using 100 instead of a variable
  //   // var bills = createSprite(random(SCENE_W-100,SCENE_W+100), random(SCENE_H-100,SCENE_H+100));
    
  //   // var bills = createSprite(random(SCENE_W-roomSizeX,SCENE_W+roomSizeX), random(SCENE_H-roomSizeY,SCENE_H+roomSizeY));
  //   // money.add(bills);
  //   // Commented out because what if we called it somewhere else?

  //   bills.addAnimation('usual', 'assets/img/money.png');
  // }





  //////////////////// state setup
  // drawFunction = drawSplash;
  drawFunction = drawRoom;




  //////////////////// data setup
  roomDataRows = roomData.getRowCount() - 1;
  print('there are this many rows:' + roomDataRows);

  address = roomData.getColumn("address");
  moneyText = roomData.getColumn("moneyText");
  moneyNum = roomData.getColumn("moneyNum");
  bedNum = roomData.getColumn("bedNum");
  bathNum = roomData.getColumn("bathNum");
  sqFt = roomData.getColumn("sqFt");
  placeImg = roomData.getColumn("placeImg");




  //////////////////// clickables setup
  drawButton();


  //////////////////// timer setup
  fireTimer = new Timer(int(fireTimerTime));
  fireBarWidth = width-(hMargin*2);
  fireTimer.pause();
}


/*************************************************************************
// Function draw
**************************************************************************/
function draw() {
  background(palette_black);
  frameRate(46.5);

//////////////////// state functions
  // Call the state machine function (a variable)
  drawFunction();

//////////////////// debug mode
  // Toggle Debug Mode
  if( gDebugMode == true ) {
    drawDebugInfo();
  }
  // Debug mode message
  push();
  fill(255);
  noStroke();
  textSize(20);
  textAlign(LEFT);
  text('Press [Q] for debug mode', 10, 20);
  pop();

  // Toggle Timer Debug Mode
  if( showTimerDebug == true ) {
    drawTimerText();
  }
}



/*************************************************************************
// States
**************************************************************************/
drawSplash = function() {
  background(200);
  textSize(width/30);
  textAlign(CENTER);
  text("CLICK ANYWHERE TO START", width/2, 3*(height/4));
}

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

drawRoom = function () {
    background(50);
    //////////////////// scene setup functions
    roomSizeX = sqrt(roomSize)*sizeFactor;
    roomSizeY = sqrt(roomSize)*sizeFactor;

    push();
    rectMode(CORNER);
    rentButton.draw();
    pop();

    drawBackgroundBox();
    drawRentPrice();
    drawPlayerBudget();

    drawProgressBar();

    
    //////////////////// p5 play functions

    //set the camera position to the mainsprite position
    // camera.position.x = mainsprite.position.x;
    // camera.position.y = mainsprite.position.y;

    // draw the background sprites;
    drawSprites(money);

    // draw the main sprite;
    // drawSprites();
    drawMainSprite();

    // needs to be at bottom to be drawn last
    // drawForegroundBox();


    eatMoney();
}



function mousePressed() {
  // If the splash or instruction states are up, a mouse click moves it along linearly
  if (drawFunction === drawSplash) {
      drawFunction = drawInstructions;
  }
    else if (drawFunction === drawInstructions) {
        drawFunction = drawRoom;
    }
}


/*************************************************************************
// Scene draw functions
**************************************************************************/
function drawBackgroundBox() {
// This is the apartment size that the player can walk around in.
  noFill();
  stroke(255);
  strokeWeight(3);
  
  // Rectangle room
  // Positioning the rectangle within the screen
  // rectPosX = width/3;
  // rectPosY = height/2;
  // Commented out because we are now calling it in setup

  // Width and height of the room
  rectW = roomSizeX;
  rectH = roomSizeY;

  // Barriers of the room for sprite movement
  rectLeft = rectPosX - rectW/2;
  rectRight = rectPosX + rectW/2;
  rectUp = rectPosY - rectH/2;
  rectDown = rectPosY + rectH/2;

  fill(palette_tan);

  // Background box
  rectMode(CENTER);
  rect(rectPosX, rectPosY, rectW, rectH);

  // To draw increments of it
  rIncrX = rectW/10;
  rIncrY = rectH/10;

  rCoordsX = [rIncrX*2, rIncrX*3, rIncrX*4, rIncrX*5, rIncrX*6, rIncrX*7, rIncrX*8, rIncrX*9, rIncrX*10, rIncrX*11, rIncrX*12, rIncrX*13, rIncrX*14, rIncrX*15, rIncrX*16, rIncrX*17, rIncrX*18, rIncrX*19, rIncrX*20, rIncrX*21, rIncrX*22, rIncrX*23, rIncrX*24];
  rCoordsY = [rectUp, rIncrY + rectUp, rIncrY*2 + rectUp, rIncrY*3 + rectUp, rIncrY*4 + rectUp, rIncrY*5 + rectUp, rIncrY*6 + rectUp, rIncrY*7 + rectUp, rIncrY*8 + rectUp, rIncrY*9 + rectUp, rIncrY*10 + rectUp];
}


/*************************************************************************
// Clickables
**************************************************************************/

function drawButton() {
// This rentButton is what allows the player to choose a new home.
  rentButton = new Clickable();

  push();
  rentButton.text = 'rent anew';
  rentButton.color = '#659ffc';
  rentButton.stroke = '#00000000';
  rentButton.width = 200;
  rentButton.height = 100;
  rentButton.locate(2*(width/3) - rentButton.width/2, height/2 - rentButton.height/2);
  rentButton.textSize = 36; 
  // rentButton.textScaled = true; 
  // rentButton.updateTextSize();
  pop();

  rentButton.onPress = rentButtonPressed;
  rentButton.onHover = rentButtonHover;
  rentButton.onOutside = rentButtonOutside;
}

rentButtonPressed = function () {
    // print('you pressed me');
    rentButton.color = '#ff7866';
    indexVariable = round(random(0, roomDataRows));
    roomSize = sqFt[indexVariable];


    addFireTime();

    drawMoney();

    // Starts the timer upon click
    if( fireTimer.paused === true ) {
        fireTimer.start();
      } 
}

function drawRentPrice() {
  push();
  noStroke();
  fill(palette_white);
  text(moneyText[indexVariable], width/3, (3*(height/4)));
  pop();
}

function drawPlayerBudget() {
  push();
  noStroke();
  fill(palette_white);
  text('$'+playerBudget, width/3, (3*(height/4))+100);
  pop();
}

function addFireTime() {
  if( fireTimer.expired() === false ) {
      if( fireTimerTime < int(round(fireTimer.getRemainingTime())) + int(sqFt[indexVariable]) ) {
        // if the fire timer's maximum time is less than the remaining time + the sqft
        // then reset the timer (because the number would be too big);
        fireTimer.reset();
        checkTime();
        // fireTimer.setTimer(fireTimerTime);

        // print('the remaining time is:' + round(fireTimer.getRemainingTime()));
        // print('the sqft is:' + int(sqFt[indexVariable]))
        // print('the new time is:' + int(int(round(fireTimer.getRemainingTime())) + int(sqFt[indexVariable])));
      } 
      else if ( fireTimerTime > int(round(fireTimer.getRemainingTime())) + int(sqFt[indexVariable]) ){
        // if the sqft + remaining time would fit within the max time in the timer, then do that
        fireTimer.addTime(int(sqFt[indexVariable]));
      }
    }
}

// this basically makes sure it doesnt go over the maximum amount of time
// this function should be called after function addFireTime
function checkTime() {
  if ( int(round(fireTimer.getRemainingTime())) > fireTimerTime ){
        // if the sqft + remaining time would fit within the max time in the timer, then do that
        fireTimer.setTimer(fireTimerTime);
      }
}

rentButtonHover = function () {
   rentButton.color = '#ffc0b8';
}

rentButtonOutside = function () {
   rentButton.color = '#659ffc';
}


/*************************************************************************
// Timer
**************************************************************************/
// This first timer (fireTimer) times how long the player has to run around and collect money.

function drawTimerText() {
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT);
    text( "remaining (%) = " + round(fireTimer.getPercentageRemaining()*100) + "%", hMargin, 150 );
    text( "elapsed (%) = " + round(fireTimer.getPercentageElapsed()*100) + "%", hMargin, 200 );
    text( "remaining (ms) = " + round(fireTimer.getRemainingTime()), hMargin, 240 );
}



function drawProgressBar() {
  // Draw a growing rectangle, from left to right
  push();
  noStroke();
  fill(palette_cream);
  rectMode(CORNER);
  rect( hMargin, vMargin + fireBarHeight, fireBarWidth - fireBarWidth*fireTimer.getPercentageElapsed(), fireBarHeight );
  pop();

  // draw an outline on top of the rect
  push();
  noFill();
  stroke(50);
  stroke(palette_white);
  rectMode(CORNER);
  strokeWeight(1);
  rect( hMargin, vMargin + fireBarHeight, fireBarWidth, fireBarHeight );
  pop();
}




/*************************************************************************
// Money Sprites
**************************************************************************/

function drawMoney() {
  for (var i = 0; i < 10; i++) {
    // Test positioning using 100 instead of a variable
    // var bills = createSprite(random(SCENE_W-100,SCENE_W+100), random(SCENE_H-100,SCENE_H+100));
    
    var moneyBoundX = (roomSizeX/2) - 10;
    var moneyBoundY = (roomSizeY/2) - 10;

    var bills = createSprite(random(SCENE_W-moneyBoundX,SCENE_W+moneyBoundX), random(SCENE_H-moneyBoundY,SCENE_H+moneyBoundY));
    money.add(bills);

    bills.addAnimation('usual', 'assets/img/money.png');

    // set lifespan in ms
    bills.life = 100;
  }
}

function eatMoney() {
  mainsprite.overlap(money, collectMoney);
}

function collectMoney(collector, collected) {
  collected.remove();

  let moneyValue = 60;

  playerBudget = playerBudget + moneyValue;
}







/*************************************************************************
// Debug and interaction functions
**************************************************************************/

function drawMeasure() {
//   Ruler for X-axis
  let measureLengthX = 10;
  let measureNumberX = 0;
  
    for (let i = rectLeft; i <= rectRight + 2; i += rectW/10) {
      line(i, rectDown, i, rectDown - measureLengthX);
      push();
      noStroke();
      fill(255);
      textAlign(CENTER);
      textSize(20);
      text(measureNumberX, i, rectDown + measureLengthX*3);
      pop();
      measureNumberX++;
    }

//   Ruler for Y-axis
  let measureNumberY = 0;
  let measureLengthY = 10;
  
    for (let i = rectUp; i <= rectDown + 2; i += rectH/10) {
      line(rectLeft, i, rectLeft - measureLengthY*2, i);
      push();
      noStroke();
      fill(255);
      textAlign(RIGHT);
      textSize(20);
      text(measureNumberY, rectLeft - measureLengthY*3, i);
      pop();
      measureNumberY++;
    }
}

// Debug mode
function drawDebugInfo() {
  // draw text with mouse x/y coords
  push();
    fill(255);
    noStroke();
    textSize(20);
    textAlign(LEFT);
    text("X: " + mouseX + "   Y: " + mouseY, 10, 50);
  pop();

  // Points of background rectangle
  ellipseMode(CENTER);
  // Upper left
  ellipse(rectPosX - rectW/2, rectPosY - rectH/2, 10);
  // Upper right
  ellipse(rectPosX + rectW/2, rectPosY - rectH/2, 10);
  // Lower left
  ellipse(rectPosX - rectW/2, rectPosY + rectH/2, 10);
  // Lower right
  ellipse(rectPosX + rectW/2, rectPosY + rectH/2, 10);

  // Draw the rulers
  drawMeasure();

  // allow player to zoom in and out with click
  // zoomInOut();
}


// keyTyped for debugMode and fullscreen
function keyTyped() {
  if (key === 'q') {
    gDebugMode = !gDebugMode;
    showTimerDebug = !showTimerDebug;
  }
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
 }


/*************************************************************************
// p5 play functions
**************************************************************************/

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
 if (mainsprite.position.x < rectLeft + mainspriteW - mainspriteW/2)
    mainsprite.position.x = rectLeft + mainspriteW - mainspriteW/2;
  if (mainsprite.position.y < rectPosY - rectH/2 + mainspriteH*0.5)
    mainsprite.position.y = rectPosY - rectH/2 + mainspriteH*0.5;
  if (mainsprite.position.x > rectRight - mainspriteW + mainspriteW/2)
    mainsprite.position.x = rectRight - mainspriteW + mainspriteW/2;
  if (mainsprite.position.y > rectDown - mainspriteH/2)
    mainsprite.position.y = rectDown - mainspriteH/2;

  //shadow underneath the main sprite
  push();
  noStroke();
  fill(25, 25, 25, 70);
  ellipse(mainsprite.position.x, mainsprite.position.y + mainspriteH/2, mainspriteW+mainspriteW/3, mainspriteH/6);
  pop();

  // draw the mainsprite
  drawSprite(mainsprite);

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
  fill(palette_cream);
  rect(mainsprite.position.x + 15/4 - mainspriteW/1.5, mainsprite.position.y + 15/4 - mainspriteH, stamina/3, 7.5);
  pop();
}

function zoomInOut() {
  if (mouseIsPressed)
    camera.zoom = 0.5;
  else
    camera.zoom = 0.9;
}