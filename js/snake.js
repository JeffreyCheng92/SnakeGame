(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (board) {
    this.direction = "N";
    var centerX = board.centerX();
    var centerY = board.centerY();
    this.segments = [new Coord(centerX, centerY)];
  };

  Snake.DIR = ["N", "S", "E", "W"];

  Snake.MOVEMENTS = {
    "N": new Coord(-1, 0),
    "S": new Coord(1, 0),
    "W": new Coord(0, -1),
    "E": new Coord(0, 1),
  };

  Snake.prototype.head = function() {
    return this.segments[0];
  };

  Snake.prototype.move = function() {
    //head gets new location
    this.segments.unshift(this.head().plus(Snake.MOVEMENTS[this.dir]));

    //tail gets cut off cause moved forward
    this.segments.pop();
  };







})();
