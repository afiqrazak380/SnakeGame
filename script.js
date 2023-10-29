const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBoarder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [ // snakes is an array of object, each object is snakes body part
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 }, // object
  { x: unitSize, y: 0 },
  { x: 0, y: 0 }, // cordinate of top left corner
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){ // initialize the game
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
};
function nextTick(){ // set a delay to the functions else call checkGameOver
  if(running){ //setTimeout(function, delay, arg1, arg2, ...);
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
function clearBoard(){ // repainting the board
  context.fillStyle = boardBackground; // fill the context with boardBackground colour
  context.fillRect(0, 0, gameWidth, gameHeight); // fill the context from top-left to bottom-right
}; 
function createFood(){ // find a random coordinate to create a food item
  function randFood(min, max){
    const randNum = Math.round((Math.random() * (max - min))*unitSize / unitSize); 
    return randNum
  }
  foodX = randFood(0, gameBoard.width - unitSize); // random X coordinate
  foodY = randFood(0, gameBoard.width - unitSize); // random Y coordinate
}; 
function drawFood(){ // draw the food based on foodCoordinate
  context.fillStyle = foodColor; // set the colour of the food
  context.fillRect(foodX, foodY, unitSize, unitSize); // draw food item //.fillRect(X, Y, width, height)
};
function moveSnake(){ // create an new head of snake in the direction of moving and elimitane the tail
  const head = {x: snake[0].x + xVelocity,
                y: snake[0].y + yVelocity}             
  snake.unshift(head); // add new head
  
  if(snake[0].x == foodX && snake[0].y == foodY){ // food is eaten (coordinate of  head and food overlap0
    score+=1;
    scoreText.textContent = score;
    createFood();
  }
  else{ // eliminate the tails
    snake.pop()
  }
  
};
function drawSnake(){ // draw a snake using snake object array
  context.fillStyle = snakeColor;
  context.strokeStyle = snakeBoarder;
  snake.forEach(snakePart => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  })
};
function changeDirection(event) { // change the direction of the movement
  const keyPressed = event.keyCode; // access key by code number
  
  //keyCode number
  const RIGHT = 37;
  const UP = 38;
  const LEFT = 39;
  const DOWN = 40;

  // Boolean variable
  const goingUp = (yVelocity == -unitSize); 
  const goingDown = (yVelocity == unitSize);
  const goingLeft = (xVelocity == -unitSize);
  const goingRight = (xVelocity == unitSize);

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
function checkGameOver(){};
function displayGameOver(){};
function resetGame(){};



