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
let yVelocitu = 0;
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
  foodCoordinate();
  drawFood();
  nextTick();
};
function nextTick(){
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
function foodCoordinate(){ // find a random coordinate to create a food item
  function randFood(min, max){
    const randNum = Math.round((Math.random() * (max - min))*unitSize / unitSize); 
    return randNum
  }
  foodX = randFood(0, gameBoard.width - unitSize); // random X coordinate
  foodY = randFood(0, gameBoard.width - unitSize); // random Y coordinate
}; 
function drawFood(){
  context.fillStyle = foodColor; // set the colour of the food
  context.fillRect(foodX, foodY, unitSize, unitSize); // draw food item //.fillRect(X, Y, width, height)
};
function moveSnake(){};
function drawSnake(){};
function changeDirection(){};
function checkGameOver(){};
function displayGameOver(){};
function resetGame(){};



