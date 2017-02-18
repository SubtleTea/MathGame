var blob;

var blobs = [];
var zoom = 1;
var radius = 16;
var overLap = true;

function setup() {

    createCanvas(1280, 720);
    blob = new Blob(0, 0, radius*1.5,true);
    var i = 0;
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, radius,false);
    
    i += 1;
    while (i != 400) {
        x = random(-width  , width);
        y = random(-height, height);

        for (var j = 0; j < i; j++) {
            var posX = blobs[j].pos.x;
            var posY = blobs[j].pos.y;
            var dis = dist(posX, posY, x, y);
            if ( dis <= radius*2) {
                overLap = true;
                break;
            } else {
                overLap = false;
            }
        }
        if (!overLap) {
            blobs[i] = new Blob(x, y, radius,false);
            i++;
        }

    }
}

function draw() {
    background(200);

    translate(width / 2, height / 2);
    var newzoom = 40 / blob.r;
    zoom = lerp(zoom, newzoom, .5);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    for (var i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show();
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1);

        }
    }

    if(blob.pos.x < -1.3*width) {

      blob.pos.x = 1660;
      translate(-blob.pos.x, -blob.pos.y);
    }else if(blob.pos.y < -1.3*height){
      blob.pos.y = 900;
      translate(-blob.pos.x, -blob.pos.y);

    }
    if(blob.pos.x > 1.3*width) {

      blob.pos.x = -1660;
      translate(-blob.pos.x, -blob.pos.y);
    }else if(blob.pos.y > 1.3*height){

      blob.pos.y = -900;
      translate(-blob.pos.x, -blob.pos.y);


    }
    blob.showPlayer();
    blob.update();

}
