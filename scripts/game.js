'use strict';

//declare button id's
var hitButton = document.getElementById('hitButton');
var stayButton = document.getElementById('stayButton');
var splitButton = document.getElementById('splitButton');
var dealButton = document.getElementById('dealButton');
var playerHand = document.getElementById('playerhand');
var buttonHolder = document.getElementById('buttonHolder');
var staticPlayerNameArray = ['Dealer', 'Player1', 'Player2', 'Player3', 'Player4', 'Player5', 'Player6'];
Player.computer0Hand = document.getElementById('dealerhand');
Player.computer1Hand = document.getElementById('computer1Hand');
Player.computer2Hand = document.getElementById('computer2Hand');
Player.computer3Hand = document.getElementById('computer3Hand');
Player.computer4Hand = document.getElementById('computer4Hand');
Player.computer5Hand = document.getElementById('computer5Hand');
Player.computer6Hand = document.getElementById('computer6Hand');


//constructor for players
function Player(name, handLoc){
  this.name = name;
  this.handLoc = handLoc;
  this.handCards = [];
  this.gameOutcome = [];
  this.gamesPlayed = 0;
  this.handValue = 0 ;
  this.wins = 0;
  this.losses = 0;
  this.ties = 0;
  Player.playerObjectArray.push(this);
  localStorage.playerObjectArray = JSON.stringify(Player.playerObjectArray);
}

(Player.localStorageAlign = function(){
//checks to see if dealer and standinplayers were created and creates if needed
  if(!localStorage.playerObjectArray){
    Player.playerObjectArray = [];
    Player.staticPlayerNameArray = function(){
      for (var i in staticPlayerNameArray){
        new Player(staticPlayerNameArray[i], eval('Player.computer' + i + 'Hand'));
      }
    };
    Player.staticPlayerNameArray();
  }else{
    Player.playerObjectArray = JSON.parse(localStorage.playerObjectArray);
  }

  // if username does not have an object, creates one with name of username
  if(localStorage.userName && !localStorage.playerObjectArray.includes(localStorage.userName)){
    // console.log('creating new user object');
    new Player(localStorage.userName, playerHand);
  }
})();

//function to store the i variable of the current user for reference in Player.playerObjectArray[i];
Player.currentUser = function(){
  for(var i = 7; i < Player.playerObjectArray.length; i++){
    if(Player.playerObjectArray[i].name === localStorage.userName){
      return i;
    }
  }
};

//constructor function for cards
Card.all = [];
function Card(name, suit, value){
  this.name = name;
  this.suit = suit;
  this.value = value;
  Card.all.push(this);
}

//card values and names
Card.valueArray = [2,3,4,5,6,7,8,9,10,10,10,10,11];
Card.nameArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

//builds all the cards
(Card.cardCreator = function(){
  Card.all = [];
  for(var i in Card.valueArray){
    new Card(Card.nameArray[i], 'hearts', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'diamonds', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'spades', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'clubs', Card.valueArray[i]);
  }
})();

//print a card to the screen
Card.printCard = function(hand, suit, name){
  var outerDiv = document.createElement('div');
  var innerDiv = document.createElement('div');
  var topLeftP = document.createElement('p');
  var topRightP = document.createElement('p');
  var bottomLeftP = document.createElement('p');
  var bottomRightP = document.createElement('p');

  hand.appendChild(outerDiv);
  outerDiv.appendChild(innerDiv);
  innerDiv.appendChild(topLeftP);
  innerDiv.appendChild(topRightP);
  innerDiv.appendChild(bottomLeftP);
  innerDiv.appendChild(bottomRightP);

  topLeftP.classList.add('topleft');
  topRightP.classList.add('topright');
  bottomLeftP.classList.add('bottomleft');
  bottomRightP.classList.add('bottomright');
  topLeftP.classList.add('corner');
  topRightP.classList.add('corner');
  bottomLeftP.classList.add('corner');
  bottomRightP.classList.add('corner');

  topRightP.classList.add('bigger');
  bottomLeftP.classList.add('bigger');
  outerDiv.classList.add('outerbox');

  switch (suit) {
  case 'diamonds':
    topRightP.innerHTML = '&diams;';
    bottomLeftP.innerHTML = '&diams;';
    innerDiv.classList.add('innerboxr');
    break;
  case 'clubs':
    topRightP.innerHTML = '&clubs;';
    bottomLeftP.innerHTML = '&clubs;';
    innerDiv.classList.add('innerbox');
    break;
  case 'hearts':
    topRightP.innerHTML = '&hearts;';
    bottomLeftP.innerHTML = '&hearts;';
    innerDiv.classList.add('innerboxr');
    break;
  default:
    topRightP.innerHTML = '&spades;';
    bottomLeftP.innerHTML = '&spades;';
    innerDiv.classList.add('innerbox');
  }
  topLeftP.innerHTML = '&lt;' + name + '&gt;';
  bottomRightP.innerHTML = '&lt;/' + name + '&gt;';
};

//selects a random card's integer and checks to make sure it is unique
Card.randomCard = function(){
  var cardInteger = Math.floor(Math.random() * (Card.all.length - 1));
  return Card.all.splice(cardInteger, 1);
};

