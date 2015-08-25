(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(10, 10);

    // listen for arrow key presses
    $(window).on("keydown", this.turnSnake.bind(this));

    // render board every half second
    this.interval = window.setInterval(
      // have to bind because its a callback
      this.step.bind(this),
      500
    );

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

  View.prototype.step = function() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      // render you lose?
      window.clearInterval(this.interval);
    }
  }

})();
