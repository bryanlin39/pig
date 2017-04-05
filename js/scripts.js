$(document).ready(function(){
  //coin flip to determine first player
  var activePlayer = "";
  function coinFlip(){
    var flip = Math.ceil(Math.random() * 2);
    if (flip===1){
      activePlayer='player1';
      alert(activePlayer+' is first');
    }
    else if(flip===2&&cpuPlayer===true){
      activePlayer='player2'
      alert(activePlayer+' is first');
      hit();
    }
    else{
      activePlayer='player2'
      alert(activePlayer+' is first');
    }
  }
  //determines if player 2 is a human or cpu
  var cpuPlayer = false;
  $('#solo').click(function(){
    cpuPlayer = true;
    $('#howManyPlayers').hide();
    $('#results').show();
    coinFlip();
  });
  $('#double').click(function(){
    $('#howManyPlayers').hide();
    $('#results').show();
    coinFlip();
  });
  //resets the game on win or reset button
  function reset(){
    turnTotal = 0;
    activeTotal = 0;
    inactiveTotal = 0;
    activePlayer = "";
    $('#howManyPlayers').show();
    $('#results').hide();
    $('#player1-history').empty();
    $('#player2-history').empty();
    $('#player1-total').empty();
    $('#player2-total').empty();
  }
  //simulates d6 roll
  function diceRoll() {
    return Math.ceil(Math.random() * 6);
  }

  //script for players taking turns
  function swap(){
    //switch player totals
    var third = activeTotal;
    activeTotal = inactiveTotal;
    inactiveTotal = third;
    //switch active player
    console.log(activePlayer, cpuPlayer);
    if(activePlayer==='player1'&&cpuPlayer===true){
      activePlayer = 'player2';
      hit();
    }
    else if(activePlayer==='player1'){
      activePlayer = 'player2';
    }
    else{
      activePlayer = 'player1';
    }
  }

  //totals
  var turnTotal = 0;
  var activeTotal = 0;
  var inactiveTotal = 0;

  function hit(){
    // debugger
    var roll = diceRoll();
    var riskFactor = 20;

    if(inactiveTotal-activeTotal>20){
      riskFactor = 25;}
    else if(activeTotal-inactiveTotal>20){
      riskFactor = 10;
    }

    //expected value is good, hit
    if(roll!=1){
      turnTotal += roll;
      $('#'+activePlayer+'-history').append('<li>'+roll+'</li>');
      if(activePlayer==='player2'&&cpuPlayer===true&&(turnTotal+activeTotal)>=100){
        hold();
      }
      else if(activePlayer==='player2'&&cpuPlayer===true&&turnTotal<riskFactor){
        hit();
      }
      else if(activePlayer==='player2'&&cpuPlayer===true){
        hold();
      }
    }
    //bust
    else{
      turnTotal = 0;
      $('#'+activePlayer+'-history').append('<li>bust</li>');
      $('#'+activePlayer+'-total').text(activeTotal);
      swap();
    }
  }
  function hold(){
    activeTotal += turnTotal
    if(activeTotal>=100){
      alert('Congratulations '+activePlayer+', you win!!!!!');
    }
    turnTotal = 0;
    $('#'+activePlayer+'-history').append('<li>hold</li>');
    $('#'+activePlayer+'-total').text(activeTotal);
    swap();
  }

  $('#hit').click(function() {
    hit();
  });
  $('#hold').click(function(){
    hold();
  });
  $('#reset').click(function() {
    reset();
  });

  //90 and up
  //coin flip for first player




});
