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
var palette_grey = '#858F98';
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
var buttonMatrix_X;
var buttonMatrix_Y;

// Background texture sprite
var money;

// Main Sprite
var mainsprite;
var mainspriteW = 75;
var mainspriteH = 135;

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


var indexVariable1;
var indexVariable2;
var indexVariable3;
var randomIntegerArray = [];


// images
var rental1Img;
var rental2Img;
var rental3Img;
var rental4Img;
var rental5Img;
var rental6Img;
var rental7Img;
var rental8Img;
var rental9Img;
var rental10Img;
var rental11Img;
var rental12Img;
var rental13Img;
var rental14Img;
var rental15Img;
var rental16Img;
var rental17Img;
var rental18Img;
var rental19Img;
var rental20Img;
var rental21Img;
var rental22Img;
var rental23Img;

var rentalImgArray = [];


//////////////////// icons
var bathicon;
var bedicon;
var sqfticon;

var mainFont;


//////////////////// button matrix
var rentButton1;
var rentButton2;
var rentButton3;
var rentButtonStroke = '#00000000';
var rentButtonWidth = 200;
var rentButtonHeight = 133;
var rentButtonTextSize = 16; 
var rentButtonOffset = 210;


//////////////////// timer
var fireTimer;
var fireTimerTime = 150000;
var waitForClick = true;
var fireTimerX = 100;
var fireTimerY = 600;

var fireBarWidth;
var fireBarHeight = 20;
var hMargin = 50;
var vMargin = 30;

var showTimerDebug = false;



var moneyTimer;
var moneyTimerTime = 2000;

//////////////////// playerBudget
var playerBudget = 3000;
var playerBudgetTxt;

/*************************************************************************
// Function preload
**************************************************************************/
function preload() {
  roomData = loadTable("assets/trulia.csv", "csv", "header");

  // Rental Images
  rental1Img = loadImage("assets/places/946stockton.png");
  rental2Img = loadImage("assets/places/301mission.png");
  rental3Img = loadImage("assets/places/15harriet.png");
  rental4Img = loadImage("assets/places/53moss.png");
  rental5Img = loadImage("assets/places/651minna.png");
  rental6Img = loadImage("assets/places/2118greenwich.png");
  rental7Img = loadImage("assets/places/860geary.png");
  rental8Img = loadImage("assets/places/76page.png");
  rental9Img = loadImage("assets/places/14kent.png");
  rental10Img = loadImage("assets/places/3101castro.png");
  rental11Img = loadImage("assets/places/557frederick.png");
  rental12Img = loadImage("assets/places/49933rdave.png");
  rental13Img = loadImage("assets/places/1697newcomb.png");
  rental14Img = loadImage("assets/places/1242howard.png");
  rental15Img = loadImage("assets/places/34joice.png");
  rental16Img = loadImage("assets/places/2506folsom.png");
  rental17Img = loadImage("assets/places/2708bryant.png");
  rental18Img = loadImage("assets/places/60latona.png");
  rental19Img = loadImage("assets/places/120portola.png");
  rental20Img = loadImage("assets/places/12hill.png");
  rental21Img = loadImage("assets/places/920montgomery.png");
  rental22Img = loadImage("assets/places/880vallejo.png");
  rental23Img = loadImage("assets/places/225fell.png");

  bathicon = loadImage("assets/icons/BathIcon25.png");
  bedicon = loadImage("assets/icons/BedIcon25.png");
  sqfticon = loadImage("assets/icons/SquareFeetIcon25.png");

  mainFont = loadFont('assets/Cabin-Regular.otf');
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
  imageMode(CORNER);
  textSize(width/25);
  textAlign(CENTER);
  textFont(mainFont);




  //////////////////// p5 play setup
  rectPosX = 3*(width/4);
  rectPosY = height/2;
  SCENE_W = rectPosX;
  SCENE_H = rectPosY;
  buttonMatrix_X = 100;
  buttonMatrix_Y = 100;


  // mainsprite
  mainsprite = createSprite(SCENE_W, SCENE_H, mainspriteW, mainspriteH);

  var mainspriteMove = 
  mainsprite.addAnimation('idle',
    'assets/img/mainsprite/2.png', 'assets/img/mainsprite/2a.png');
  mainsprite.addAnimation('moving', 'assets/img/mainsprite/1.png', 'assets/img/mainsprite/2.png', 'assets/img/mainsprite/3.png', 'assets/img/mainsprite/2.png');



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

  rentalImgArray = [rental1Img, rental2Img, rental3Img, rental4Img, rental5Img, rental6Img, rental7Img, rental8Img, rental9Img, rental10Img, rental11Img, rental12Img, rental13Img, rental14Img, rental15Img, rental16Img, rental17Img, rental18Img, rental19Img, rental20Img, rental21Img, rental22Img, rental23Img];

  drawRandomIntegers();

  //////////////////// clickables setup
  drawButtonMatrix();


  //////////////////// timer setup
  fireTimer = new Timer(int(fireTimerTime));
  fireBarWidth = width-(hMargin*2);
  fireTimer.pause();


  moneyTimer = new Timer(int(moneyTimerTime));
  moneyTimer.pause();
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


  // if( fireTimer.expired === true ) {
  //       ;
  //     } 

//////////////////// debug mode
  // Toggle Debug Mode
  // if( gDebugMode == true ) {
  //   drawDebugInfo();
  // }
  // // Debug mode message
  // push();
  // fill(255);
  // noStroke();
  // textSize(20);
  // textAlign(LEFT);
  // text('Press [Q] for debug mode', 10, 20);
  // pop();

  // // Toggle Timer Debug Mode
  // if( showTimerDebug == true ) {
  //   drawTimerText();
  // }
}



