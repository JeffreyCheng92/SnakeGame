(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (board) {
    this.board = board;
    this.direction = "N";
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

    if (this.head().equals(this.board.apple.pos)) {
      // put a new apple and dont pop off
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
    if (Snake.MOVEMENTS[this.direction].isOpposite(Snake.MOVEMENTS[new_dir])) {
      return;
    } else {
      this.direction = new_dir;
    }
  };

  Snake.prototype.occupy = function(pos) {
    this.segments.forEach( function(segment) {
      if (segment.equals(new SnakeGame.Coord(pos[0], pos[1]))) {
        return true;
      }
    });

    return false;
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
