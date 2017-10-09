'use strict';

function learn() {
  var learnMenu = document.getElementById('learntext');
  if (learnMenu.style.display === 'none') {
    learnMenu.style.display = 'block';
  } else {
    learnMenu.style.display = 'none';
  }
}

function rules() {
  var rulesMenu = document.getElementById('rulestext');
  if (rulesMenu.style.display === 'none') {
    rulesMenu.style.display = 'block';
  } else {
    rulesMenu.style.display = 'none';
  }
}
