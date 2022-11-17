function Projetil(key, playerX , playerY, destinoX , destinoY) {
  this.key = key;
  this.pos = createVector(playerX, playerY);
  this.vel = 2;
  this.dest = createVector(destinoX , destinoY);

  switch(key){
    case 'q':
    case 'Q':
      this.cor = 0;
    break;
    case 'w':
    case 'W':
      this.cor = 100;
    break;
    case 'e':
    case 'E':
      this.cor = 190;
    break;
    case 'r':
    case 'R':
      this.cor = 255;
    break;
  }

  this.update = function() {
    var newvel = createVector(destinoX - width / 2, destinoY - height / 2);
    newvel.div(50);
    //newvel.setMag(3);
    newvel.limit(1);
    // this.vel.lerp(newvel, 0.2);
    this.vel = newvel;
    this.pos.add(this.vel);
  };


  this.show = function() { //CRIA O Minion COM COR E TAMANHO
    fill(this.cor);
    console.log(playerX , playerY, this.dest.x , this.dest.y);
    console.log(player.pos.x, player.pos.y)
    rect(this.pos.x - 10 , this.pos.y - 10 , 20, 20);
  }
}


class skill{
	constructor(xSpd, ySpd, key){
		this.x = turPosX;
		this.y = turPosY;
		this.xSpd = 12*xSpd;
		this.ySpd = 12*ySpd;
    this.key = key;
    console.log(turPosX+ ' ' + turPosY);

    switch(this.key){
    case 'q':
    case 'Q':
      this.cor = 0;
    break;
    case 'w':
    case 'W':
      this.cor = 100;
    break;
    case 'e':
    case 'E':
      this.cor = 190;
    break;
    case 'r':
    case 'R':
      this.cor = 255;
    break;
  }
	}
	
	display(){
		push()
		stroke(230, 255, 0);
		fill(this.cor, this.cor, this.cor);
		ellipse(this.x, this.y, 40);
		pop();
	}
	
	update(){
		this.x += this.xSpd;
		this.y += this.ySpd;
		this.xSpd *= 0.994;
		this.ySpd *= 0.994;
	}
	
	
	
	hitScan(){
		for (var i = 0; i < targetBalloons.length; i++){
			var collideOrNot = collideCircleCircle(this.x, this.y, 10, targetBalloons[i].myX(), targetBalloons[i].myY(), targetBalloons[i].myR())
			if (collideOrNot){
				targetBalloons.splice(i,1);
				score += 1;
				return true;
			}
		}
		return false;
	}
}
 