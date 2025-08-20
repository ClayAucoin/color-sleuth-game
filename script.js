// set environment variables
var colorOffsetBy = 20;  // offset the color by this number - orig is 20
var winningScore = 5;     // set winning score
var correctPic = 1;       // points to add for correct pic
var wrongPic = -2;        // points to deduct for incorrect pic

var rndButtonID;
var currentPlayer = 1;
var p1Score = 0;
var p2Score = 0;
var p1GamesWon = 0;
var p2GamesWon = 0;


function setBoard(){
  // create random color
  var R = randomNumber(0, 235);
  var G = randomNumber(0, 235);
  var B = randomNumber(0, 235);
  var color = rgb(R, G, B);

  // set the squares to new colors
  setProperty("button1", "background-color", color);
  setProperty("button2", "background-color", color);
  setProperty("button3", "background-color", color);
  setProperty("button4", "background-color", color);
  
  // create and set off color to random square
  var diffColor = rgb(R+colorOffsetBy, G+colorOffsetBy, B+colorOffsetBy);
  rndButtonID = "button"+ randomNumber(1, 4);
  setProperty(rndButtonID, "background-color", diffColor);
  
  //console.log("correct square is "+ rndButtonID);
}

function checkCorrect(buttonID){
  //console.log("checking: "+ buttonID);
  
  // check if corect button was picked
  if(buttonID == rndButtonID){
    //console.log("CORRECT");
    updateScoreBy(correctPic);
  } else {
    //console.log("wrong");
    updateScoreBy(wrongPic);
  }
  
  gameOver();
  setBoard(); 
  switchPlayer();
}

function switchPlayer(){
  // switch players after each turn
  if(currentPlayer == 1){
    currentPlayer = 2;
    showElement("player2_highlight");
    hideElement("player1_highlight");
  } else {
    currentPlayer = 1;
    showElement("player1_highlight");
    hideElement("player2_highlight");
  }
  //console.log("current player is: "+ currentPlayer);
}

function updateScoreBy(amt){
  // update score whether hit or missed
  if(currentPlayer == 1){
    p1Score = p1Score + amt;
    setText("score1_label", p1Score);
  } else {
    p2Score = p2Score + amt;
    setText("score2_label", p2Score);
  }
  //console.log("Score P1: "+ p1Score +" P2: "+ p2Score +", Games won P1: "+ p1GamesWon +" P2: "+ p2GamesWon);
}

function gameOver(){
  // set game over screen according to who won
  if(p1Score >= winningScore){
    //console.log("PLAYER 1 WINS");
    p1GamesWon = p1GamesWon + 1;
    setText("player1_winsLabel", p1GamesWon);
    showElement("player1Win_label");
    hideElement("player2Win_label");
    setScreen("gameOver_screen");
  } else if(p2Score >= winningScore){
    //console.log("PLAYER 2 WINS");
    p2GamesWon = p2GamesWon + 1;
    setText("player2_winsLabel", p2GamesWon);
    showElement("player2Win_label");
    hideElement("player1Win_label");
    setScreen("gameOver_screen");
  }
  //console.log("Score P1: "+ p1Score +" P2: "+ p2Score +", Games won P1: "+ p1GamesWon +" P2: "+ p2GamesWon);
}

function resetGame(){
  p1Score = 0;
  p2Score = 0;
  p1GamesWon = 0;
  p2GamesWon = 0;
  setText("score1_label", p1Score);
  setText("score2_label", p1Score);
  setText("player1_winsLabel", p1GamesWon);
  setText("player2_winsLabel", p2GamesWon);
  setScreen("welcomeScreen");

  //console.log("Score P1: "+ p1Score +" P2: "+ p2Score +", Games won P1: "+ p1GamesWon +" P2: "+ p2GamesWon);
}

function playAgain(){
  p1Score = 0;
  setText("score1_label", p1Score);
  p2Score = 0;
  setText("score2_label", p1Score);
  setScreen("gamePlay_screen");

  //console.log("Score P1: "+ p1Score +" P2: "+ p2Score +", Games won P1: "+ p1GamesWon +" P2: "+ p2GamesWon);
}

// button clicks
  // game squares
onEvent("button1", "click", function(){checkCorrect("button1");});
onEvent("button2", "click", function(){checkCorrect("button2");});
onEvent("button3", "click", function(){checkCorrect("button3");});
onEvent("button4", "click", function(){checkCorrect("button4");});

onEvent("startButton", "click", function(){setScreen("gamePlay_screen");});
onEvent("play_againButton", "click", function(){playAgain();});
onEvent("reset_Button", "click", function(){resetGame();});

// set initial board
setBoard();

