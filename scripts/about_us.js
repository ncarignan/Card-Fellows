'use strict';

var field = document.getElementById('field');
var terminal = document.getElementById('terminal');
var tearaway = document.getElementById('tearaway');
var terminalprompt = document.getElementById('terminalprompt');

terminalprompt.textContent = '/card_fellows/users/' + localStorage.userName + '/ $:';

window.onscroll = function(){
  if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
    tearaway.innerHTML = '';
    document.getElementById('field').focus();
  }
};

terminal.addEventListener('submit',function(event){
  event.preventDefault();
  var input = event.target.field.value;
});
