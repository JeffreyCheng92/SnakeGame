(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(x, y) {
    this.x = x;
    this.y = y;
    this.snake = new SnakeGame.Snake(this);
    this.apple = new SnakeGame.Apple(this);
    this.points = 0;
  };

  Board.prototype.centerX = function() {
    return Math.floor(this.x/2);
  };

  Board.prototype.centerY = function() {
    return Math.floor(this.y/2);
  };

  Board.SYMBOL = ".";

  Board.generateGrid = function(x, y) {
    var grid = [];
    for (var i = 0; i < x; i++) {
      grid.push([]); // make rows in the grid

      for (var j = 0; j < y; j++) {
        grid[i].push(Board.SYMBOL); //make columns in the grid
      }
    }

    return grid;
  };

  Board.prototype.render = function() {
    var grid = Board.generateGrid(this.x, this.y);

    this.snake.segments.forEach( function(segment) {
      grid[segment.x][segment.y] = Snake.SYMBOL;
    });

    grid[this.apple.pos.x][this.apple.pos.y] = Apple.SYMBOL;

    var rows = grid.map( function(row) {
      row.join("");
    });

    rows.join("\n");
  };

  Board.prototype.isValid = function(pos) {
    return (pos.x >= 0 && pos.y >=0 && pos.x < this.x && pos.y < this.y);
  };

})();
