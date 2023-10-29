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
createFood();
drawFood();

function gameStart(){};
function nextTick(){};
function clearBoard(){}; // repainting the board
function createFood(){}; 
function drawFood(){};
function moveSnake(){};
function drawSnake(){};
function changeDirection(){};
function checkGameOver(){};
function displayGameOver(){};
function resetGame(){};



