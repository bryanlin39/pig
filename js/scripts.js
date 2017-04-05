$(document).ready(function(){

  function diceRoll() {
    return Math.ceil(Math.random() * 6);
  }

  var turnTotal = 0;
  var playerTotal1 = 0;
  var playerTotal2 = 0;

  function computerTurn(){
    var roll = diceRoll();
    var riskFactor = 20;

    if(playerTotal1-playerTotal2>20){
      riskFactor = 25;
    }
    else if(playerTotal2-playerTotal1>20){
      riskFactor = 10;
    }

    //expected value is good, hit
    console.log(riskFactor);
    if(roll!=1 && ((turnTotal/6)<(riskFactor/6))){
      turnTotal += roll;
      $('#computer-history').append('<li>'+roll+'</li>');
      computerTurn();
    }
    //risk is high, hold
    else if(roll!=1){
      playerTotal2 += turnTotal
      turnTotal = 0;
      $('#computer-history').append('<li>hold</li>');
      $('#computer-total').text(playerTotal2);
    }
    //rolled a 1, bust
    else{
      turnTotal = 0;
      $('#computer-history').append('<li>bust</li>');
      $('#computer-total').text(playerTotal2);
    }
  }

  $('#hit').click(function() {
    var roll = diceRoll();
    //expected value is good, hit
    if(roll!=1){
      turnTotal += roll;
      $('#player-history').append('<li>'+roll+'</li>');
      // rolled a 1, bust
    } else {
      turnTotal = 0;
      $('#player-history').append('<li>bust</li>');
      $('#player-total').text(playerTotal1);
      computerTurn();
    }
  });

  $('#hold').click(function(){
    playerTotal1 += turnTotal
    turnTotal = 0;
    $('#player-history').append('<li>hold</li>');
    $('#player-total').text(playerTotal1);
    computerTurn();
  });


  //ahead or behind
  //90 and up
  //coin flip for first player




});
