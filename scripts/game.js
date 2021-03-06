'use strict';

//declare globals
var hitButton = document.getElementById('hitButton');
var stayButton = document.getElementById('stayButton');
var splitButton = document.getElementById('splitButton');
var dealButton = document.getElementById('dealButton');
var playerHand = document.getElementById('playerhand');
var results = document.getElementById('results');
var staticPlayerNameArray = ['Dealer', 'Player1', 'Player2', 'Player3', 'Player4', 'Player5', 'Player6'];
var topRightHelper = document.getElementById('toprighthelper');
var bottomLeftHelper = document.getElementById('bottomlefthelper');
var topLeftHelper = document.getElementById('toplefthelper');
var deleteButton = document.getElementById('delete');
Player.computer0Hand = document.getElementById('dealerhand');
Player.computer1Hand = document.getElementById('computer1Hand');
Player.computer2Hand = document.getElementById('computer2Hand');
Player.computer3Hand = document.getElementById('computer3Hand');
Player.computer4Hand = document.getElementById('computer4Hand');
Player.computer5Hand = document.getElementById('computer5Hand');
Player.computer6Hand = document.getElementById('computer6Hand');
splitButton.style.display = 'none';
hitButton.style.display = 'none';
stayButton.style.display = 'none';
Player.hitNumArr = [17, 21, 0, 15, 18];

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
//checks to see if dealer and standin players were created and creates if needed
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
    new Player(localStorage.userName, playerHand);
  }
})();

//Defines a random hit spot for computer player 5 //Dustin is a wildcard!
(Player.randomHit = function(){
  Player.hitNumArr[5] = Math.floor(Math.random() * (10)) + 11;
})();

//function to store the i variable of the current user for reference in Player.playerObjectArray[i];
Player.currentUser = function(){
  for(var i = 7; i < Player.playerObjectArray.length; i++){
    if(Player.playerObjectArray[i].name === localStorage.userName){
      return i;
    }
  }
};

if (Player.playerObjectArray[Player.currentUser()].gamesPlayed === 0){
  deleteButton.style.display = 'none';
} else {
  deleteButton.style.display = 'block';
}

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
  var topLeftP = document.createElement('h2');
  var topRightP = document.createElement('h2');
  var bottomLeftP = document.createElement('h2');
  var bottomRightP = document.createElement('h2');
  var logoImg = document.createElement('img')
;
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
    topRightP.innerHTML = null;
    bottomLeftP.innerHTML = null;
    innerDiv.classList.add('innerbox');
  }
  topLeftP.innerHTML = '&lt;' + name + '&gt;';
  bottomRightP.innerHTML = '&lt;/' + name + '&gt;';
  if(suit === null){
    topLeftP.innerHTML = null;
    bottomRightP.innerHTML = null;
    logoImg.src = '../resources/logo_large.png';
    logoImg.id = 'cardBackLogo';
    innerDiv.appendChild(logoImg);
  }
};

//selects a random card's integer and checks to make sure it is unique
Card.randomCard = function(){
  var cardInteger = Math.floor(Math.random() * (Card.all.length - 1));
  return (Card.all.splice(cardInteger, 1))[0];
};

//populates gives dealer and standin players cards and Player cards
Card.dealerFunction = function(){
  // Card.cardsPickedThisHand = [];
  for (var i = 0; i < 7; i++){
    Player.playerObjectArray[i].handCards = [];
    Player.playerObjectArray[i].handCards.push(Card.randomCard());
    Player.playerObjectArray[i].handCards.push(Card.randomCard());
  }
  Player.playerObjectArray[Player.currentUser()].handCards = [];
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.randomCard());
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.randomCard());

  Card.printCard(Player.computer0Hand, null, null);
  Card.printCard(Player.computer0Hand, Player.playerObjectArray[0].handCards[1].suit , Player.playerObjectArray[0].handCards[1].name);

  Card.printCard(playerHand, Player.playerObjectArray[Player.currentUser()].handCards[0].suit, Player.playerObjectArray[Player.currentUser()].handCards[0].name);
  Card.printCard(playerHand, Player.playerObjectArray[Player.currentUser()].handCards[1].suit, Player.playerObjectArray[Player.currentUser()].handCards[1].name);

  if (Player.playerObjectArray[Player.currentUser()].handCards[0].name === Player.playerObjectArray[Player.currentUser()].handCards[1].name){
    splitButton.style.display = 'block';
  }
};

