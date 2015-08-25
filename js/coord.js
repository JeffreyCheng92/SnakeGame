(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Coord = SnakeGame.Coord = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.equals = function (other_coord) {
    return (this.x === other_coord.x && this.y === other_coord.y);
  };

  Coord.prototype.isOpposite = function (other_coord) {
    return (this.x === (-1 * other_coord.x) &&
              this.y === (-1 * other_coord.y)
           );
  };

  Coord.prototype.plus = function (other_coord) {
    return new Coord(this.x + other_coord.x, this.y + other_coord.y);
  };

})();
