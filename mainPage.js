var playerMath;

var blobs = [];
var zoom = 1;
var radius = 16;
var overLap = true;

function setup() {
  createCanvas(1280, 720);
  playerMath = new mathPlayer(0, 0, radius * 1.5);
  var i = 0;
  var x = random(-width, width);
  var y = random(-height, height);
  blobs[i] = new Blob(x, y, radius);

  i += 1;
  while (i != 400) {
      x = random(-width, width);
      y = random(-height, height);

      for (var j = 0; j < i; j++) {
          var posX = blobs[j].pos.x;
          var posY = blobs[j].pos.y;
          var dis = dist(posX, posY, x, y);
          if (dis <= radius * 2) {
              overLap = true;
              break;
          } else {
              overLap = false;
          }
      }
      if (!overLap) {
          blobs[i] = new Blob(x, y, radius);
          i++;
      }

  }

}

function draw() {

    background(200, 120, 123);
    translate(width / 2, height / 2);
    var newzoom = 40 / playerMath.r;
    zoom = lerp(zoom, newzoom, .5);
    scale(zoom);
    translate(-playerMath.pos.x, -playerMath.pos.y);

    for (var i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show();
        if (playerMath.eats(blobs[i])) {
            blobs.splice(i, 1);

        }
    }

    if (playerMath.pos.x < -1.3 * width) {

        playerMath.pos.x = 1660;
        translate(-playerMath.pos.x, -playerMath.pos.y);
    } else if (playerMath.pos.y < -1.3 * height) {
        playerMath.pos.y = 900;
        translate(-playerMath.pos.x, -playerMath.pos.y);

    }
    if (playerMath.pos.x > 1.3 * width) {

        playerMath.pos.x = -1660;
        translate(-playerMath.pos.x, -playerMath.pos.y);
    } else if (playerMath.pos.y > 1.3 * height) {

        playerMath.pos.y = -900;
        translate(-playerMath.pos.x, -playerMath.pos.y);


    }
    playerMath.update();
    playerMath.showPlayer();


}
