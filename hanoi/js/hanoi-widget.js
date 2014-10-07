/*global Hanoi*/
(function() {
  "use strict";
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }
  
  var Widget = Hanoi.Widget = function(game, $el) {
    this.game = game;
    this.el = $el;
    this.selected = [];
  };
  
  Widget.prototype.bindEvents = function() {
    var that = this;
    var $stacks = $(".stack");
    $stacks.click(function(event) {
      var $currentTarget = $(event.currentTarget);
      if (that.selected.length === 0) {
        that.select($currentTarget);
      } else {
        that.makeMove($currentTarget);
      }
    });
  };
  
  Widget.prototype.select = function($tower) {
    var towerID = $tower.data("id");
    if (this.game.towers[towerID].length === 0) {
      alert("No rings on that tower");
    } else {
      this.selected.push(towerID);
      $tower.addClass("selected");
    }
  };
  
  Widget.prototype.makeMove = function($tower) {
    var towerID = $tower.data("id");
    var $fromTower = $($(".stack")[this.selected[0]]);
    
    if (this.game.move(this.selected[0], towerID)) {
      var $fromRing = $fromTower.children().last();
      var $toTower = $($(".stack")[towerID]);
      $fromRing.remove();
      $toTower.append($fromRing);
      this.checkIsWon();
    } else {
      alert("Invalid Move! Try again.");
    }
    this.selected = [];
    $fromTower.removeClass("selected");
  };
  
  Widget.prototype.checkIsWon = function () {
    if (this.game.isWon()) {
      alert("Good work, you!");
      var $stacks = $(".stack");
      $stacks.off("click");
    }
  };
  
  Widget.prototype.setupBoard = function() {
    for (var i = 0; i < 3; i++) {
      var $stack = $("<div>").addClass("stack").data("id", i);
      var tower = this.game.towers[i];
      for (var j = 0; j < tower.length; j++) {
        var $ring = $("<div>").addClass("ring").data("size", tower[j]);
        var percentWidth =  tower[j] / 3 * 100;
        $ring.attr("style", "width:" + percentWidth + "%;");
        $stack.append($ring);
      }
      this.el.append($stack);
    }
  };
  
  Widget.prototype.play = function() {
    this.setupBoard();
    this.bindEvents();
  };
  
})();