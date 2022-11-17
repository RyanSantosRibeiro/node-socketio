function Gun(id, qtdBullets, angle , range , ammunition, loaded, cooldownMax, cooldownLoadMax, clip ){
  this.id = id;
  // this.x = x;
  // this.y = y;
  this.speed = 1;
  this.equiped = false;
  this.qtdBullets = qtdBullets;
  this.ammunition = ammunition;
  this.loaded = loaded;
  this.loadMax = loaded;
  this.angle = angle;
  this.range = range;
  this.bullets = [];
  this.cooldown = 0;
  this.cooldownMax = cooldownMax;
  this.cooldownLoad = cooldownLoadMax;
  this.cooldownLoadMax = cooldownLoadMax;
  this.clip = clip;
  this.loading = false;
  
  this.show = function(){
    let color = map(0,100,0,255, this.life);
    fill(color);
    stroke(0,128,0);
    circle(this.x,this.y,this.r);

    fill(255);
    text(this.life,this.x - this.r,this.y+10,50,50);
  }

  this.move = function(atualX, atualY){
    this.dir = createVector(atualX-this.x, atualY-this.y).normalize()
    this.x += this.dir.x * this.speed;
    this.y += this.dir.y * this.speed;
  }

  this.reload = function(){
    if(this.ammunition > 0 && this.loaded < this.loadMax) {
      this.loading = true;
      let toLoad;
      if(this.ammunition >= this.loadMax - this.loaded)
        toLoad = this.loadMax - this.loaded;
      else 
        toLoad = this.ammunition;1

      if(this.cooldownLoad == 0){

          if(toLoad >= this.clip) {
            console.log(this.clip);
            console.log(toLoad);
            console.log('------------');
            this.ammunition -= this.clip;
            this.loaded += this.clip;
          } else {
            this.ammunition -= toLoad;
            this.loaded += toLoad;
          }
        this.cooldownLoad = this.cooldownLoadMax;
      }
    } else {
     this.loading = false;
    }
  }
}

function loadGuns() {
  let shotgun_gun = new Gun(0,6, 20, 300, 36, 12, 80, 70 , 2);

  let m4_gun = new Gun(1,2, 4, 500, 50, 40, 8, 60, 40);

  guns.push(shotgun_gun);
  guns.push(m4_gun);
}