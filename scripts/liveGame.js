'use strict';

//declare button id's
var hitButton = document.getElementById('hitButton');
var playerHand = document.getElementById('playerhand');
var resetButton = document.getElementById('resetButton');

var calculator = document.getElementById('calculator');
var topRightHelper = document.getElementById('toprighthelper');
var bottomLeftHelper = document.getElementById('bottomlefthelper');

function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
} // I love you Sam

var card = {};
//print a card to the screen
card.printCard = function(){
  var outerDiv = document.createElement('div');
  var input = document.createElement('input');

  playerHand.appendChild(outerDiv);
  outerDiv.appendChild(input);
  for(var i = 0; i < 21; i++){
    if(!event.target['playerhand' + i]) {
      break;
    }
  }

  input.type = 'number';
  input.min = '1';
  input.max = '11';
  input.name = 'playerhand' + i;
  input.id = 'playerhand' + i;

  outerDiv.classList.add('outerbox');
  input.classList.add('innerbox');

};

var resetHandler = function(){
  location.reload();
};

function userGuideRules(event){
  event.preventDefault();
  console.log('Submit!');
  var playerTotal = 0;
  for(var i = 0; i < 21; i++){
    if(event.target['playerhand' + i]) {
      playerTotal += parseInt(event.target['playerhand' + i].value);
    }else{
      break;
    }
  }

  bottomLeftHelper.innerHTML = '';
  topRightHelper.innerHTML = '';

  if([2,3].includes(parseInt(event.target.dealerhand.value))){ // Dealer Card
    newElement('p', 'When the dealer has a 2 or a 3 showing, their odds of busting are about 36%. The player advantage percentage in this case is about 11%.', topRightHelper);
    if(playerTotal < 13){
      newElement('p', 'The probability of busting on a 12 is 31%. Anything lower than that is impossible to bust on. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit greater than 39%. You should stay!', bottomLeftHelper);// console.log('stay');
    }
  }
  if([4,5,6].includes(parseInt(event.target.dealerhand.value))){
    newElement('p', 'When the dealer has a 4, 5 or 6 showing, their odds of busting are about 41%. The player advantage percentage in this case is about 22%.', topRightHelper);
    if(playerTotal < 12){
      newElement('p', 'The probability of busting on a hit is 0%. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 31%. You should stay!', bottomLeftHelper);
    }
  }
  if([7,8,9].includes(parseInt(event.target.dealerhand.value))){
    newElement('p', 'When the dealer has a 7, 8 or 9 showing, their odds of busting are about 24%. The player advantage percentage in this case declines rapidly from 14% to -4%.', topRightHelper);
    if(playerTotal < 17){
      newElement('p', 'The probability of busting on a hit is less than 62%. However, there\'s a good chance the dealer will beat you if you don\'t. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 69%. You should stay!', bottomLeftHelper);
    }
  }
  if([10,11].includes(parseInt(event.target.dealerhand.value))){
    newElement('p', 'When the dealer has a card of value 10 or 11 showing, their odds of busting are about 21%, unless they have an ace. In this case their odds are busting are about 12%. The player advantage percentage in this case is about -17%.', topRightHelper);
    if(playerTotal < 17 ){
      newElement('p', 'The probability of busting on a hit is less than 62%. However, there\'s a good chance the dealer will beat you if you don\'t. You should hit!', bottomLeftHelper);
    }else{
      newElement('p', 'The probability of busting on a hit is greater than 69%. You should stay!', bottomLeftHelper);
    }
  }
}

calculator.addEventListener('submit', userGuideRules);
resetButton.addEventListener('click', resetHandler);

hitButton.addEventListener('click', function(){ card.printCard(); });