//Sums the cards in a player's hand
Player.handSum = function(i){
  Player.playerObjectArray[i].handValue = 0;
  for(var j in Player.playerObjectArray[i].handCards){
    Player.playerObjectArray[i].handValue += Player.playerObjectArray[i].handCards[j].value;
  }
  if (Player.playerObjectArray[i].handValue > 21){
    for (var k in Player.playerObjectArray[i].handCards){
      if (Player.playerObjectArray[i].handCards[k].value === 11){
        Player.playerObjectArray[i].handCards[k].value = 1;
        Player.handSum(i);
        break;
      }
    }
  }
};

//Iterates on dealer and all standin players to play their hand by vegas dealer rules
Player.computerPlaysHand = function(){
  for(var i = 0; i < 7; i++){
    Player.handSum(i);
    while (Player.playerObjectArray[i].handValue < Player.hitNumArr[i]){
      Player.playerObjectArray[i].handCards.push(Card.randomCard());
      if (i === 0){
        Card.printCard((Player.computer0Hand), Player.playerObjectArray[i].handCards[Player.playerObjectArray[i].handCards.length - 1].suit, Player.playerObjectArray[i].handCards[Player.playerObjectArray[i].handCards.length - 1].name);
      }
      Player.handSum(i);
    }
  }
};

//Defines the rules by which computer player 6 plays by
Player.demiRules = function(){
  Player.handSum(6);
  if([2,3].includes(Player.playerObjectArray[0].handCards[1].value)){
    Player.hitNumArr[6] = 13;
  }
  if([4,5,6].includes(Player.playerObjectArray[0].handCards[1].value)){
    Player.hitNumArr[6] = 12;
  }
  if([7,8,9].includes(Player.playerObjectArray[0].handCards[1].value)){
    Player.hitNumArr[6] = 17;
  }
  if([10,11].includes(Player.playerObjectArray[0].handCards[1].value)){
    Player.hitNumArr[6] = 17;
  }
};

//function that reEvaluates the hand's value
Player.userGuideRules = function(){
  topRightHelper.innerHTML = null;
  bottomLeftHelper.innerHTML = null;
  Player.handSum(Player.currentUser());
  if([2,3].includes(Player.playerObjectArray[0].handCards[1].value)){
    newElement('p', 'When the dealer has a 2 or a 3 showing, their odds of busting are about 36%. The player has an 11% higher chance to win against these cards', topRightHelper);
    if(Player.playerObjectArray[Player.currentUser()].handValue < 12){
      newElement('p', 'The probability of busting on a hit is 0%. You should always hit when your hand is 11 or less!', bottomLeftHelper);
    }else if(Player.playerObjectArray[Player.currentUser()].handValue < 13){
      newElement('p', 'The probability of busting on a 12 is 31%. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit greater than 39%. You should stay!', bottomLeftHelper);
    }
  }
  if([4,5,6].includes(Player.playerObjectArray[0].handCards[1].value)){
    newElement('p', 'When the dealer has a 4, 5 or 6 showing, their odds of busting are about 41%. The player has an 22% higher chance to win against these cards', topRightHelper);
    if(Player.playerObjectArray[Player.currentUser()].handValue < 12){
      newElement('p', 'The probability of busting on a hit is 0%. You should always hit when your hand is 11 or less!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 31%. You should stay!', bottomLeftHelper);
    }
  }
  if([7,8,9].includes(Player.playerObjectArray[0].handCards[1].value)){
    newElement('p', 'When the dealer has a 7, 8 or 9 showing, their odds of busting are about 24%. The player has an 14% higher chance to win against a 7, 5% against an 8, but a 4% higher chance to lose or tie against a 9.', topRightHelper);
    if(Player.playerObjectArray[Player.currentUser()].handValue < 12){
      newElement('p', 'The probability of busting on a hit is 0%. You should always hit when your hand is 11 or less!', bottomLeftHelper);
    }else if(Player.playerObjectArray[Player.currentUser()].handValue < 17){
      newElement('p', 'The probability of busting on a hit is less than 62%. However, there\'s a good chance the dealer will beat you if you don\'t. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 69%. You should stay!', bottomLeftHelper);
    }
  }
  if([10,11].includes(Player.playerObjectArray[0].handCards[1].value)){
    newElement('p', 'When the dealer has a card of value 10 or 11 showing, their odds of busting are about 21%, unless they have an ace. With an Ace, their odds are busting are about 12%. The player has a 22% higher chance to lose or tie against these cards.', topRightHelper);
    if(Player.playerObjectArray[Player.currentUser()].handValue < 12){
      newElement('p', 'The probability of busting on a hit is 0%. You should always hit when your hand is 11 or less!', bottomLeftHelper);
    }else if(Player.playerObjectArray[Player.currentUser()].handValue < 17 ){
      newElement('p', 'The probability of busting on a hit is less than 62%. However, there\'s a good chance the dealer will beat you if you don\'t. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 69%. You should stay!', bottomLeftHelper);
    }
  }
};

