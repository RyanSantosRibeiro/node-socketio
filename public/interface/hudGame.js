function hudGame() {
  //Clima
  push();
    fill(clima);
    noStroke();
    quad(
        0, 0 ,
        width, 0,
        width, height,
         0 , height
    );
    pop();

  // Fundo
    push();
    fill(0, 0, 0 ,100);
    noStroke();
    quad(
        width, height - 60 ,
         0 , height - 60,
        0, height,
        width, height
    );
    if(mouseX > 0 && mouseX < width && mouseY > height - 60 && mouseY < height) {
      player.inventory.status = true;
    } else {
      player.inventory.status = false;
    }
    pop();


  // Vida
    push();
    textSize(16);
    fill(255);
    text(player.stamina_cld,10,90,50,50);
    pop();

    push();
    textSize(16);
    fill(255);
    text(player.stamina,10,120,50,50);
    pop();
    
    push();
    textSize(16);
    fill(255);
    text(hud,100,180,50,50);
    pop();
  

    let widthStatus = 350;
    let heightStatus = 10;
    
    let life = map(player.life,0,100,0,widthStatus);
    push();
    noStroke();
    fill(125, 17, 40);
    rect(10, 10, life, heightStatus, 50);
    pop();

    push();
    noFill();
    rect(10, 10, widthStatus, heightStatus, 50);
    pop();

    // Agua
    let water = map(player.water,0,100,0,widthStatus);
    push();
    noStroke();
    fill(0, 119, 182);
    rect(10, 25, water, heightStatus, 50);
    pop();

    push();
    noFill();
    rect(10, 25, widthStatus, heightStatus, 50);
    pop();

    // Fome
    let food = map(player.food,0,100,0,widthStatus);
    push();
    noStroke();
    fill(206, 90, 18);
    rect(10, 40, food, heightStatus, 50);
    pop();

    push();
    noFill();
    rect(10, 40, widthStatus, heightStatus, 50);
    pop();

    // Stamina
    let stamina = map(player.stamina,0,100,0,widthStatus);
    push();
    noStroke();
    fill(0, 90, 18);
    rect(10, 55, stamina, heightStatus, 50);
    pop();

    push();
    noFill();
    rect(10, 55, widthStatus, heightStatus, 50);
    pop();

    // Municao
    push();
    textSize(32);
    fill(255);
    text(player.gun_active.loaded, width - 90, height - 46,50,50);
    pop();

    // Municao
    push();
    textSize(18);
    fill(255);
    text('/' + player.gun_active.ammunition,width - 60, height - 35,50,50);
    pop();

    // Icone recarregar
    push();
    if(player.gun_active.loading) {
      let aux =  map(player.gun_active.cooldownLoad,0,player.gun_active.cooldownLoadMax - 1,0,-360);
      console.log(aux);
      angleMode(DEGREES);
      noFill();
      strokeWeight(1.2);
      stroke(255)
      arc(width - 93, height - 15, 17, 17, 0 - 90, aux - 90);

    }
    pop();

    // Portal count bar
    if(player.portal){

      let portal = map(player.portal_cld,0,180,0,width);
      push();
      noStroke();
      fill(241, 250, 238, 200);
      rect(0, height - 30, portal, 5);
      pop();

      push();
      noFill();
      noStroke();
      rect(0, height - 60, width, 5);
      pop();
    }

    // Inventory
    for(s of player.slots) {
      push();
      if(mouseX > s.x && mouseX < s.x + s.w && mouseY > s.y && mouseY < s.y + s.h) {
        fill(255,255,255,100);
        cursor(HAND);
      } else {
        noFill();
      }
      stroke(241, 250, 238, 200);
      rect(s.x, s.y, s.w, s.h, 3);
      pop();
    }



    // push();
    // imagesGame[0].resize( 25 , 25);
    // image(imagesGame[0],width - 78, height - 46);
    // pop();
}