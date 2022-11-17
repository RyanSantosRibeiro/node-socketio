function screenMenu() {
  
  if(inputMenu != undefined && btnMenu != undefined) {
    // inputMenu.show();
    // btnMenu.show();
    // let col = color(255, 255, 255, 50);
    //  btnMenu.style('background-color', col);
  }

  
  // ~ \\
  let gWidht = (width/2);
  let gHeight = (height/2); 
  //-------------//
  background(41);
  // boa boa, acho q ficou bom
  // deixa em cima assim kkkk
  // clica no texto ai rapidão kkkkk
  //-------------//
  textSize(50);
  fill(color(0, 110, 102));
  textFont(fontPixel);
  text('Survivor', gWidht - 20, gHeight - 80);
  //-------------//
  textSize(50)
  fill(color(20, 69, 82));
  text('Novaya', gWidht + 20, gHeight - 55);
  //-------------//
  textSize(21)
  fill(color(0, 100, 102));
  text('Username:', gWidht - 14, gHeight - 20);
  //-------------//

}

