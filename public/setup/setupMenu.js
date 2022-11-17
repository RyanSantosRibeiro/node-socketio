// EVENTOS MENU 
function loadSetupMenu() {
  
    textAlign(CENTER);
  // -- //
  let inputMenu = createInput('');
  let name = '';
  inputMenu.position(width/2 - 60, height/2 - 1);
  inputMenu.size(118, 25);
  inputMenu.style('border-radius', '20px');

  // -- button -- \\
  let cor = color('#006466');
  let cor2 = color('#edf6f9');
  btnMenu = createButton('Jogar');
  btnMenu.style('background-color', cor);
  btnMenu.style('color', cor2);
  btnMenu.style('border-style', 'none');
  btnMenu.style('border-radius', '20px');
  btnMenu.style('cursor', 'pointer');
  btnMenu.position(width/2 - 55, height/2 - -30);
  btnMenu.size(115, 40);
  
  btnMenu.mousePressed(()=> {
     btnMenu.hide();
     inputMenu.hide();
     socket.emit('login_req', inputMenu.elt.value);
     loadSetupGame();
     screen = 'game'; 
     hud = 'game'; 
     
  });
  
}

function btnMenuPressed() {
  screen = 'game';
  return true;
}