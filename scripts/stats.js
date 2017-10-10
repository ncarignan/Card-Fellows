'use strict';

// Get userName
var userName = localStorage.userName;
var currentUser = null;
var playerObjectArray = JSON.parse(localStorage.playerObjectArray);
var winsVsLosses = null;

for (var i = 0; i < playerObjectArray.length; i++){
  if(playerObjectArray[i].name === userName){
    currentUser = playerObjectArray[i];
  }
};

// Relevant Object Properties
// currentUser.name
// currentUser.wins
// currentUser.losses
// currentUser.ties
// currentUser.gamesPlayed
// currentUser.gameOutcome

function winPercentage(){
  return (currentUser.wins / (currentUser.wins + currentUser.losses)) * 100;
}

var player = document.getElementById('player-name');
var games = document.getElementById('game-history');
var percentEl = document.getElementById('percentage');
var welcome = document.getElementById('welcome');
var losing = document.getElementById('losing');
var winning = document.getElementById('winning');
var trend = document.getElementById('trend');

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

function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

newElement('h1', ('Hello, ' + userName + '!'), player);