//Helper function for creating new elements
function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.innerHTML = content;
  newEl.classList.add('o90');
  parent.appendChild(newEl);
};

//occurs when player ends turn (stays, busts, gets blackjack). Others play then currentUser compares to dealer
Player.gameResolution = function(){
  dealButton.style.display = 'block';
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  splitButton.style.display = 'none';
  Player.toggleGameEventListenersOff();
  Player.demiRules();
  Player.computerPlaysHand();
  Player.dealerCardWriter();
  Player.handSum(Player.currentUser());
  if (Player.playerObjectArray[Player.currentUser()].handValue > 21){
    newElement('h1', 'You Lose!', results);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('loss');
    Player.playerObjectArray[Player.currentUser()].losses++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
    if (Player.playerObjectArray[Player.currentUser()].gamesPlayed % 10 === 0){
      newElement('p', '<a href="stats.html">Hey! Make sure to check out the stats page to see your results!</a>', results);
    }
  } else if ((Player.playerObjectArray[0].handValue > Player.playerObjectArray[Player.currentUser()].handValue) && (!(Player.playerObjectArray[0].handValue > 21))){
    newElement('h1', 'You Lose!', results);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('loss');
    Player.playerObjectArray[Player.currentUser()].losses++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
    if (Player.playerObjectArray[Player.currentUser()].gamesPlayed % 10 === 0){
      newElement('p', '<a href="stats.html">Hey! Make sure to check out the stats page to see your results!</a>', results);
    }
  } else if (Player.playerObjectArray[0].handValue > 21){
    newElement('h1', 'You Win!', results);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('win');
    Player.playerObjectArray[Player.currentUser()].wins++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
    if (Player.playerObjectArray[Player.currentUser()].gamesPlayed % 10 === 0){
      newElement('p', '<a href="stats.html">Hey! Make sure to check out the stats page to see your results!</a>', results);
    }
  } else if ((Player.playerObjectArray[Player.currentUser()].handValue <= 21) && (Player.playerObjectArray[0].handValue < Player.playerObjectArray[Player.currentUser()].handValue)){
    newElement('h1', 'You Win!', results);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('win');
    Player.playerObjectArray[Player.currentUser()].wins++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
    if (Player.playerObjectArray[Player.currentUser()].gamesPlayed % 10 === 0){
      newElement('p', '<a href="stats.html">Hey! Make sure to check out the stats page to see your results!</a>', results);
    }
  } else if (Player.playerObjectArray[0].handValue === Player.playerObjectArray[Player.currentUser()].handValue){
    newElement('h1', 'A Tie!', results);
    Player.playerObjectArray[Player.currentUser()].gameOutcome.push('tie');
    Player.playerObjectArray[Player.currentUser()].ties++;
    Player.playerObjectArray[Player.currentUser()].gamesPlayed++;
    if (Player.playerObjectArray[Player.currentUser()].gamesPlayed % 10 === 0){
      newElement('p', '<a href="stats.html">Hey! Make sure to check out the stats page to see your results!</a>', results);
    }
  } else {
    alert('Congrats, you found the condition under which our game doesn\'t work!');
  }
  Player.computerStoragePush();
  localStorage.playerObjectArray = JSON.stringify(Player.playerObjectArray);
};

