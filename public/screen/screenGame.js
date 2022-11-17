function screenGame(){
  // background('#081400');
  // background(bgImage[mapGame.bg].bg);
  background(41);

  if(!player || !mapGame) {
    return false;
  }
  
  // FIXOS NO MAPA 
  push();
  translate(width / 2, height / 2);
  // zoom = 0.8;
  // translate(-player.x * zoom, -player.y * zoom);
  translate(-player.x, -player.y);


  // background
  // console.log(wallImage);
    if(mapGame.bg != null) 
      image(bgImage[mapGame.bg].bg, 0,0);
    if(mapGame.walls != []) 
      for( w of mapGame.walls) {
        image(wallImage[w.index], 0, -wallImage[w.index].height);

      }
    if(mapGame.portals != [])  
      for( p of mapGame.portals) {
        push();
        fill(0, 119, 182);
        rect(p.x, p.y, p.width, p.height);
        pop();

        if(colisionbetweenRect(player,p)) {
          // mapGame.portals[0].x = 50;
          player.portal = true;
        } else {
          player.portal = false;
          player.portal_cld = 180;
        }

      }



    line(0, 0, mapGame.width, 0);
    line(0, 0, 0, mapGame.height);
    line(mapGame.width, 0, mapGame.width, mapGame.height);
    line(0, mapGame.height, mapGame.width, mapGame.height);


  //  var newzoom = 40 / 20;
  //  zoom = lerp(zoom, newzoom, 0.5);
  //  scale(zoom);

  // Objetos
  cacto.show();

  let keepbullets = []
  let anyhit = false;
  for (let i=0; i < bullets.length; ++ i) {
      bullets[i].toMouse();
      //console.log(bullets[i]);
      // let hit = dist(bullets[i].x, bullets[i].y, enemy.x, enemy.y) <= enemy.r;
      // anyhit = anyhit || hit;

      // Se hita players
      let hitPLayer = false;

      for(p of players) {
        hitPLayer = colisionbetween(p,bullets[i]);
        
        
        
        if(hitPLayer && player.id != bullets[i].id) {
          if(p.id == player.id) {
            player.damage(bullets[i].damage); 
            socket.emit('updatePlayer', player);
          } 
          bullets[i].status = false;
        }
      }

      // Se hitar mob
      let hitMob = false;

      for(m of mobs) {
        hitMob = colisionbetween(m,bullets[i]);
        
        
        if(hitMob) {
          let data = {
            id: m.id,
            damage: bullets[i].damage
          }
          socket.emit('mobDamage', data);
          
          bullets[i].status = false;
        }
      }


      let distance = dist(bullets[i].originX, bullets[i].originY, bullets[i].x, bullets[i].y);
      
      if (bullets[i].onScreen() && bullets[i].status && distance < player.gun_active.range ) {
          keepbullets.push(bullets[i]);
          bullets[i].show();
      }
  }

  bullets = keepbullets;

  //Player
  player.show();
  // player.constrain(mapGame);
  
  if(player.MovePlayer(mapGame)) {
    let data = {
      x: player.x,
      y: player.y,
      char: player.char.id,
      map: mapGame.id
    };
    socket.emit('updatePlayer', data);
  }


 //Outros Players
      // console.log(players);
      
  for(p of players ){
    if(playerID != p.id && p.life > 0) {
      let color = map(0,100,0,255, p.life);
      fill(color);
      stroke(0,128,0);
      // circle(p.x,p.y,p.r);

      
      // console.log(skins);
      // console.log(sp);
      image( spm, p.x - spm.width / 2,p.y - spm.height/2);

      // fill(200);
      // quad(p.x, p.y, 
      //   p.x + sp.widt, p.y, 
      //   p.x , p.y + sp.height, 
      //   p.x + sp.width , p.y + sp.height, 
      // );

      // for(s of skinPlayers ) {
      // }

      

      push();
      textSize(12);
      fill(255);      
      text(p.life,p.x - p.r ,p.y+10,50,50);
      pop();

      push();
      textSize(15);
      fill(255);
      textAlign(CENTER);
      text( 
        p.name,  
        p.x - 92 + p.r, 
        p.y - 30,
        150,
        50
      );
      pop();
    }
  }

  // Mobs
  for(m of mobs) {
    m.move();
    m.show();
    m.constrain();
  }


  // fill(255);
  // stroke(0,128,0);
  // arc(50, 50, 80, 80, 10, mouseX, OPEN);

  if (anyhit) {
      enemy = new Enemy();
      score += 100;
  }

  if(player.life <= 0) {
    loadSetupMenu();
    player.life = 100;
    screen = 'menu';
  }

  if(colisionbetween(player,cacto)) {
    if(cacto.id == player.id) {
      if(cacto.cooldown == 0) {
          player.damage(cacto.damage); 
          
          socket.emit('updatePlayer', player);
          cacto.cooldown = 80;
      }
    } 
  } else {
    cacto.cooldown = 0;
  }

  if(cacto.cooldown != 0){
    cacto.cooldown -= 1;
  }

  if(player.gun_active.cooldown != 0){
    player.gun_active.cooldown -= 1;
  }

  if(player.gun_active.loading){
    if(player.gun_active.cooldownLoad != 0){
      player.gun_active.cooldownLoad -= 1;
    }
    player.gun_active.reload();
  }

  pop();

  // FIXOS NA TELA
  // fill(255);
  // text(ping,10,20,50,50);
   hudGame();

   if(player.inventory.status) {
    //  inventory();
   }

        push();
        var imgx = width/2;
        var imgy = height/2;
        var angle = atan2(mouseY - imgy, mouseX - imgx);
        translate(imgx, imgy + 7);
        rotate(angle);
        rectMode(CENTER);
        fill(0, 119, 182);
        // rect( 5, 0, 30, 10);
        pop();

        // var imgx = 300;
//         var imgy = 300;
//         var angle = atan2(mouseY - imgy, mouseX - imgx);
//         push();
//         translate(imgx, imgy);
//         rotate(angle);
//         imageMode(CENTER);
//         image(fish, 0, 0, 80, 50)
//         pop();

    gameLoaded = true;
  return true;
} 