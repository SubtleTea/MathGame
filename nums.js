function Blob(x, y, r, player) {

    this.score = 0;
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);
    this.player = player;
    this.playerHealth = 100;
    if (player) {
        this.ran = floor(random(1, 19));
        this.textMain = this.ran;
    } else if (!player) {
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

    this.eats = function(other) {
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            if (this.textFirst == " " && (other.textMain != "+" && other.textMain != "-" && other.textMain != "*" && other.textMain != "/")) {
                this.textFirst = other.textMain;
            } else if (this.textSecond == " " && (other.textMain != "+" && other.textMain != "-" && other.textMain != "*" && other.textMain != "/")) {
                this.textSecond = other.textMain;
            } else if (this.textOp == " " && (other.textMain == "+" || other.textMain == "-" ||
                    other.textMain == "*" || other.textMain == "/")) {
                this.textOp = other.textMain;
            }
            if (this.textFirst != " " && this.textSecond != " " && this.textOp != " ") {
                this.calculate();
            }
            return true;
        } else {
            return false;
        }
    }

    this.show = function() {

        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

        text(this.textMain, this.pos.x - 3, this.pos.y + 4);


    }
    this.showPlayer = function() {
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

        text(this.textMain, this.pos.x - 4.25, this.pos.y);
        text(this.textFirst, this.pos.x - 17, this.pos.y + 10);
        text(this.textSecond, this.pos.x + 10, this.pos.y + 10);
        text(this.textOp, this.pos.x - 4, this.pos.y + 10);
        text(this.playerHealth, this.pos.x - 10, this.pos.y + 20);
    }

    this.calculate = function() {
        if (this.textOp == "+") {
            var total = this.textFirst + this.textSecond;
        } else if (this.textOp == "-") {
            var total = this.textFirst - this.textSecond;
        } else if (this.textOp == "*") {
            var total = this.textFirst * this.textSecond;
        } else if (this.textOp == "/") {
            var total = this.textFirst / this.textSecond;
        }
        if (total == this.textMain) {
            background('#00E676');
            Winner.innerText = "Correct";
            this.score += this.textMain;
            this.playerHealth = this.playerHealth - this.textMain;
            var text = Winner.innerText;
            text = text + " " + this.score;
            Winner.innerText = text;
            this.textMain = floor(random(1, 19))
            // display correct answer
            // refresh player number
            // increase points
        } else {
            background('#D50000');
            Winner.innerText = "Incorrect";
            this.score -= this.textMain;
            var text = Winner.innerText;
            text = text + " " + this.score;
            Winner.innerText = text;
            this.playerHealth = this.playerHealth + this.textMain;
            // display wrong answer
            // decrease points
        }
        this.textFirst = " ";
        this.textSecond = " ";
        this.textOp = " ";
    }
}
