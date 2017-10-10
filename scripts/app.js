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
var signIn = document.getElementById('sign-in');
var entry = document.getElementById('entry');

if (localStorage.userName) {
  var userName = localStorage.userName;
  doStuff();
} else {
  userName = null;
}

entry.addEventListener('click', function(){
  signIn.style.display = 'block';
  list.style.display = 'none';
  paragraph.style.display = 'none';
});

learn.addEventListener('click', function(){
  paragraph.style.display = 'block';
  list.style.display = 'none';
  signIn.style.display = 'none';
});

rules.addEventListener('click', function(){
  list.style.display = 'block';
  paragraph.style.display = 'none';
  signIn.style.display = 'none';
});

function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
}

function handleChange() {
  login.style.display = 'block';
  welcome.style.display = 'none';
  start.style.display = 'none';
  changeUser.style.display = 'none';
  welcome.innerHTML = null;
}

function handleLogin(e) { ////when button is clicked, add username to local storage AND show Get Started button
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
