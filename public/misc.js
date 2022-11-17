
function getMouseVector(){
	let mouseXalt = mouseX - turPosX;
	let mouseYalt = mouseY - turPosY;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}
	
function drawReticle(){
	noFill();
	strokeWeight(1.5);
	stroke(0, 100, 125, 125);
	ellipse(mouseX, mouseY, 20);
	stroke(80, 160, 200, 125);
	line(mouseX-14, mouseY-14, mouseX+14, mouseY+14);
	line(mouseX+14, mouseY-14, mouseX-14, mouseY+14);
	stroke(80, 160, 200, 125);
	line(turPosX, turPosY, mouseX, mouseY);
}

function gameOver(){
	push()
	
	print("DED");
	noStroke();
	fill(20)
	rect(0,200,600,200)
	
	textFont('Georgia');
	textAlign(CENTER);
	textSize(50);
	fill(170,20,20);
	text("YOU DIED",300,300)
		
	textFont('Helvetica');
	textSize(18);
	fill(235);
	let scoreString = "score: " + score;
	text(scoreString, 300, 340);
	
	if (score > highScore) {
		highScore = score;
		Cookies.remove('highscore');
		Cookies.set('highscore', highScore);
	}
	
	let highScoreString = "highscore: " + highScore;
	text(highScoreString, 300, 360);
	
	Retry.show();
	Retry.position(250, 380);
	Retry.size(100,30);
	Retry.style('background-color', '#202020');
	Retry.style('color', '#FFFFFF');
	Retry.mousePressed(reset);
	
	pop();
	noLoop();
	
}

function reset(){
	Retry.hide();
	bulletsFired = [];
	targetBalloons = [];
	turPosX = 300;
	turPosY = 300;
	targetTimer = 0;
	balloonSpawnMultiplier = 2;
	balloonSizeMultiplier = 2;
	score = 0;
	
	loop();
}

// Utilitys

function colisionbetweenRect(a,b) {
  var rect1 = a;
  let x = rect1.x - (rect1.width / 2);
  let y = rect1.y - (rect1.height / 2);
  var rect2 = b;

  if (x < rect2.x + rect2.width &&
    x + rect1.width > rect2.x &&
    y < rect2.y + rect2.height &&
    y + rect1.height > rect2.y) {
      return true;
  } else {
    return false;
  }
}

function colisionbetween(a,b) {
  var circle1 = {
    radius: a.r * 0.45, 
    x: a.x, 
    y: a.y
  };
  var circle2 = {
    radius: b.r * 0.45, 
    x: b.x, 
    y: b.y
  };

  var dx = circle1.x - circle2.x;
  var dy = circle1.y - circle2.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.radius + circle2.radius) {
      return true;
  } else {
     return false;
  }

}

function setClima(c) {
  let cl;
  switch(c) {
    case 'default':
     return clima = color(255, 182, 0, 0 );
    case 'day':
     return clima = color(255, 182, 0, 40 );
    case 'night':
     return clima = color(7, 59, 76, 40 );
    case 'winter':
     return clima = color(0, 180, 216, 40 );
    default:
     return color(255, 182, 0, 40 );
  }
}



// let fish;
//     function preload() {
//         fish = loadImage('earth_sm.jpg');
//     }

//     function setup() {
//         createCanvas(600, 600);
//     }

//     function draw() {
//         background(0);
//         var imgx = 300;
//         var imgy = 300;
//         var angle = atan2(mouseY - imgy, mouseX - imgx);
//         push();
//         translate(imgx, imgy);
//         rotate(angle);
//         imageMode(CENTER);
//         image(fish, 0, 0, 80, 50)
//         pop();
//     }