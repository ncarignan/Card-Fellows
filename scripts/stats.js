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

// Get userName + game info/Set globals
var userName = localStorage.userName;
var currentUser = null;
var playerObjectArray = JSON.parse(localStorage.playerObjectArray);
var winsVsLosses = null;

// Match userName with relevant player history
for (var i = 0; i < playerObjectArray.length; i++){
  if(playerObjectArray[i].name === userName){
    currentUser = playerObjectArray[i];
  }
};

//Calculate running win percentage -- Don't factor in ties.
function winPercentage(){
  return (currentUser.wins / (currentUser.wins + currentUser.losses)) * 100;
}

//Conditional to pick which message to display to user
if (currentUser.gamesPlayed < 1){
  welcome.style.display = 'block';
}

if (currentUser.gamesPlayed > 0){
  winsVsLosses = winPercentage();
}

if (winsVsLosses <= 50){
  losing.style.display = 'block';
}

if (winsVsLosses > 50){
  winning.style.display = 'block';
}

if (currentUser.gamesPlayed > 25){
  trend.style.display = 'block';
  losing.style.display = 'none';
  winning.style.display = 'none';
}

//Declare html elements for interaction w/DOM
var player = document.getElementById('player-name');
var games = document.getElementById('game-history');
var percentEl = document.getElementById('percentage');
var welcome = document.getElementById('welcome');
var losing = document.getElementById('losing');
var winning = document.getElementById('winning');
var trend = document.getElementById('trend');

//Helper function
function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

//Generate game history info
newElement('h1', ('Hello, ' + userName + '!'), player);

//Display no more than the 25 past games
if (currentUser.gamesPlayed.length <= 25){
  for (var j = 0; j < currentUser.gamesPlayed.length; j++){
    newElement('li', ('Game ' + (j + 1) + ' ....................' + currentUser.gameOutcome[j]), games);
  }
} else {
  for (var k = (currentUser.gamesPlayed.length - 25); k < currentUser.gamesPlayed.length; k++){
    newElement('li', ('Game ' + (k + 1) + ' ....................' + currentUser.gameOutcome[k]), games);
  }
}

newElement('h1', ('Win Percentage: ' + winsVsLosses + '%'), percentEl);
