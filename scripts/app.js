'use strict';

var learn = document.getElementById('learn'),
  paragraph = document.getElementById('paragraph');
var rules = document.getElementById('rules'),
  list = document.getElementById('list');

learn.addEventListener('click', function(){
  if (paragraph.style.display == 'none') {
    paragraph.style.display = 'block';
    list.style.display = 'none';
  } else {
    paragraph.style.display = 'block';
    list.style.display = 'none';
  }
}, false);

rules.addEventListener('click', function(){
  if (list.style.display == 'none') {
    list.style.display = 'block';
    paragraph.style.display = 'none';
  } else {
    list.style.display = 'block';
    paragraph.style.display = 'none';
  }
}, false);
