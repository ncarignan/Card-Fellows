'use strict';


var learn = document.getElementById('learn');
var paragraph = document.getElementById('paragraph');
var rules = document.getElementById('rules');
var list = document.getElementById('list');
var login = document.getElementById('login');
var start = document.getElementById('get-started');
var welcome = document.getElementById('welcome');
var changeUser = document.getElementById('change-user');
var play = document.getElementById('play');
var scores = document.getElementById('scores');

if (localStorage.userName) {
  console.log('sfsdf');
  var userName = localStorage.userName;
  doStuff();
} else {
  userName = null;
}

learn.addEventListener('click', function(){
  if (paragraph.style.display == 'none') {
    paragraph.style.display = 'block';
    list.style.display = 'none';
  } else {
    paragraph.style.display = 'block';
    list.style.display = 'none';
  }
});

rules.addEventListener('click', function(){
  if (list.style.display == 'none') {
    list.style.display = 'block';
    paragraph.style.display = 'none';
  } else {
    list.style.display = 'block';
    paragraph.style.display = 'none';
  }
});

function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

function handleChange() {
  login.style.display = 'block';
  welcome.style.display = 'none';
  start.style.display = 'none';
  changeUser.style.display = 'none';
  welcome.innerHTML = null;
}


////when button is clicked, add username to local storage AND show Get Started button

function handleLogin(e) {
  e.preventDefault();
  userName = e.target.username.value;
  localStorage.userName = userName;
  doStuff();
}

function doStuff() {
  login.style.display = 'none';
  start.style.display = 'block';
  newElement('h2', 'Welcome, ' + userName + '!', welcome);
  changeUser.style.display = 'block';
  welcome.style.display = 'block';
  play.style.display = 'block';
  scores.style.display = 'block';
}

changeUser.addEventListener('click', handleChange);
login.addEventListener('submit', handleLogin);
