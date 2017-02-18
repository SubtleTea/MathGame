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
    this.playerHealth = 5;

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
            this.playerHealth = this.playerHealth - this.mainNumber;
            this.score += this.mainNumber;
            Winner.innerText = "Correct: " + this.leftNumber + " " + this.operator + " " + this.rightNumber + " equals " + this.mainNumber;
            this.mainNumber = floor(random(1, 19))
            if (this.playerHealth <= 0) {
                var text = Winner.innerText;
                text = "You win!";
                Winner.innerText = text;
                this.restart();
            }
            else {
                var text = Winner.innerText;
                text = "Score:" + text + this.score;
            }
        }
        else {
            background('#D50000');
            this.playerHealth = this.playerHealth + this.mainNumber;
            this.score -= this.mainNumber;
            Winner.innerText = "Incorrect: " + this.leftNumber + " " + this.operator + " " + this.rightNumber + " does not equal " + this.mainNumber;
            if (this.playerHealth >= 15) {
                var text = Winner.innerText;
                text = "You lose!";
                Winner.innerText = text;
                this.restart();
            }
            else {
                var text = Winner.innerText;
                text = "Score" + text + " " + this.score;            }


        }
        this.leftNumber = " ";
        this.rightNumber = " ";
        this.operator = " ";
    }







this.restart = function() {

  Winner.innerText += " Final score: " + this.score;
  noLoop();
  setTimeout(function(){  start(); }, 3000);

}
}
start = function() {
  loop();
  Winner.innerText = "Score";
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
