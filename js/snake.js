(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (board) {
    this.direction = "N";
    this.segments = [board.center()];
  };

  Snake.DIR = ["N", "S", "E", "W"];







})();
