function Enemy(){
  this.r = 25;
  this.x = 0+this.r;
  this.y = 0+this.r;
  this.chance = random(0,1);
  console.log(this.chance);
  if (this.chance <= 0.10){
    this.speed = 6;
    this.r = 15;
    this.red = 0;
    this.green = 0;
    this.blue = 255;
  } else {
    this.speed = 3;
    this.red = 255;
    this.green = 0;
    this.blue = 0;
  }
  this.show = function(){
    fill(this.red,this.green,this.blue);
    stroke(128,0,0);
    circle(this.x,this.y,this.r);
  }
  this.moveToPlayer = function(playerX,playerY){
    let dirPLayer = createVector(playerX- this.x, playerY- this.y).normalize();
    this.x += dirPLayer.x * this.speed;
    this.y += dirPLayer.y * this.speed;


    


    //if (playerY < this.y){
    //  this.y += -1*this.speed;
    //} else if (playerY > this.y) {
    //  this.y += 1*this.speed;
    //}
    //if (playerX < this.x){
    //  this.x += -1*this.speed;
    //} else if (playerX > this.x){
    //  this.x += 1*this.speed;
    // }
  }
  /*
  this.clicked = function(mX,mY){
    if (dist(mX,mY,this.x,this.y) <= this.r){
      return true;
    }
    return false;
  }
  */
}