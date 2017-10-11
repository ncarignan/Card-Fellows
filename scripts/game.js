'use strict';

//declare button id's
var hitButton = document.getElementById('hitButton');
var stayButton = document.getElementById('stayButton');
var splitButton = document.getElementById('splitButton');
var dealButton = document.getElementById('dealButton');
var dealerHand = document.getElementById('dealerhand');
var playerHand = document.getElementById('playerhand');

//constructor for players
function Player(name){
  this.name = name;
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
      var staticPlayerNameArray = ['Dealer', 'Player1', 'Player2', 'Player3', 'Player4', 'Player5', 'Player6'];
      for (var i in staticPlayerNameArray){
        new Player(staticPlayerNameArray[i]);
      }
    };
    Player.staticPlayerNameArray();
  }else{
    Player.playerObjectArray = JSON.parse(localStorage.playerObjectArray);
  }

  // if username does not have an object, creates one with name of username
  if(localStorage.userName && !localStorage.playerObjectArray.includes(localStorage.userName)){
    // console.log('creating new user object');
    new Player(localStorage.userName);
  }
})();

//function to store the i variable of the current user for reference in Player.playerObjectArray[i];
Player.currentUser = function(){
  for(var i in Player.playerObjectArray){
    // console.log(i);
    if(Player.playerObjectArray[i].name === localStorage.userName){
      // console.log('worked');
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
  for(var i in Card.valueArray){
    new Card(Card.nameArray[i], 'hearts', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'diamonds', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'spades', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'clubs', Card.valueArray[i]);
  }
})();

//print a card to the screen
Card.printCard = function(hand, suit, name) {
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

  topLeftP.className += 'topleft';
  topRightP.className += 'topright';
  bottomLeftP.className += 'bottomleft';
  bottomRightP.className += 'bottomright';
  topLeftP.className += 'corner';
  topRightP.className += 'corner';
  bottomLeftP.className += 'corner';
  bottomRightP.className += 'corner';

  topRightP.className += 'bigger';
  bottomLeftP.className += 'bigger';
  outerDiv.className += 'outerbox';

  switch (suit) {
  case 'spades':
    topRightP.innerHTML = '&spades;';
    bottomLeftP.innerHTML = '&spades;';
    innerDiv.className += 'innerbox';
    break;
  case 'diamonds':
    topRightP.innerHTML = '&diams;';
    bottomLeftP.innerHTML = '&diams;';
    innerDiv.className += 'innerboxr';
    break;
  case 'clubs':
    topRightP.innerHTML = '&clubs;';
    bottomLeftP.innerHTML = '&clubs;';
    innerDiv.className += 'innerbox';
    break;
  case 'hearts':
    topRightP.innerHTML = '&hearts;';
    bottomLeftP.innerHTML = '&hearts;';
    innerDiv.className += 'innerboxr';
    break;
  default:
    topRightP.innerHTML = '&spades;';
    bottomLeftP.innerHTML = '&spades;';
    innerDiv.className += 'innerbox';
  }
  topLeftP.innerHTML = '&lt;' + name + '&gt;';
  bottomRightP.innerHTML = '&lt;/' + name + '&gt;';
};

//selects a random card's integer and checks to make sure it is unique
Card.randomCard = function(){
  var cardInteger = Math.floor(Math.random() * (52 - 1)) + 1;
  // console.log(cardInteger);
  for(var i = 0; i < 1; i++){
    if(Card.cardsPickedThisHand.includes(cardInteger)){
      i--;
    }else{
      Card.cardsPickedThisHand.push(cardInteger);
    }
    return cardInteger;
  }
};

//populates gives dealer and standin players cards and Player cards
Card.dealerFunction = function(){
  Card.cardsPickedThisHand = [];
  for(var i = 0; i < 7; i++){
    Player.playerObjectArray[i].handCards = [];
    Player.playerObjectArray[i].handCards.push(Card.all[Card.randomCard()]);
    Player.playerObjectArray[i].handCards.push(Card.all[Card.randomCard()]);
  }
  Player.playerObjectArray[Player.currentUser()].handCards = [];
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.all[Card.randomCard()]);
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.all[Card.randomCard()]);

  Card.printCard(dealerHand , Player.playerObjectArray[0].handCards[0].suit , Player.playerObjectArray[0].handCards[0].name);
  Card.printCard(playerHand , Player.playerObjectArray[Player.currentUser()].handCards[0].suit, Player.playerObjectArray[Player.currentUser()].handCards[0].name);
  Card.printCard(playerHand , Player.playerObjectArray[Player.currentUser()].handCards[1].suit, Player.playerObjectArray[Player.currentUser()].handCards[1].name);
};
//TODO: add event listener to a button for dealing

