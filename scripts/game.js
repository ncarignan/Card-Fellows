'use strict';

// Player.playerObjectArray = [];
Player.playerObjectArray = [];
function Player(name){
  this.name = name;
  this.hand = [];
  this.wins = 0;
  this.losses = 0;
  this.tie = 0;
  this.games = this.wins + this.losses + this.ties;
  Player.playerObjectArray.push(this);
  // localStorage.playerObjectArray = JSON.stringify(Player.playerObjectArray);
}

Card.all = [];
function Card(name, suit, value){
  this.name = name;
  this.suit = suit;
  this.value = value;
  Card.all.push(this);
}

Card.cardCreator = function(){
  for(var i in Card.valueArray){
    new Card(Card.nameArray[i], 'Heart', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'Diamond', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'Spade', Card.valueArray[i]);
    new Card(Card.nameArray[i], 'Club', Card.valueArray[i]);
  }
};
Card.cardCreator();

Card.valueArray = [2,3,4,5,6,7,8,9,10,10,10,10,11];
Card.nameArray = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];


if(localStorage.playerObjectArray){
  Player.playerObjectArray = JSON.parse(localStorage.playerObjectArray);
}else if(!localStorage.playerObjectArray){
  localStorage.playerObjectArray = [];
}

//if
for(var i in Player.playerObjectArray){
  if(Player.playerObjectArray[i].name === localStorage.userName){
    Player.currentUser = Player.playerObjectArray[i];
  }
};

localStorage.userName = 'sam';

Player.localStorageAlign = function(){
  // localStorage.playerObjectArray = [];
  if(localStorage.userName && !localStorage.playerObjectArray.includes(localStorage.userName)){
    console.log('creating new user object');
    new Player(localStorage.userName);
  }
};
Player.localStorageAlign();
//localStorageAlign
