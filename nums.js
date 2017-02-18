function Blob(x, y, r) {

    this.score = 0;
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);

    this.playerHealth = 100;

        this.ran = floor(random(1, 14));
        this.textMain = this.ran;
        if (this.ran == 10) {
            this.textMain = "+";
        } else if (this.ran == 11) {
            this.textMain = "-";
        } else if (this.ran == 12) {
            this.textMain = "*";
        } else if (this.ran == 13) {
            this.textMain = "/";
        }



    this.textFirst = " ";
    this.textSecond = " ";
    this.textOp = " ";

    this.update = function() {
        var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
        newvel.setMag(3);
        this.vel.lerp(newvel, .05);
        this.pos.add(this.vel);
    }



    this.show = function() {

        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

        text(this.textMain, this.pos.x - 3, this.pos.y + 4);


    }



}