/*************************************************************************
// States
**************************************************************************/
// drawSplash = function() {
//   background(200);
//   textSize(width/30);
//   textAlign(CENTER);
//   text("CLICK ANYWHERE TO START", width/2, 3*(height/4));
// }

// drawInstructions = function() {
//   background(250);
//   // starting i at 0, as long as i is less than 9, add one to i
//   // draw text calling from the instruct array, using the variable i to determine number in the array
//   for (i=0; i < 9; i++) {
//     push();
//     textSize(30);
//     fill(30);
//     text(instruct[i], width/2, height/3.5+(i*gTextOffset));
//     pop();
//   }
// }

drawRoom = function () {
    background('#ffffff');
    //////////////////// scene setup functions
    roomSizeX = sqrt(roomSize)*sizeFactor;
    roomSizeY = sqrt(roomSize)*sizeFactor;

    push();
    rectMode(CORNER);
    drawRentButtons();
    pop();

    drawBackgroundBox();
    // drawRentPrice();
    drawPlayerBudget();

    drawProgressBar();

    // drawRandomIntegers();
    drawRental();

    
    //////////////////// p5 play functions

    //set the camera position to the mainsprite position
    // camera.position.x = mainsprite.position.x;
    // camera.position.y = mainsprite.position.y;

    // draw the background sprites;
    drawSprites(money);
    drawMoreMoney();
    print(int(round(moneyTimer.getRemainingTime())));

    // draw the main sprite;
    // drawSprites();
    drawMainSprite();

    // needs to be at bottom to be drawn last
    // drawForegroundBox();


    eatMoney();
}


// function mousePressed() {
//   // If the splash or instruction states are up, a mouse click moves it along linearly
//   if (drawFunction === drawSplash) {
//       drawFunction = drawInstructions;
//   }
//     else if (drawFunction === drawInstructions) {
//         drawFunction = drawRoom;
//     }
// }


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

  fill(palette_grey);

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
// Random Integers
**************************************************************************/

function drawRandomIntegers() {
  var randomIntegerArray = [indexVariable1, indexVariable2, indexVariable3];

  indexVariable1 = round(random(0, roomDataRows));
  indexVariable2 = round(random(0, roomDataRows));
  indexVariable3 = round(random(0, roomDataRows));

  // print(randomIntegerArray[0]);

}


function drawRental() {
  // push();
  // imageMode(CORNER);
  // image(rentalImgArray[0], buttonMatrix_X, buttonMatrix_Y);
  // pop();

  drawRentalText(indexVariable1, 0);
  drawRentalText(indexVariable2, 225);
  drawRentalText(indexVariable3, 325+rentButton2.height);


  rentButton1.image = rentalImgArray[indexVariable1];
  rentButton2.image = rentalImgArray[indexVariable2];
  rentButton3.image = rentalImgArray[indexVariable3];
}

