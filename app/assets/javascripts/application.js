//= require jquery
//= require bootstrap-sprockets

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
var stageWidth = 1000;
var stageHeight = 800;
var stage;
var update = true;

var rotate_clockwise;
var img;
var rotdegr = 3;
var timer;

function init(){

  //new stage
  stage = new createjs.Stage(document.getElementById("myCanvas"));
  stage.enableMouseOver();
  stage.autoClear = true;
  stage.enableDOMEvents(true);
  createjs.Touch.enable(stage);
  createjs.Ticker.setFPS(200);
  createjs.Ticker.addEventListener("tick",tick);
}

function newJump(){
  var shape2 = new createjs.Shape();
  shape2.graphics.beginFill(createjs.Graphics.getRGB(255,0,0));
  shape2.graphics.rect(0,0,100,10);
  shape2.regX = 50;
  shape2.regY = 5;
  shape2.x = stageWidth/2;
  shape2.y = stageHeight/2;
  shape2.snapToPixel = true;
  shape2.mouseEnabled = true;
  shape2.alpha = 0.7;
  // using "on" binds the listener to the scope of the currentTarget by default
  // in this case that means it executes in the scope of the button.
  shape2.on("mousedown", function (evt) {
    this.parent.addChild(this);
    console.log(this, evt);
    this.offset = {
      x: this.x - evt.stageX,
      y: this.y - evt.stageY
    };
  });
  // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
  shape2.on("pressmove", function (evt) {
    console.log(this.offset);
    console.log(Math.sin(shape2.rotation));
    // if(Math.abs(Math.sin(shape2.rotation)) < .15)){
    //
    // }else{
    //
    // }
    if( Math.abs(this.offset.x) > 20 ){
      rotateCounter(this);
    }else{
      this.x = evt.stageX + this.offset.x;
      this.y = evt.stageY + this.offset.y;
      // indicate that the stage should be updated on the next tick:
      update = true;
    }
  });
  stage.addChild(shape2);
  stage.update();
  //draw to the canvas

}


function pressHandler(e){
  e.onMouseMove = function(ev){
    e.target.x = ev.stageX;
    e.target.y = ev.stageY;
    update = true;
  }
}

function tick(event) {
  // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
  if (update) {
    update = false; // only update once
    stage.update(event);
  }
}

function stop() {
  createjs.Ticker.removeEventListener("tick", tick);
}

function rotateCounter(shape) {
  shape.rotation += -3;
  update = true;
}

// function rotateWheel(type){
// if(type){
//   //clockwise
//   shape2.rotation = shape2.rotation + rotdegr;
// }else{
//   //anti clockwise
//   shape2.rotation = shape2.rotation - rotdegr;
// }
// stage.update();
// }
