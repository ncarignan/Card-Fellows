'use strict';

if(localStorage.themes){
  var themes = JSON.parse(localStorage.themes);
}else{
  themes = {};
}

if(themes[localStorage.userName]){
  var themeLink = document.getElementById('theme');
  switch (window.location.pathname.split[window.location.pathname.split.length - 1]) {
  case 'about_us.html':
  case 'game.html':
  case 'stats.html':
    themeLink.href = '../styles/colors/' + themes[localStorage.userName];
    break;
  case 'index.html':
  default:
    themeLink.href = 'styles/colors/' + themes[localStorage.userName];
  }
}
