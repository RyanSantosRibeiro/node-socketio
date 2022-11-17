function Bonecote(x,y,life, id=''){
  this.id = id;
  this.name = 'BONECOTE';
  this.life = life;
  this.x = x;
  this.y = y;
  this.r = 20;
  this.speed = 0.3;
  this.bullets = [];
  
  this.show = function(){
    let color = map(0,100,0,255, this.life);
    fill(color);
    stroke(0,128,0);
    circle(this.x,this.y,this.r);

    // Vida
    push()
    textSize(12);
    fill(255);
    text(this.life,this.x - this.r,this.y + 10,50,50);
    pop();

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

  this.move = function(number){
    let menorDistancia = 150;
    let agro = null;

    for(p of players) {
        let distance = dist(p.x,p.y,this.x,this.y);
        if( distance < menorDistancia) {
          agro = p;
          menorDistancia = distance;
        }
    }

      if(agro == null) {
        this.x += random(-1,1);
        this.y += random(-1,1);
      } else {

        let dirPLayer = createVector(agro.x- this.x, agro.y - this.y).normalize();
        this.x += dirPLayer.x * this.speed;
        this.y += dirPLayer.y * this.speed;
      }
  }


  this.constrain = function(number){
    this.x =constrain(this.x, 0, width);
    this.y =constrain(this.y, 0, height);
  } 

  this.damage = function(number){
    this.life -= number;
    console.log(deltaTime);
  }
}