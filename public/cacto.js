function Cacto(x,y, id=''){
  this.id - id;
  this.life = 10;
  this.damage = 90;
  this.cooldown = 0;
  this.x = x;
  this.y = y;
  this.r = 20;
  
  this.show = function(){
    fill(82, 183, 136);
    stroke(0,128,0);
    circle(this.x,this.y,this.r);
  }

  this.move = function(atualX, atualY){
    this.dir = createVector(atualX-this.x, atualY-this.y).normalize()
    this.x += this.dir.x * this.speed;
    this.y += this.dir.y * this.speed;
  }
} 