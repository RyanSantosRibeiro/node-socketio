function Character(id,name, width,height, gun1,gun2, skinL, skinR, skinLm, skinRm) {
  this.id = id;
  this.name = name;
  this.width = width;
  this.height = height;
  this.gun1 = gun1;
  this.gun2 = gun2;
  this.skinL = skinL;
  this.skinR = skinR;
  this.skinLm = skinLm;
  this.skinRm = skinRm;
}

function loadCharacter(i) {
    let jack = new Character(
      0,
      'Jack',
      20,
      30,
      guns[0],
      guns[1],
      loadImage("/assets/image/player/player1.gif", function(loadedImage) {
        img = loadedImage;
      }),
      loadImage("/assets/image/player/player0.gif", function(loadedImage) {
        img = loadedImage;
      }),
      loadImage("/assets/image/player/player3.gif", function(loadedImage) {
        img = loadedImage;
      }),
      loadImage("/assets/image/player/player2.gif", function(loadedImage) {
        img = loadedImage;
      })
    );

    let bob = new Character(
      1,
      'Bob',
      20,
      30,
      guns[1],
      guns[1],
      loadImage("/assets/image/player/player0.gif", function(loadedImage) {
        img = loadedImage;
      }),
      loadImage("/assets/image/player/player1.gif", function(loadedImage) {
        img = loadedImage;
      }),
      loadImage("/assets/image/player/player3.gif", function(loadedImage) {
        img = loadedImage;
      }),
      loadImage("/assets/image/player/player2.gif", function(loadedImage) {
        img = loadedImage;
      })
    );

  chars.push(jack);
  chars.push(bob);
}

