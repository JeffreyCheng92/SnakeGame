(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(10, 10);

    this.startGame();

  };

  // View.prototype.setupHome = function() {
  //   var content = $("<h3>").addClass("home").html("Press Any Key to Start");
  //   this.$el.html(content);
  //   $(window).on("keydown", this.startGame.bind(this));
  // };

  View.prototype.startGame = function() {
    //set up elements
    this.setupBoard();

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

    if (key) { //check to see if it's an arrow key pressed
      this.board.snake.turn(key);
    } else {
      return;
    }
  };

  View.prototype.render = function() {
    this.renderHelper(this.board.snake.segments, "snake");
  };

  View.prototype.renderHelper = function(array, className) {
    var classString = "." + className;
    var $li = this.$el.find("li");
    // remove all previous elements with the class
    $li.filter(classString).removeClass();

    array.forEach( function(pos) {
      var number = (pos.x * this.board.x) + pos.y;
      $li.eq(number).addClass(className);
    }.bind(this));
  };

  View.prototype.setupBoard = function() {

    for (var i = 0; i < this.board.x; i++) {
      var $ul = $("<ul>");

      for (var j = 0; j < this.board.y; j++) {
        $ul.append($("<li>"));
      }

    this.$el.append($ul);
    }

  };

  View.prototype.step = function() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      // render you lose?
      alert("you lose!");
      window.clearInterval(this.interval);
    }
  };

})();
