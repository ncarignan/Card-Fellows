'use strict';

// ######### //
// Reference //
// ######### //

// Relevant Object Properties
// currentUser.name
// currentUser.wins
// currentUser.losses
// currentUser.ties
// currentUser.gamesPlayed
// currentUser.gameOutcome

// ######### //
//   Codez   //
// ######### //

//Declare html elements for interaction w/DOM
var player = document.getElementById('player-name');
var games = document.getElementById('game-history');
var percentEl = document.getElementById('percentage');
var welcome = document.getElementById('welcome');
var losing = document.getElementById('losing');
var winning = document.getElementById('winning');
var trend = document.getElementById('trend');
var section = document.getElementById('section');
var compStats = document.getElementById('compstats');

// Get userName + game info/Set globals
var userName = localStorage.userName;
var currentUser = null;
if (localStorage.playerObjectArray){
  var playerObjectArray = JSON.parse(localStorage.playerObjectArray);
} else {
  playerObjectArray = {name: localStorage.userName,
    handCards: [],
    gameOutcome: [],
    gamesPlayed: 0,
    handValue: 0 ,
    wins: 0,
    losses: 0,
    ties: 0};
  currentUser = playerObjectArray;
}
var winsVsLosses = null;

// Match userName with relevant player history
if (localStorage.playerObjectArray) {
  for (var i = 0; i < playerObjectArray.length; i++){
    if(playerObjectArray[i].name === userName){
      currentUser = playerObjectArray[i];
    }
  };
}

function showWelcome() {
  welcome.style.display = 'block';
  losing.style.display = 'none';
  winning.style.display = 'none';
  trend.style.display = 'none';
}

function showLosing() {
  welcome.style.display = 'none';
  losing.style.display = 'block';
  winning.style.display = 'none';
  trend.style.display = 'none';
}

function showWinning() {
  welcome.style.display = 'none';
  losing.style.display = 'none';
  winning.style.display = 'block';
  trend.style.display = 'none';
}

function showTrend() {
  welcome.style.display = 'none';
  losing.style.display = 'none';
  winning.style.display = 'none';
  trend.style.display = 'block';
}

//Calculate running win percentage -- Don't factor in ties.
function winPercentage(){
  return Math.round((currentUser.wins / (currentUser.wins + currentUser.losses)) * 100);
}

//Function for calculating computer's win percentage
function computerWinPercentage(i){
  return Math.round((playerObjectArray[i].wins / (playerObjectArray[i].wins + playerObjectArray[i].losses)) * 100);
}

//Conditional to pick which message to display to user
if (currentUser.gamesPlayed < 1 || !localStorage.playerObjectArray){
  section.style.display = 'none';
  showWelcome();
}

if (currentUser.gamesPlayed > 0){
  winsVsLosses = winPercentage();
  if (winsVsLosses <= 50){
    showLosing();
  }
  if (winsVsLosses > 50){
    showWinning();
  }
  if (currentUser.gamesPlayed > 25){
    showTrend();
  }
}

//Helper function
function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

//Generate game history info
newElement('h1', ('Hello, ' + userName + '!'), player);

//Display game history
for (var j = 0; j < currentUser.gamesPlayed; j++){
  newElement('li', ('Game ' + (j + 1) + ' ..............................................................................................................' + currentUser.gameOutcome[j]), games);
};

newElement('h1', ('Win Percentage: ' + winsVsLosses + '%'), percentEl);

var computerPlayerArr = ['Dealer Sam', 'Ron', 'Amanda', 'Allie', 'Gary', 'Dustin', 'Demi'];

for (var k = 1; k < 7; k++){
  newElement('li', (computerPlayerArr[k] + ' ..............................................................................................................' + computerWinPercentage(k)), compStats);
}