function drawRentalText(index, offsetY) {
  // Variables
  let rentalTextSize = 15;
  let rentalTextYOffset = 50;
  let rentalTextXOffset = 75;

  // Rental info
  push();
  textSize(rentalTextSize);
  textAlign(LEFT);
  fill(palette_black);
  noStroke();
  text(bedNum[index], buttonMatrix_X, buttonMatrix_Y + rentButtonHeight + rentalTextYOffset + offsetY);
  text(bathNum[index], buttonMatrix_X + rentalTextXOffset, buttonMatrix_Y + rentButtonHeight + rentalTextYOffset + offsetY);
  text(sqFt[index], buttonMatrix_X + rentalTextXOffset*2, buttonMatrix_Y + rentButtonHeight + rentalTextYOffset + offsetY);
  // text(address[indexVariable1], buttonMatrix_X - 45, buttonMatrix_Y + rentButtonHeight + rentalTextYOffset*1.5);

  // Price
  textSize(rentalTextSize*1.5);
  text(moneyText[index], buttonMatrix_X - 45, buttonMatrix_Y + rentButtonHeight + 10 + offsetY);
  pop();

  // Images
  push();
  imageMode(CENTER);
  image(bedicon, buttonMatrix_X - bedicon.width, buttonMatrix_Y + rentButtonHeight + rentalTextYOffset - 10 + offsetY);
  image(bathicon, buttonMatrix_X + rentalTextXOffset - bathicon.width, buttonMatrix_Y + rentButtonHeight + rentalTextYOffset - 10 + offsetY);
  image(sqfticon, buttonMatrix_X + rentalTextXOffset*2 - sqfticon.width, buttonMatrix_Y + rentButtonHeight + rentalTextYOffset - 10 + offsetY);
  pop();
}


/*************************************************************************
// Clickables
**************************************************************************/
function drawRentButtons() {
  rentButton1.draw();
  rentButton2.draw();
  rentButton3.draw();
}


function drawButtonMatrix() {
  drawRentButton1();
  drawRentButton2();
  drawRentButton3();
}

// function setRentButtons() {
//   // for (let rentIndex = 0; rentIndex <= rentButtonArray.length; rentIndex += 1) {
//   //   // print(rentIndex);
//   //   rentButtonArray[rentIndex].stroke = rentButtonStroke;
//   //   rentButtonArray[rentIndex].width = rentButtonWidth;
//   //   rentButtonArray[rentIndex].height = rentButtonHeight;
//   //   rentButtonArray[rentIndex].textSize = rentButtonTextSize; 
//   // }

//     rentButton1.stroke = rentButtonStroke;
//     rentButton1.width = rentButtonWidth;
//     rentButton1.height = rentButtonHeight;
//     rentButton1.textSize = rentButtonTextSize; 

//     rentButton2.stroke = rentButtonStroke;
//     rentButton2.width = rentButtonWidth;
//     rentButton2.height = rentButtonHeight;
//     rentButton2.textSize = rentButtonTextSize; 

//     rentButton3.stroke = rentButtonStroke;
//     rentButton3.width = rentButtonWidth;
//     rentButton3.height = rentButtonHeight;
//     rentButton3.textSize = rentButtonTextSize; 

// }



// Button 1
function drawRentButton1() {
  rentButton1 = new Clickable();

  // Draw the image
  push();
  rentButton1.image = rentalImgArray[indexVariable1];
  pop();

  // position
  rentButton1.locate(buttonMatrix_X - rentButton1.width/2, buttonMatrix_Y - rentButton1.height/2);
  
  // style
  rentButton1.text = ' ';
  rentButton1.color = palette_grey;
  rentButton1.stroke = rentButtonStroke;
  rentButton1.width = rentButtonWidth;
  rentButton1.height = rentButtonHeight;
  rentButton1.textSize = rentButtonTextSize; 

  // interaction
  rentButton1.onPress = rentButtonPressed1;
  rentButton1.onHover = rentButtonHover1;
  rentButton1.onOutside = rentButtonOutside1;
}

rentButtonPressed1 = function () {
  rentButton1.color = palette_tan;
  rentButton1.tint = true;
    // indexVariable1 = round(random(0, roomDataRows));
    // roomSize = sqFt[indexVariable1];


    if (moneyNum[indexVariable1] <= playerBudget) {

    addFireTime(indexVariable1);
    drawMoney();

    // Starts the timer upon click
    if( fireTimer.paused === true ) {
        fireTimer.start();
        moneyTimer.start();
      } 

    drawRandomIntegers();
    drawRental();

    playerBudget = playerBudget - moneyNum[indexVariable1];
    }
}

rentButtonHover1 = function () {
  rentButton1.color = palette_tan;
   rentButton1.tint = true;
}

rentButtonOutside1 = function () {
   rentButton1.noTint = true;
}



// Button 2
function drawRentButton2() {
  rentButton2 = new Clickable();

  // Draw the image
  push();
  rentButton2.image = rentalImgArray[indexVariable2];
  pop();

  // position
  rentButton2.locate(buttonMatrix_X - rentButton2.width/2, buttonMatrix_Y - rentButton2.height/2 + 225);
  
  // style
  rentButton2.text = ' ';
  rentButton2.color = palette_grey;
  rentButton2.stroke = rentButtonStroke;
  rentButton2.width = rentButtonWidth;
  rentButton2.height = rentButtonHeight;
  rentButton2.textSize = rentButtonTextSize; 

  // interaction
  rentButton2.onPress = rentButtonPressed2;
  rentButton2.onHover = rentButtonHover2;
  rentButton2.onOutside = rentButtonOutside2;
}

