function Maps(id,name, width,height,bgColor,bg, spawnX, spawnY, objects = [], walls = [], portals = []) {
  this.id = id;
  this.name = name;
  this.width = width;
  this.height = height;
  this.bgColor = bgColor;
  this.bg = bg;
  this.spawn = {
    x: spawnX,
    y: spawnY
  }
  this.objects = objects;
  this.walls = walls;
  this.portals = portals;
}

function loadMaps() {
  // BASE
  let baseMap = new Maps(
    0,
    "Base",
    500,
    250,
    '#582f0e',
    0,
    100,
    100,
    [],
    [
      {
        name: 'wallTopsite',
        index: 0,
        px: 0,
        py: 0,
      }
    ],
    [
      {
        x:480,
        y:100,
        width: 20,
        height: 50,
        toMap: 1
      }
    ]
  );

  maps.push(baseMap);

  // Jungle
  let jungleMap = new Maps(
    1,
    "Jungle",
    500,
    500,
    '#2d4d1a',
    null,
    100,
    100,
    [],
    [],
    [
      {
        x:480,
        y:100,
        width: 20,
        height: 50,
        toMap: 0
      }
    ]
  );

  maps.push(jungleMap);
}