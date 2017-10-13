'use strict';

if(localStorage.themes){
  var themes = JSON.parse(localStorage.themes);
}else{
  themes = {};
}

var field = document.getElementById('field');
var terminal = document.getElementById('terminal');
var tearaway = document.getElementById('tearaway');
var terminalprompt = document.getElementById('terminalprompt');

terminalprompt.textContent = '/card_fellows/users/' + localStorage.userName + '/ $:';

window.onscroll = function(){
  if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
    tearaway.innerHTML = '';
    field.focus();
  }
};

terminal.addEventListener('submit',function(event){
  event.preventDefault();
  var input = event.target.field.value;
  switch (input) {
  default:
    window.location.href = '../index.html';
    break;
  case 'theme light':
    themes[localStorage.userName] = 'light.css';
    localStorage.themes = JSON.stringify(themes);
    window.location.href = 'about_us.html';
    break;
  case 'theme peach':
    themes[localStorage.userName] = 'peach.css';
    localStorage.themes = JSON.stringify(themes);
    window.location.href = 'about_us.html';
    break;
  case 'theme night':
    themes[localStorage.userName] = 'night.css';
    localStorage.themes = JSON.stringify(themes);
    window.location.href = 'about_us.html';
    break;
  case 'theme green':
    themes[localStorage.userName] = 'green.css';
    localStorage.themes = JSON.stringify(themes);
    window.location.href = 'about_us.html';

  }
});
