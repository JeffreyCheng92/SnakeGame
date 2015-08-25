(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Apple = SnakeGame.Apple = function(board) {
    this.board = board;
    this.place();
  };

  Apple.SYMBOL = "A";

  Apple.prototype.place = function() {
    var x = Math.floor(Math.random() * this.board.x);
    var y = Math.floor(Math.random() * this.board.y);

    while (this.board.snake.occupy(x, y)) {
      x = Math.floor(Math.random() * this.board.x);
      y = Math.floor(Math.random() * this.board.y);
    }

    this.pos = new SnakeGame.Coord(x, y);
  };

})();
