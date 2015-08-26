(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(25, 25);
    this.newGame = true;
    this.setupHome();
  };

  View.ARROWS = {
    37: "W",
    38: "N",
    39: "E",
    40: "S",
    80: "PAUSE",
  };

  View.prototype.intervalSetup = function() {
    // render board every half second
    this.interval = window.setInterval(
      // have to bind because its a callback
      this.step.bind(this),
      100
    );
  };

  View.prototype.setupHome = function() {
    $(".score").html("Score: " + this.board.points);
    var content = $("<h3>").addClass("home").html("Press Space to Start");
    this.$el.html(content);
    $(window).one("keydown", this.startGame.bind(this));
  };

  View.prototype.loseGame = function() {
    window.clearInterval(this.interval);
    this.newGame = false;
    var content = $("<h3>").addClass("home")
                           .html("You lose :( \n Press Space to Play Again");
    this.$el.html(content);
    $(window).one("keydown", this.startGame.bind(this));
  };

  View.prototype.startGame = function(event) {
    event.preventDefault();
    if (event.keyCode === 32) {
      //set up elements
      this.board.snake.segments = new SnakeGame.Snake(this.board).segments;
      this.board.snake.direction = "N";
      this.setupBoard();
      this.intervalSetup();

      if (this.newGame) {
        // only bind the first time to prevent multiple listeners
        // listen for arrow key presses
        $(window).on("keydown", this.turnSnake.bind(this));
      }
    } else {
      $(window).one("keydown", this.startGame.bind(this));
    }
  };

  View.prototype.turnSnake = function(event) {
    event.preventDefault();
    var key = View.ARROWS[event.keyCode];

    if (key === "PAUSE" && !this.pause) {
      window.clearInterval(this.interval);
      this.pause = true;
    } else if (key === "PAUSE" && this.pause) {
      // event.preventDefault();
      this.pause = false;
      this.intervalSetup();
    } else if (key) {
      //check to see if it's an arrow key pressed
      // event.preventDefault();
      this.board.snake.turn(key);
    } else {
      return;
    }
  };

  View.prototype.render = function() {
    $(".score").html("Score: " + this.board.points);
    this.renderHelper(this.board.snake.segments, "snake");
    this.renderHelper([this.board.apple.pos], "apple");
  };

  View.prototype.renderHelper = function(array, className) {
    var classString = "." + className;
    var $li = this.$el.find("li");

    // remove all previous elements with the class
    $li.filter(classString).removeClass();

    array.forEach( function(pos, index) {
      var number = (pos.x * this.board.x) + pos.y;
      if (index === 0 && className === "snake") {
        $li.filter(".head").removeClass();
        $li.eq(number).addClass("head");
      } else {
        $li.eq(number).addClass(className);
      }
    }.bind(this));
  };

  View.prototype.setupBoard = function() {
    this.board.points = 0;
    this.$el.empty();

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
      this.loseGame();
    }
  };

})();