//populates gives dealer and standin players cards and Player cards
Card.dealerFunction = function(){
  Card.cardsPickedThisHand = [];
  for (var i = 0; i < 7; i++){
    Player.playerObjectArray[i].handCards = [];
    Player.playerObjectArray[i].handCards.push(Card.randomCard());
    Player.playerObjectArray[i].handCards.push(Card.randomCard());
  }
  Player.playerObjectArray[Player.currentUser()].handCards = [];
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.randomCard());
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.randomCard());

  for (var j = 0; j < 7; i++){
    Card.printCard(eval('Player.computer' + j + 'Hand'), Player.playerObjectArray[j].handCards[1][0].suit , Player.playerObjectArray[j].handCards[1][0].name);
  }

  Card.printCard(playerHand, Player.playerObjectArray[Player.currentUser()].handCards[0][0].suit, Player.playerObjectArray[Player.currentUser()].handCards[0][0].name);
  Card.printCard(playerHand, Player.playerObjectArray[Player.currentUser()].handCards[1][0].suit, Player.playerObjectArray[Player.currentUser()].handCards[1][0].name);

  if (Player.playerObjectArray[Player.currentUser()].handCards[0].name === Player.playerObjectArray[Player.currentUser()].handCards[1].name){
    splitButton.style.display = 'block';
  }
};

//Iterates on dealer and all standin players to play their hand by vegas dealer rules
Player.computerPlaysHand = function(){
  for(var i = 0; i < 7; i++){
    Player.handSum(i);
    while (Player.playerObjectArray[i].handValue < 17){
      Player.playerObjectArray[i].handCards.push(Card.randomCard());
      Card.printCard(eval('Player.computer' + i + 'Hand'), Player.playerObjectArray[i].handCards[Player.playerObjectArray[i].handCards.length - 1][0].suit, Player.playerObjectArray[i].handCards[Player.playerObjectArray[i].handCards.length - 1][0].name);
      Player.handSum(i);
    }
  }
};

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
  if([2,3].includes(Player.playerObjectArray[0].handCards[0][0].value)){
    if(Player.playerObjectArray[Player.currentUser()].handValue < 13){
      // console.log('hit lower than 13');
    }else{
      // console.log('stay');
    }
  }
  if([4,5,6].includes(Player.playerObjectArray[0].handCards[0][0].value)){
    if(Player.playerObjectArray[Player.currentUser()].handValue < 12){
      // console.log('hit lower than 12');
    }else{
      // console.log('stay');
    }
  }
  if([7,8,9].includes(Player.playerObjectArray[0].handCards[0][0].value)){
    if(Player.playerObjectArray[Player.currentUser()].handValue < 17){
      // console.log('hit lower than 17');
    }else{
      // console.log('stay');
    }
  }
  if([10,11].includes(Player.playerObjectArray[0].handCards[0][0].value)){
    if(Player.playerObjectArray[Player.currentUser()].handValue < 17 ){
      // console.log('hit lower than 17, split if able');
    }else{
      // console.log('stay');
    }
  }
};

function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

//occurs when player ends turn (stays, busts, gets blackjack). Others play then currentUser compares to dealer
Player.gameResolution = function(){
  dealButton.style.display = 'block';
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  splitButton.style.display = 'none';
  Player.toggleGameEventListenersOff();
  Player.computerPlaysHand();
  Player.handSum(Player.currentUser());
  if (Player.playerObjectArray[Player.currentUser()].handValue > 21 || Player.playerObjectArray[0].handValue > Player.playerObjectArray[Player.currentUser()].handvalue){
    newElement('h1', 'You Lose!', buttonHolder);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('loss');
    Player.playerObjectArray[Player.currentUser()].losses++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
  }else if(Player.playerObjectArray[0].handValue > 21){
    newElement('h1', 'You Win!', buttonHolder);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('win');
    Player.playerObjectArray[Player.currentUser()].wins++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
  }else if(Player.playerObjectArray[Player.currentUser()].handValue <= 21 && Player.playerObjectArray[0].handValue < Player.playerObjectArray[Player.currentUser()].handValue){
    newElement('h1', 'You Win!', buttonHolder);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('win');
    Player.playerObjectArray[Player.currentUser()].wins++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
  }else {
    newElement('h1', 'A Tie!', buttonHolder);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('tie');
    Player.playerObjectArray[Player.currentUser()].ties++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
  }
  localStorage.playerObjectArray = JSON.stringify(Player.playerObjectArray);
};

Player.hitHandler = function(){
  console.log('hit');
  splitButton.style.display = 'none';
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.randomCard());
  //takes the last card in the hand and writes it to the page
  Card.printCard(playerHand, Player.playerObjectArray[Player.currentUser()].handCards[Player.playerObjectArray[Player.currentUser()].handCards.length - 1][0].suit, Player.playerObjectArray[Player.currentUser()].handCards[Player.playerObjectArray[Player.currentUser()].handCards.length - 1][0].name);
  Player.handSum(Player.currentUser());
  if (Player.playerObjectArray[Player.currentUser()].handValue >= 21){
    Player.gameResolution();
  }
};

Player.stayHandler = function(){
  Player.gameResolution();
};

Player.splitHandler = function(){
  alert('Please upgrade your Flash player!');
};

//deals out cards and turns on hit/stay
Player.dealHandler = function(){
  dealButton.style.display = 'none';
  hitButton.style.display = 'block';
  stayButton.style.display = 'block';
  Card.cardCreator();
  playerHand.innerHTML = null;
  for (var i in staticPlayerNameArray){
    eval('Player.computer' + i + 'Hand').innerHTML = null;
  }
  console.log('deal');
  Player.toggleGameEventListenersOn();
  Card.dealerFunction();
};

dealButton.addEventListener('click', Player.dealHandler);

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