//Iterates on dealer and all standin players to play their hand by vegas dealer rules
Player.playerPlaysHand = function(){
  // console.log('beginPPH');
  for(var i = 0; i < 7; i++){
    // console.log('');
    Player.handSum(i);
    // console.log('');
    for(var k = 0; k < 1; k++){
      // console.log('player begins playing');
      if (Player.playerObjectArray[i].handValue < 17){
        // console.log(Player.playerObjectArray[i].handValue);
        // console.log('hand was <17');
        Player.playerObjectArray[i].handCards.push(Card.all[Card.randomCard()]);
        Player.handSum(i);
        // console.log(Player.playerObjectArray[i].handValue);
        // console.log('hit');
        if (Player.playerObjectArray[i].handValue < 17){
          // console.log(Player.playerObjectArray[i].handValue);
          // console.log('still under 17, reevaluate');
          k--;
        }
      }
    }
  }
};
//function that reEvaluates the hand's value
Player.handSum = function(i){
  Player.playerObjectArray[i].handValue = 0;
  // console.log('reset is Success');
  for(var j in Player.playerObjectArray[i].handCards){
    // console.log('sums handCards');
    Player.playerObjectArray[i].handValue += Player.playerObjectArray[i].handCards[j].value;
  }
};

Player.userGuideRules = function(){
  Player.handSum(Player.currentUser());
  if([2,3].includes(Player.playerObjectArray[0].handCards[0].value)){
    if(Player.playerObjectArray[Player.currentUser()].handValue < 13){
      // console.log('hit lower than 13');
    }else{
      // console.log('stay');
    }
  }
  if([4,5,6].includes(Player.playerObjectArray[0].handCards[0].value)){
    if(Player.playerObjectArray[Player.currentUser()].handValue < 12){
      // console.log('hit lower than 12');
    }else{
      // console.log('stay');
    }
  }
  if([7,8,9].includes(Player.playerObjectArray[0].handCards[0].value)){
    if(Player.playerObjectArray[Player.currentUser()].handValue < 17){
      // console.log('hit lower than 17');
    }else{
      // console.log('stay');
    }
  }
  if([10,11].includes(Player.playerObjectArray[0].handCards[0].value)){
    if(Player.playerObjectArray[Player.currentUser()].handValue < 17 ){
      // console.log('hit lower than 17, split if able');
    }else{
      // console.log('stay');
    }
  }
};


//occurs when player ends turn (stays, busts, gets blackjack). Others play then currentUser compares to dealer
Player.gameResolution = function(){
  // console.log('gameReslolutionInvoked');
  Player.toggleGameEventListenersOff();
  // console.log('EListeners off');
  Player.playerPlaysHand();
  // console.log('playerPlaysHandInvoked');
  Player.handSum(Player.currentUser());
  // console.log('players hand is ' + Player.playerObjectArray[Player.currentUser()].handValue);
  if (Player.playerObjectArray[Player.currentUser()].handValue > 21 || Player.playerObjectArray[0].handValue > Player.playerObjectArray[Player.currentUser()].handvalue){
    console.log('loss');
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('loss');
    Player.playerObjectArray[Player.currentUser()].losses++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
  }else if(Player.playerObjectArray[0].handValue > 21){
    console.log('win');
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('win');
    Player.playerObjectArray[Player.currentUser()].wins++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
  }else if(Player.playerObjectArray[Player.currentUser()].handValue <= 21 && Player.playerObjectArray[0].handValue < Player.playerObjectArray[Player.currentUser()].handValue){
    console.log('win');
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('win');
    Player.playerObjectArray[Player.currentUser()].wins++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
  }else {
    console.log('loss');
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('loss');
    Player.playerObjectArray[Player.currentUser()].losses++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
  }
  localStorage.playerObjectArray = JSON.stringify(Player.playerObjectArray);
};

Player.hitHandler = function(){
  console.log('hit');
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.all[Card.randomCard()]);
  //takes the last card in the hand and writes it to the page
  Card.printCard(playerHand, Player.playerObjectArray[Player.currentUser()].handCards[Player.playerObjectArray[Player.currentUser()].handCards.length - 1].suit, Player.playerObjectArray[Player.currentUser()].handCards[Player.playerObjectArray[Player.currentUser()].handCards.length - 1].name);
  // console.log('dealer hand is ' + Player.playerObjectArray[0].handValue);
  Player.handSum(Player.currentUser());
  // console.log(Player.playerObjectArray[Player.currentUser()]);
  if (Player.playerObjectArray[Player.currentUser()].handValue >= 21){
    // console.log('player hand busts');
    Player.gameResolution();
  }

};

Player.stayHandler = function(){
  console.log('stay');
  Player.gameResolution();
};

Player.splitHandler = function(){
  console.log('split');
};

//deals out cards and turns on hit/stay
Player.dealHandler = function(){
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
//todo add a card box with number and color of card type absoluted into corners
