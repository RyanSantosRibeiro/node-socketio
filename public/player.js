function Player(x,y, life = 100, id='', char = 0, gun1 = 0, gun2 = 0, position = 0, moviment = 0){
  this.id - id;
  this.name = '';
  this.life = life;
  this.food = 100;
  this.water = 100;
  this.stamina = 100;
  this.stamina_cld = 15;
  this.stamina_cld_st = false;
  this.x = x;
  this.y = y;
  this.r = 20;
  this.speed = 1.5;
  this.bullets = [];
  this.char = this.char;
  this.width = 0;
  this.height = 0;
  this.char_pos = char;
  this.position = position;
  this.moviment = moviment;
  this.gun_active = 0;
  this.portal = false;
  this.portal_cld = 180;
  this.inventory = {
    status: false,
    cld: 10,
    items: [],
    slots: []
  };

  this.loadInventory = function(){
    let s = [];

      for(let i=0; i<9;i++) {
        let data = {
         x : (10 + i * ((width * 0.8) / 9)),
         y : height - 50,
         w :  (width * 0.8) / 9 - 10 ,
         h : 40,
         item: null
        }
        s.push(data);
     }
    
    this.slots = s;
  }

  
  this.show = function(){
    if(hud == 'game'){
       cursor(CROSS);
    } else {
       cursor(ARROW);
    }
    let color = map(0,100,0,255, this.life);
    fill(color);
    stroke(0,128,0);
    // circle(this.x,this.y,this.r);
    line(0,0, this.x,this.y);
    // image(skin, this.x - skin.width / 2,this.y - skin.height/2);

    let s = this.char_pos;
    image(s, this.x - s.width / 2, this.y - s.height/2);
    push();
    rectMode(CENTER)
    // rect(this.x,this.y,this.width,this.height);
    pop();

    push();
    noFill();
    stroke(255);
      line(this.x,this.y +7 ,
          ((mouseX + (this.x - (width/2)))),
          ((mouseY + (this.y - (height/2))))
      );
    
    pop();

    // Vida
    // push()
    // textSize(12);
    // fill(255);
    // text(this.life,this.x - this.r,this.y + 10,50,50);
    // pop();

    // Nome 
    push();
    textSize(15);
    fill(255);
    text( 
      this.name,  
      this.x - 92 + this.r, 
      this.y - 30,
      150,
      50
    );
    pop();
  }

  this.move = function(atualX, atualY){
    this.dir = createVector(atualX-this.x, atualY-this.y).normalize()
    this.x += this.dir.x * this.speed;
    this.y += this.dir.y * this.speed;
  }
  //   this.constrain = function(mapGame){
  //   // this.x = constrain(this.x, 0, mapGame.width);
  //   // this.y = constrain(this.y, 0, mapGame.height);
  // }

  this.moveY = function(number){
    this.y += (number*this.speed);
  }
  this.moveX = function(number){
    this.x += (number*this.speed);
  }
  this.MovePlayer = function(mapGameF){
    let moved = false;
    let gun = this.gun_active;

    if (keyIsDown(UP_ARROW) || keyIsDown(87)){
      moved = true;
      if(this.position == 0) {
        this.char_pos = this.char.skinRm;
      } else {
        this.char_pos = this.char.skinLm;
      }
      if (this.y + (-1* (this.char.height/2)) + aux3D > 0) {
        this.moveY(-1);
        // console.log('alto');
      }
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){
      moved = true;
      if(this.position == 0) {
        this.char_pos = this.char.skinRm;
      } else {
        this.char_pos = this.char.skinLm;
      }
      if (this.y + (1*(this.char.height/2)) < mapGameF.height)
        this.moveY(1);
    }
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)){
      moved = true;
      this.char_pos = this.char.skinLm;
      if (this.x + (-1* (this.char.width/2)) > 0) {
        this.moveX(-1);
        this.position = 1;
        this.moviment = 1;
      }
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
      moved = true;
      this.char_pos = this.char.skinRm;
      if (this.x + (1* (this.char.width/2)) < mapGameF.width){
        this.moveX(1);
        this.position = 0;
        this.moviment = 1;
      }
    }

    if (keyIsDown(16) && this.stamina > 0){

        if(this.speed < 3) {
          this.speed += 1/20;
        }
        this.stamina -= 0.5;
        this.stamina_cld_st = true;
        this.stamina_cld = 15;
    } else {
      if(this.stamina_cld_st == true) {
        this.speed = 1.5;   

        if(this.stamina_cld > 0) {
          this.stamina_cld -= 0.5;      
        }

      }
    }

    if(this.stamina_cld == 0 && this.stamina <100) {
        this.stamina += 0.5;
    }  

    if(this.portal == true && this.portal_cld > 0) {
      this.portal_cld -= 1;
    }


    if(this.portal_cld == 0 && this.portal == true) {
      let data = {
        char: player.char.id,
        x: player.x,
        y: player.y,
        toMap: p.toMap
      }
      this.portal = false;
      console.log(data);
      socket.emit('toMap', data);
    }

    
    

    if (mouseX != this.x || mouseY != this.y) {
      
        // console.log(players);
    // console.log(gun);
      if(gun != 0 && gun.loaded > 0 && gameLoaded && gun.cooldown == 0 && mouseIsPressed && hud == 'game' && !this.inventory.status) {
        translate(this.x, this.y);
        let aux = (gun.qtdBullets/2) - gun.qtdBullets;
        // let dist = dist(mouseX,mouseY,this.x,this.y);

        // console.log(gun.loaded);

        let bulRem;

        if(gun.loaded >= gun.qtdBullets) {
          bulRem = gun.qtdBullets;
        } else {
          bulRem = gun.loaded;
        }

        for(let i=0; i < bulRem; i++) {
        // console.log(i);
        // console.log(gun.qtdBullets);

          // let angle = this.angle;
        // let aux2 = map(aux,0,dist,0,gun.angle);

          let x;
          let y;
        if(mouseX < width /2 && mouseY < height/2) {
           x = ((mouseX + (this.x - (width/2))) + aux * 3);
           y = ((mouseY + (this.y - (height/2))) - aux * 3); 
        } else if(mouseX > width/2 && mouseY > height/2){
           x = ((mouseX + (this.x - (width/2))) - aux * 3);
           y = ((mouseY + (this.y - (height/2))) + aux * 3); 
        } else {
           x = ((mouseX + (this.x - (width/2))) + aux * 3);
           y = ((mouseY + (this.y - (height/2))) + aux * 3); 
        }

          // let x = ((mouseX + (this.x - (width/2))) + aux * 3);
          // let y = ((mouseY + (this.y - (height/2))) + aux * 3); 
          let mX = this.x;
          let mY = this.y;

          bullets.push( new Bullet(x,y,mX,mY, this.id, gun.range ) );
          aux += 1;
          
          gun.loaded -= 1;
          

          // console.log("POLayer:" + this.x + ' ' +this.y);
          // console.log('Mouse'+ mouseX+ ' '+ mouseY);
          
          // console.log(bullets);
          let data = {
            x,
            y,
            playerX: this.x,
            playerY: this.y,
            range: gun.range
          }

          // console.log(data);
          socket.emit('newBullet', data);
        } 

        gun.cooldown = gun.cooldownMax;
    }    
  }

    if(!moved){
      this.moviment = 0; 

      if(this.position == 0) {
        this.char_pos = this.char.skinR;
      } else {
        this.char_pos = this.char.skinL;
      }
    }

    return moved;
  }

  this.events = function(key){
    // let key = keyPressed();
    console.log(key);
    // Inventory
    if (key == 73) {
      if(!this.inventory.status) {
        hud = 'inventory';
        this.inventory.status = true;
      } else {
        hud = 'game';
        this.inventory.status = false;
      }
    }

    // Reload
    if (key == 82){
      this.life -= 1;
      this.gun_active.reload();
    }

    // Change gun
    if (key == 81) {
      if(this.char.gun1.equiped) {
        this.char.gun1 = this.gun_active;
        this.char.gun1.equiped = false;
        this.char.gun2.equiped = true;
        this.gun_active = this.char.gun2;
      } else {
        this.char.gun2 = this.gun_active;
        this.char.gun2.equiped = false;
        this.char.gun1.equiped = true;
        this.gun_active = this.char.gun1;
      }
      this.gun_active_cld = 16;
    }

    
  }

  this.damage = function(number){
    this.life -= number;
    // console.log(deltaTime);
  }
}