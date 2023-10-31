// Get canvas and context
const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");

// DOM elements and game properties
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBoarder = "black";
const foodColor = "red";
const unitSize = 25;

// Game state variables
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

// Initial snake configuration
let snake = [ // snakes is an array of an object, which make up the body part
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 }, // object
  { x: unitSize, y: 0 },
  { x: 0, y: 0 }, // cordinate of top left corner
];

// Event listeners
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// Initialize the game
gameStart();

function gameStart(){
  // Set game to running and initialize game components
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
};

// Recursive function to control game loop
function nextTick(){ 
  // set a delay to the functions, else call checkGameOver
  if(running){ // setTimeout(function, delay, arg1, arg2, ...);
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75); // execute those function after 75 ms of delay
  }
  else{
    displayGameOver();
  }
};

// Clear the canvas
function clearBoard(){
  context.fillStyle = boardBackground; // fill the context with boardBackground colour
  context.fillRect(0, 0, gameWidth, gameHeight); // fill the context from top-left to bottom-right
};

// Create food at random coordinate
function createFood(){ 
  function randFood(min, max){// find a random coordinate to create a food item
    const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize; 
    return randNum
  }
  foodX = randFood(0, gameBoard.width - unitSize); // random X coordinate
  foodY = randFood(0, gameBoard.height - unitSize); // random Y coordinate
};

// Draw food base on createFood's coordinate
function drawFood(){ 
  context.fillStyle = foodColor; // set the colour of the food
  context.fillRect(foodX, foodY, unitSize, unitSize); // draw food item //.fillRect(X, Y, width, height)
};

// Move the snake
function moveSnake(){
  // create an new head of snake in the direction of moving and elimitane the tail
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity,
  };

  snake.unshift(head); // add new head infront of the old ones


  if (snake[0].x === foodX && snake[0].y === foodY) { // food is "eaten" if coordinate of 'head' and 'food' is overlap
    // If snake eats the food, increment the score and create new food
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    // If not, remove the tail
    snake.pop();
  }
};

// Draw the snake using snake object array
function drawSnake(){ 
  context.fillStyle = snakeColor;
  context.strokeStyle = snakeBoarder;
  snake.forEach(snakePart => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize); // context.fillRect(x, y, width, height);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize); // context.fillRect(x, y, width, height);
  });
};

// Change snake direction of the movement based on key input
function changeDirection(event) { 
  const keyPressed = event.keyCode; // access key by code number
  
  //keyCode number
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  // Boolean variable
  const goingUp = (yVelocity == -unitSize); 
  const goingDown = (yVelocity == unitSize);
  const goingLeft = (xVelocity == -unitSize);
  const goingRight = (xVelocity == unitSize);

  /* Switch syntax
  switch (expression) {
    case value1:
      // code block
      break;
    case value2:
      // code block
      break;
    // more cases
    default:
    // code block
  } 
  */

  switch (true) {
    case keyPressed == LEFT && !goingRight: // avoid moving to the left and imediately to the right
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == RIGHT && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == DOWN && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
};

// Check if the game is over
function checkGameOver(){
  // check if snake hit the wall 
  switch (true) {
    // each 'case' checks a specific condition related to the position of the snake on gameBoard
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  // check if snake collides with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
};

// Display game over text
function displayGameOver(){ 
  context.font = "50px Monospace";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("GAME OVER !", gameWidth/2, gameHeight/2);
  running = false;
};

// Reset the game using resetBtn
function resetGame(){ 
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [ 
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 }, 
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
  ];
  gameStart();
};