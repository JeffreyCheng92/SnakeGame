(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (board) {
    this.board = board;
    this.direction = "N";
    this.currentlyTurning = false;
    var centerX = board.centerX();
    var centerY = board.centerY();
    this.segments = [new SnakeGame.Coord(centerX, centerY)];
  };

  Snake.DIR = ["N", "S", "E", "W"];
  Snake.SYMBOL = "S";

  Snake.MOVEMENTS = {
    "N": new SnakeGame.Coord(-1, 0),
    "S": new SnakeGame.Coord(1, 0),
    "W": new SnakeGame.Coord(0, -1),
    "E": new SnakeGame.Coord(0, 1),
  };

  Snake.prototype.head = function() {
    return this.segments[0];
  };

  Snake.prototype.move = function() {
    //head gets new location
    this.segments.unshift(this.head().plus(Snake.MOVEMENTS[this.direction]));

    // you wont turn too fast and lose the game
    this.currentlyTurning = false;

    if (this.head().equals(this.board.apple.pos)) {
      // put a new apple and dont pop off
      this.board.points += 1;
      this.board.apple.place();
    } else {
      //tail gets cut off cause moved forward
      this.segments.pop();
    }

    if (this.isDead()) {
      //remove snake from board if dead
      this.segments = [];
    }
  };

  Snake.prototype.turn = function(new_dir) {
    var currentDirection = Snake.MOVEMENTS[this.direction];
    var newDirection = Snake.MOVEMENTS[new_dir];
    if (currentDirection.isOpposite(newDirection) || this.currentlyTurning) {
      return;
    } else {
      this.currentlyTurning = true;
      this.direction = new_dir;
    }
  };

  Snake.prototype.occupy = function(x, y) {
    var occupies = false;
    this.segments.forEach( function(segment) {
      if (segment.x === x && segment.y === y) {
        occupies = true;
      }
    });

    return occupies;
  };

  Snake.prototype.isDead = function() {
    var head = this.head();

    if (!this.board.isValid(head)) {
      return true;
    }

    for (var i = 1; i < this.segments.length; i++) {
      if (this.segments[i].equals(head)) { return true; }
    }

    return false;
  };

})();
