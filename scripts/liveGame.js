'use strict';

//declare button id's
var hitButton = document.getElementById('hitButton');
var stayButton = document.getElementById('stayButton');
var splitButton = document.getElementById('splitButton');
var analyzeButton = document.getElementById('analyzeButton');
var playerHand = document.getElementById('playerhand');
var results = document.getElementById('results');

var topRightHelper = document.getElementById('toprighthelper');
var bottomLeftHelper = document.getElementById('bottomlefthelper');;

function Player(){
  this.handLoc = playerHand;
  this.handCards = [];
  Player.playerObjectArray.push(this);
  localStorage.playerObjectArray = JSON.stringify(Player.playerObjectArray);
}

function Card(name, suit, value){
  this.name = name;
  this.suit = suit;
  this.value = value;
  Card.all.push(this);
}


//print a card to the screen
Card.printCard = function(hand){
  var outerDiv = document.createElement('div');
  var innerDiv = document.createElement('div');
  hand.appendChild(outerDiv);
  outerDiv.appendChild(innerDiv);
  outerDiv.classList.add('outerbox');
};

;

//function that reEvaluates the hand's value
Player.handSum = function(i){
  Player.playerObjectArray[i].handValue = 0;
  // console.log('reset is Success');
  for(var j in Player.playerObjectArray[i].handCards){
    // console.log('sums handCards');
    Player.playerObjectArray[i].handValue += Player.playerObjectArray[i].handCards[j][0].value;
  }
};

Player.userGuideRules = function(){
  Player.handSum(Player.currentUser());
  if([2,3].includes(Player.playerObjectArray[0].handCards[1][0].value)){
    newElement('p', 'When the dealer has a 2 or a 3 showing, their odds of busting are about 36%. The player advantage percentage in this case is about 11%.', topRightHelper);
    if(Player.playerObjectArray[Player.currentUser()].handValue < 13){
      newElement('p', 'The probability of busting on a 12 is 31%. Anything lower than that is impossible to bust on. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit greater than 39%. You should stay!', bottomLeftHelper);// console.log('stay');
    }
  }
  if([4,5,6].includes(Player.playerObjectArray[0].handCards[1][0].value)){
    newElement('p', 'When the dealer has a 4, 5 or 6 showing, their odds of busting are about 41%. The player advantage percentage in this case is about 22%.', topRightHelper);
    if(Player.playerObjectArray[Player.currentUser()].handValue < 12){
      newElement('p', 'The probability of busting on a hit is 0%. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 31%. You should stay!', bottomLeftHelper);
    }
  }
  if([7,8,9].includes(Player.playerObjectArray[0].handCards[1][0].value)){
    newElement('p', 'When the dealer has a 7, 8 or 9 showing, their odds of busting are about 24%. The player advantage percentage in this case declines rapidly from 14% to -4%.', topRightHelper);
    if(Player.playerObjectArray[Player.currentUser()].handValue < 17){
      newElement('p', 'The probability of busting on a hit is less than 62%. However, there\'s a good chance the dealer will beat you if you don\'t. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 69%. You should stay!', bottomLeftHelper);
    }
  }
  if([10,11].includes(Player.playerObjectArray[0].handCards[1][0].value)){
    newElement('p', 'When the dealer has a card of value 10 or 11 showing, their odds of busting are about 21%, unless they have an ace. In this case their odds are busting are about 12%. The player advantage percentage in this case is about -17%.', topRightHelper);
    if(Player.playerObjectArray[Player.currentUser()].handValue < 17 ){
      newElement('p', 'The probability of busting on a hit is less than 62%. However, there\'s a good chance the dealer will beat you if you don\'t. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 69%. You should stay!', bottomLeftHelper);
    }
  }
};

function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

Player.hitHandler = function(){
  console.log('hit');
  splitButton.style.display = 'none';
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.randomCard());
  //takes the last card in the hand and writes it to the page
  Card.printCard(playerHand, Player.playerObjectArray[Player.currentUser()].handCards[Player.playerObjectArray[Player.currentUser()].handCards.length - 1][0].suit, Player.playerObjectArray[Player.currentUser()].handCards[Player.playerObjectArray[Player.currentUser()].handCards.length - 1][0].name);
  Player.handSum(Player.currentUser());
  if (Player.playerObjectArray[Player.currentUser()].handValue >= 21){
    return Player.gameResolution();
  }
  Player.userGuideRules();
};

Player.stayHandler = function(){
  Player.gameResolution();
};

Player.splitHandler = function(){
  alert('"Adobe Flash Player" is out-of-date.\n\nThe version of this plug-in on your computer does not incude the latest security updates and is blocked. To continue using "Adobe Flash Player", download an update from Adobe.');
};

//deals out cards and turns on hit/stay
Player.dealHandler = function(){
  results.innerHTML = null;
  analyzeButton.style.display = 'none';
  hitButton.style.display = 'block';
  stayButton.style.display = 'block';
  splitButton.style.display = 'none';
  Card.cardCreator();
  playerHand.innerHTML = null;
  for (var i in staticPlayerNameArray){
    eval('Player.computer' + i + 'Hand').innerHTML = null;
  }
  console.log('deal');
  Player.toggleGameEventListenersOn();
  Card.dealerFunction();
  Player.userGuideRules();
};

Player.dealerCardWriter = function(){
  Player.computer0Hand.innerHTML = null;
  for (var i = 0; i < Player.playerObjectArray[0].handCards.length; i++)
    Card.printCard(Player.computer0Hand, Player.playerObjectArray[0].handCards[i][0].suit, Player.playerObjectArray[0].handCards[i][0].name);
};

analyzeButton.addEventListener('click', Player.dealHandler);

Player.toggleGameEventListenersOn = function(){
  hitButton.addEventListener('click', Player.hitHandler);
  stayButton.addEventListener('click', Player.stayHandler);
  splitButton.addEventListener('click', Player.splitHandler);
};
Player.toggleGameEventListenersOff = function(){
  hitButton.removeEventListener('click', Player.hitHandler);
  stayButton.removeEventListener('click', Player.stayHandler);
  splitButton.removeEventListener('click', Player.splitHandler);
};