//Push the computer players' data into localStorage
Player.computerStoragePush = function(){
  for (var i = 1; i < 7; i++){
    Player.handSum(i);
    if (Player.playerObjectArray[i].handValue > 21){
      Player.playerObjectArray[i].losses++;
      Player.playerObjectArray[i].gamesPlayed++;
      Player.playerObjectArray[0].gamesPlayed++;
    } else if ((Player.playerObjectArray[0].handValue > Player.playerObjectArray[i].handValue) && (!(Player.playerObjectArray[0].handValue > 21))){
      Player.playerObjectArray[i].losses++;
      Player.playerObjectArray[i].gamesPlayed++;
      Player.playerObjectArray[0].gamesPlayed++;
    } else if (Player.playerObjectArray[0].handValue > 21){
      Player.playerObjectArray[i].wins++;
      Player.playerObjectArray[i].gamesPlayed++;
      Player.playerObjectArray[0].gamesPlayed++;
    } else if ((Player.playerObjectArray[i].handValue <= 21) && (Player.playerObjectArray[0].handValue < Player.playerObjectArray[i].handValue)){
      Player.playerObjectArray[i].wins++;
      Player.playerObjectArray[i].gamesPlayed++;
      Player.playerObjectArray[0].gamesPlayed++;
    } else if (Player.playerObjectArray[0].handValue === Player.playerObjectArray[i].handValue){
      Player.playerObjectArray[i].ties++;
      Player.playerObjectArray[i].gamesPlayed++;
      Player.playerObjectArray[0].gamesPlayed++;
    } else {
      alert('Congrats, you found the condition under which our game doesn\'t work!');
    }
  }
};

//Handles what happens when you hit
Player.hitHandler = function(){
  splitButton.style.display = 'none';
  Player.playerObjectArray[Player.currentUser()].handCards.push(Card.randomCard());
  //takes the last card in the hand and writes it to the page
  Card.printCard(playerHand, Player.playerObjectArray[Player.currentUser()].handCards[Player.playerObjectArray[Player.currentUser()].handCards.length - 1].suit, Player.playerObjectArray[Player.currentUser()].handCards[Player.playerObjectArray[Player.currentUser()].handCards.length - 1].name);
  Player.handSum(Player.currentUser());
  if (Player.playerObjectArray[Player.currentUser()].handValue >= 21){
    return Player.gameResolution();
  }
  Player.userGuideRules();
};

//Handles what happens when you stay (hint: the game ends)
Player.stayHandler = function(){
  Player.gameResolution();
};

//Handles what happens when you try and split when you get doubles
Player.splitHandler = function(){
  alert('"Adobe Flash Player" is out-of-date.\n\nThe version of this plug-in on your computer does not incude the latest security updates and is blocked. To continue using "Adobe Flash Player", download an update from Adobe.');
};

//deals out cards and turns on hit/stay
Player.dealHandler = function(){
  results.innerHTML = null;
  topLeftHelper.innerHTML = null;
  topLeftHelper.innerHTML = '<img src="../resources/logo_large.png" width="100px">';
  dealButton.style.display = 'none';
  hitButton.style.display = 'block';
  stayButton.style.display = 'block';
  splitButton.style.display = 'none';
  Card.cardCreator();
  playerHand.innerHTML = null;
  Player.computer0Hand.innerHTML = null;
  Player.toggleGameEventListenersOn();
  Card.dealerFunction();
  Player.userGuideRules();
};

//Writes the dealer's cards upon completion of the game
Player.dealerCardWriter = function(){
  Player.computer0Hand.innerHTML = null;
  for (var i = 0; i < Player.playerObjectArray[0].handCards.length; i++)
    Card.printCard(Player.computer0Hand, Player.playerObjectArray[0].handCards[i].suit, Player.playerObjectArray[0].handCards[i].name);
};

//Event listeners and the functions related to them
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
