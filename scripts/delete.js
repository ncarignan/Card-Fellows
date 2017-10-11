'use strict';

if (localStorage.playerObjectArray){
// Get userName + game info/Set globals
  var userName = localStorage.userName;
  var currentUser = null;
  var playerObjectArray = JSON.parse(localStorage.playerObjectArray);

  // Match userName with relevant player history
  for (var i = 0; i < playerObjectArray.length; i++){
    if(playerObjectArray[i].name === userName){
      currentUser = playerObjectArray[i];
    }
  };

  //Point to this; <button id="delete" type="button">
  var delEl = document.getElementById('delete');
  delEl.addEventListener('click', clearHistHandler);

  //Clear History!
  function clearHistHandler(){
    currentUser.wins = 0;
    currentUser.losses = 0;
    currentUser.ties = 0;
    currentUser.gamesPlayed = 0;
    currentUser.gameOutcome = [];
    for (var i = 0; i < playerObjectArray.length; i++){
      if(playerObjectArray[i].name === userName){
        playerObjectArray.splice(i, 1, currentUser);
      }
    };
    localStorage.playerObjectArray = JSON.stringify(playerObjectArray);
    location.reload();
  }
}
