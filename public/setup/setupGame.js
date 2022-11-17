// EVENTOS DE GAME

function loadSetupGame() {
  loadMaps();
  loadGuns();
  loadCharacter();
  setClima('default');
  console.log(clima);
  
  cacto = new Cacto(50,50);
  

  socket.emit('start');

  socket.on('identifierPlayer', function(setup) {
    mapGame = maps[setup.map]; 
    console.log(mapGame);
    player = new Player(mapGame.spawn.x, mapGame.spawn.y);
    player.char = chars[setup.char];
    player.char_pos = player.char.skinR;
    player.gun_active = player.char.gun1;
    player.char.gun1.equiped = true;
    player.height =  player.char.height;
    player.width =  player.char.width;
    player.id =  setup.id;
    playerID =  setup.id;
    player.loadInventory();
    console.log(player);
  });

  socket.on('map', function(data) {
    console.log(data);
    mapGame = maps[data];
    player.x = mapGame.spawn.x;
    player.y = mapGame.spawn.y;
  });

  // socket.on('newPlayerRoom', function(map) {
    
  // });
  

  socket.on('updatePlayers', function(data) {
    skinPlayers = [];
    players = data; 

    for(p of players) {
      skinPlayers.push(
        {
          id: p.id,
          skin: skins[p.skinPlayer].position[p.position]
        }
      )
    }


    // console.log(data);
  });

  socket.on('updateMobs', function(data) {
    let keepMobs = [];

    for(m of data) {
      let existe = false;

      for(let i=0; i<mobs.length; i++) {
        if(mobs[i].id == m.id) {
          if(m.life > 0) {
            mobs[i].life = m.life;
            existe = true;
            keepMobs.push(mobs[i]);
          }
        }
      }

      if(!existe) {
        mobs.push(new Bonecote(m.x,m.y,m.life, m.id));
      }
    }

    mobs = keepMobs;
  });

  socket.on('updateBullets', function(data) {
    for(b of data) {
      if(b.id != playerID) {
        bullets.push(new Bullet(b.x,b.y,b.playerX,b.playerY, b.id, b.range));
      }  
    }
  });
  

}

// function mousePressedGame() {
  
// }