rentButtonPressed2 = function () {
  rentButton2.color = palette_tan;
    rentButton2.tint = true;
    // indexVariable1 = round(random(0, roomDataRows));
    // roomSize = sqFt[indexVariable1];

    if (moneyNum[indexVariable2] <= playerBudget) {

    addFireTime(indexVariable2);
    drawMoney();

    // Starts the timer upon click
    if( fireTimer.paused === true ) {
        fireTimer.start();
        moneyTimer.start();
      } 

    drawRandomIntegers();
    drawRental();

    playerBudget = playerBudget - moneyNum[indexVariable2];
  }
}

rentButtonHover2 = function () {
  rentButton2.color = palette_tan;
   rentButton2.tint = true;
}

rentButtonOutside2 = function () {
   rentButton2.noTint = true;
}



// Button 3
function drawRentButton3() {
  rentButton3 = new Clickable();

  // Draw the image
  push();
  rentButton3.image = rentalImgArray[indexVariable3];
  pop();

  // position
  rentButton3.locate(buttonMatrix_X - rentButton3.width/2, buttonMatrix_Y - rentButton3.height/2 + 325 + rentButton2.height);
  
  // style
  rentButton3.text = ' ';
  rentButton3.color = palette_grey;
  rentButton3.stroke = rentButtonStroke;
  rentButton3.width = rentButtonWidth;
  rentButton3.height = rentButtonHeight;
  rentButton3.textSize = rentButtonTextSize; 

  // interaction
  rentButton3.onPress = rentButtonPressed3;
  rentButton3.onHover = rentButtonHover3;
  rentButton3.onOutside = rentButtonOutside3;
}

rentButtonPressed3 = function () {
  rentButton3.color = palette_tan;
    rentButton3.tint = true;
    // indexVariable1 = round(random(0, roomDataRows));
    // roomSize = sqFt[indexVariable1];

    if (moneyNum[indexVariable3] <= playerBudget) {

    addFireTime(indexVariable3);
    drawMoney();

    // Starts the timer upon click
    if( fireTimer.paused === true ) {
        fireTimer.start();
        moneyTimer.start();
      } 

    drawRandomIntegers();
    drawRental();

    playerBudget = playerBudget - moneyNum[indexVariable3];
  }
}

rentButtonHover3 = function () {
  rentButton3.color = palette_tan;
   rentButton3.tint = true;
}

rentButtonOutside3 = function () {
   rentButton3.noTint = true;
}



/*************************************************************************
// UI Display
**************************************************************************/

function drawRentPrice() {
  push();
  noStroke();
  fill(palette_white);
  text(moneyText[indexVariable1], width/3, (3*(height/4)));
  pop();
}

function drawPlayerBudget() {
  push();
  textSize(20);
  
  fill(palette_white);
  text('your budget is:', rectPosX, (3*(height/4))+100 - 100);
  pop();

  push();
  noStroke();
  fill(palette_white);
  text('$'+playerBudget, rectPosX, (3*(height/4))+100);
  pop();
}


/*************************************************************************
// FireTimer
**************************************************************************/

function addFireTime(time) {
  if( fireTimer.expired() === false ) {
      if( fireTimerTime < int(round(fireTimer.getRemainingTime())) + int(sqFt[time]) ) {
        // if the fire timer's maximum time is less than the remaining time + the sqft
        // then reset the timer (because the number would be too big);
        fireTimer.reset();
        checkTime();
        // fireTimer.setTimer(fireTimerTime);

        // print('the remaining time is:' + round(fireTimer.getRemainingTime()));
        // print('the sqft is:' + int(sqFt[indexVariable]))
        // print('the new time is:' + int(int(round(fireTimer.getRemainingTime())) + int(sqFt[indexVariable])));
      } 
      else if ( fireTimerTime > int(round(fireTimer.getRemainingTime())) + int(sqFt[time]) ){
        // if the sqft + remaining time would fit within the max time in the timer, then do that
        fireTimer.addTime(int(sqFt[time]));
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

  let moneyValue = 100;

  playerBudget = playerBudget + moneyValue;
}



function drawMoreMoney() {
  if( moneyTimer.expired === true ) {
        moneyTimer.start();
        drawMoney();
      } 
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