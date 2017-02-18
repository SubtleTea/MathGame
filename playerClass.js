function mathPlayer(x,y,r) {
    this.score
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);
    this.score = 0;
    this.mainNumber = floor(random(1, 19));
    this.leftNumber = " ";
    this.rightNumber = " ";
    this.operator = " ";
    this.playerHealth = 100;

    this.update = function() {
        var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
        newvel.setMag(3);
        this.vel.lerp(newvel, .05);
        this.pos.add(this.vel);
    }

    this.showPlayer = function() {
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

        text(this.mainNumber, this.pos.x - 4.25, this.pos.y);
        text(this.leftNumber, this.pos.x - 17, this.pos.y + 10);
        text(this.rightNumber, this.pos.x + 10, this.pos.y + 10);
        text(this.operator, this.pos.x - 4, this.pos.y + 10);
        text(this.playerHealth, this.pos.x - 10, this.pos.y + 20);
    }
    this.eats = function(other) {
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            if (this.leftNumber == " " && (other.textMain != "+" && other.textMain != "-" && other.textMain != "*" && other.textMain != "/")) {
                this.leftNumber = other.textMain;
            } else if (this.rightNumber == " " && (other.textMain != "+" && other.textMain != "-" && other.textMain != "*" && other.textMain != "/")) {
                this.rightNumber = other.textMain;
            } else if (this.operator == " " && (other.textMain == "+" || other.textMain == "-" ||
                    other.textMain == "*" || other.textMain == "/")) {
                this.operator = other.textMain;
            }
            if (this.leftNumber != " " && this.rightNumber != " " && this.operator != " ") {
                this.calculate();
            }
            return true;
        } else {
            return false;
        }
    }

    this.calculate = function() {
        if (this.operator == "+") {
            var total = this.leftNumber + this.rightNumber;
        } else if (this.operator == "-") {
            var total = this.leftNumber - this.rightNumber;
        } else if (this.operator == "*") {
            var total = this.leftNumber * this.rightNumber;
        } else if (this.operator == "/") {
            var total = this.leftNumber / this.rightNumber;
        }
        if (total == this.mainNumber) {
            background('#00E676');
            Winner.innerText = "Correct: " + this.leftNumber + " " + this.operator + " " + this.rightNumber + " equals " + this.mainNumber;
            this.score += this.mainNumber;
            this.playerHealth = this.playerHealth - this.mainNumber;
            var text = Winner.innerText;
            text = text + " " + this.score;
            Winner.innerText = text;
            this.mainNumber = floor(random(1, 19))
            // display correct answer
            // refresh player number
            // increase points
        } else {
            background('#D50000');
            Winner.innerText = "Incorrect: " + this.leftNumber + " " + this.operator + " " + this.rightNumber + " does not equal " + this.mainNumber;
            this.score -= this.mainNumber;
            var text = Winner.innerText;
            text = text + " " + this.score;
            Winner.innerText = text;
            this.playerHealth = this.playerHealth + this.mainNumber;
            // display wrong answer
            // decrease points
        }
        this.leftNumber = " ";
        this.rightNumber = " ";
        this.operator = " ";
    }

}
