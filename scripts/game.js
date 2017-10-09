'use strict';


function Card(name, suit, value){
  this.name = name;
  this.suit = suit;
  this.value = value;
  Card.all.push(this);
}
Card.all = [];

var valueArray = [2,3,4,5,6,7,8,9,10,10,10,10,11];

var nameArray = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];

for(var i in valueArray){
  new Card(nameArray[i], 'Heart', valueArray[i]);
  new Card(nameArray[i], 'Diamond', valueArray[i]);
  new Card(nameArray[i], 'Spade', valueArray[i]);
  new Card(nameArray[i], 'Club', valueArray[i]);
}

function Player(name){
  this.name = name;
  this.hand = [];
  this.wins = 0;
  this.losses = 0;
  this.tie = 0;
  this.games = this.wins + this.losses + this.ties;

}
Player.users = [];

//localStorageAlign
function localStorageAlign(){
  localStorage.userName = 'sam';
  localStorage.usersArray = [];
  if(localStorage.userName && !localStorage.usersArray.includes(localStorage.userName) ){
    console.log('creating new user');
    new Player(localStorage.userName);

  }
}
localStorageAlign();
