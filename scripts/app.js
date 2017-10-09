'use strict';

var learn = document.getElementById('learn'),
  paragraph = document.getElementById('paragraph');

learn.addEventListener('click', function(){
  if (paragraph.style.display == 'none') {
    paragraph.style.display = 'block';
  } else if (paragraph.style.display == 'block') {
    paragraph.style.display = 'none';
  } else {
    paragraph.style.display = 'block';
  }
}, false);


var rules = document.getElementById('rules'),
  list = document.getElementById('list');

rules.addEventListener('click', function(){
  if (list.style.display == 'none') {
    list.style.display = 'block';
  } else if (list.style.display == 'block') {
    list.style.display = 'none';
  } else {
    list.style.display = 'block';
  }
}, false);
