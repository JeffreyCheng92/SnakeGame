(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(10, 10);
    $(window).on("keydown", this.turnSnake.bind(this));
  };

  View.ARROWS = {
    37: "W",
    38: "N",
    39: "E",
    40: "S",
  };

  View.prototype.turnSnake = function(event) {
    var key = View.ARROWS[event.keyCode];

    //check to see if it's an arrow key pressed
    if (key) {
      this.board.snake.turn(key);
    } else {
      return;
    }
  };

})();
