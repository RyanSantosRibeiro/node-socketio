

//   socket = io.connect('https://ProjectIO2.andreyexe.repl.co');
//   // socket.on('heartbeat', function(data) {
//   //   // console.log(data);
//   //   players = data.dataPlayers;
//   //   // otherSkills = data.dataSkills;

// Player
var socket;
var player;
var playerID;
var players = [];

// Acessorios 
var bullets = [];
var zoom;
var mapGame = null;
var maps = [];
var chars = [];
var guns = [];

var clima = 0;

var aux3D = 22;

let bgImage = [];
let wallImage = [];

let imagesGame = [];



var skins = [];
var skinPlayers = [];

var skin;

var mobs = [];
var cacto;
var bonecote;
var enemy;
var score = 0;

// Game
var room = 'home';
var screen = 'menu';
var hud = 'menu';
var ping = 0;

var btnMenu;
var inputMenu; 

var gameLoaded = false;

function preload() {
  fontPixel = loadFont('assets/fonts/pixel.ttf');
  // bg = loadImage('/../assets/image/base/bgBase.png');

  imagesGame.push(
    loadImage('/../assets/image/bullet.png')
  )

  bgImage.push(
    {
      bg: loadImage('/../assets/image/base/bgBase1.png')
    }
  )

  wallImage.push(
    loadImage('/../assets/image/base/wallTopsite.png')
  )

  skins.push(
    {
    title: 'Default',
    name: 'player0',
    src: '/../assets/image/player/player0.gif',
    width: 25,
    height: 32,
    position: [
      [
        loadImage('/../assets/image/player/player0.gif'),
        loadImage('/../assets/image/player/player1.gif'),
      ],
      [
        loadImage('/../assets/image/player/player0.gif'),
        loadImage('/../assets/image/player/player1.gif'),
      ]
    ],
    img: loadImage('/../assets/image/player/player0.gif')
  }
  )
}

function setup(){
  createCanvas(windowWidth - 10, windowHeight -10);
  socket = io.connect('https://ProjectIO2.andreyexe.repl.co');

  // enemy = new Enemy();
  // textSize(20);
  
  

  socket.emit('ping');
  socket.on('pong', function(data){
    ping = data;
  });

  loadSetupMenu();

  // switch(screen) {
  //   case 'game':
  //     return 
  //   case 'menu':
  //     return loadSetupMenu();
  //   default:
  //     return false;
  //   break;
  // }
} 

function updateClient() {
}

function getScreen(screen) {
  switch(screen) {
    case 'game':
      return screenGame();
    case 'menu':
      return screenMenu();
    default:
      return false;
    break;
  }
}

function keyPressed(a) {
  // console.log(keyCode);
  // console.log(a);
  player.events(keyCode);
  // return keyCode;
}

function draw(){
  clear();
  getScreen(screen);

}

function mouseReleased () {
  // console.log('clicquei');
}

// function mousePressed(){
//   switch(screen) {
//     // case 'game':
//       // return mousePressedGame();
//     case 'menu':
//       return mousePressedMenu();
//     default:
//       return false;
//     break;
//   }
// }

function Bullet(X,Y,PX,PY ,id = ''){
    this.id = id;
    this.status = true;
    this.damage = 10;
    this.speed = 10;
    this.dir = createVector((X-PX), (Y-PY)).normalize();
    this.x = PX + this.dir.x * 15;
    this.y = PY + this.dir.y * 15;
    this.originX = this.x;
    this.originY = this.y;
    this.r = 5;

    
    
    this.show = function(){
      fill(255,255,0);
      stroke(128,128,0);
      circle(this.x,this.y,this.r);
    }
    this.toMouse = function() {
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
    }
    this.onScreen = function() {
      let colidiuX = false;
      let colidiuY = false;
      if(this.x + this.r > mapGame.width || this.x - this.r < 0) {
        colidiuX = true;
      }

      if(this.y + this.r > mapGame.height || this.y - this.r < 0 - aux3D) {
        colidiuY = true;
      }

      if(colidiuX || colidiuY) {
        return false;
      } else {
        return true;
      }
    }
}

