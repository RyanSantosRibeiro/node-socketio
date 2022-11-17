var players = [];
var bullets = [];
var mobs = [];
var skills = [];
var changedPlayer = false;

var servers = ['SA','NA','RU'];

function Player(id, x, y, char, map = 0) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.char = char;
  this.map = map;
}

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  // console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

setInterval(updatePlayers, 33);

function updateRoom(room , player) {
  io.to(room).emit('updateRoom', player);
}

function updatePlayers() {
  if(changedPlayer) {
  io.sockets.emit('updatePlayers', players);
  changedPlayer = false;

    for(p of players) {
      p.bullets = [];
    }
  }
}

function updateBullets() {
  io.sockets.emit('updateBullets', bullets);
  bullets = [];
}

function updateMobs() {
//  console.log(mobs);
 io.sockets.emit('updateMobs', mobs);
}


io.sockets.on('connection', function(socket) {

     socket.on('ping', function (data) {
        var ping = ch.spawn('ping', [data]);
        ping.stdout.on("data", function (data) {
            socket.emit("pong", data.toString());
        });

    });

    // Login
    socket.on('login_req', function(data) {
    //  valida login e password
     socket.emit('login_res', socket.id);
    });

    // Start
    socket.on('start', function() {
     let setup = {
       id: socket.id,
       char: 0,
       map: 0
     };
      console.log(setup);
     socket.emit('identifierPlayer', setup);
    });

    socket.on('toMap', function(data) {
      // for(server of servers) {

      // }
      console.log(data.toMap);
      socket.emit('map', data.toMap);
      socket.join(servers[0]);
      updateRoom(servers[0],data);
    });

    // Update functions

    socket.on('newBullet', function(data) {
      let b = data;
      b.id = socket.id;
      bullets.push(b);
      
      updateBullets();
    });

    socket.on('addPlayer', function(data) {
    //  console.log('NEW PLAYER:');
    });

    socket.on('getPlayers', function(data) {
     socket.emit('setPlayers', players);
    //  console.log(players);
    });

    // Player

    socket.on('updatePlayer', function(data) {
      let player = new Player(data.x, data.y, data.char, data.map);
      player.id = socket.id;
      // console.log(player.id);
      // console.log('.....');
      
     for([i,p] of players.entries()) {
       if(p.id == socket.id) {
          players[i] = player;
       }
     }

     changedPlayer = true;
    });

    // bullets

    // Mobs 

    socket.on('mobDamage', function(data) {
     let keepMobs = [];
    //  console.log(data);
     for([i,m] of mobs.entries()) {
        if(m.id == data.id) {
            mobs[i].life -= data.damage;
        }

        if(m.life > 0) {
          keepMobs.push(mobs[i]);
        }
     }

     mobs = keepMobs;

      updateMobs();
    });

    socket.on('disconnect', function() {
     // console.log('Client has disconnected');
      
     for([i,p] of players.entries()) {
       if(p.id == socket.id) {
          players.splice(i, 1);
       }
     }

     changedPlayer = true;
    });
  }
);


//  let mob = {
    //    id: `mob${mobs.length}`,
    //    x: 50,
    //    y: 50,
    //    life: 1000
    //  }
    //   mobs.push(mob);
    //   updateMobs();