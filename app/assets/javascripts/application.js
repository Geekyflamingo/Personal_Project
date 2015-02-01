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

$(document).on("ajax:success", "[data-behavior=sign-in]", function (e, response) {
  if (response.error) {
    $(this).closest("form").find(".text-danger").removeClass("invisible");
  } else {
    document.location = response.redirect;
  }
  return false;
});

$(document).on("click", "[data-behavior=sign-in] input[type=submit]", function (e, response) {
  $(this).closest("form").find(".text-danger").addClass("invisible");
});

// var stageWidth = 1000;
// var stageHeight = 800;
// var stage;
// var update = true;
// var rotate_clockwise;
// var img;
// var rotdegr = 3;
// var timer;

function init(){

  //new stage
  stage = new fabric.Canvas(document.getElementById("myCanvas"));
  // stage.selection = false;
  // stage.enableMouseOver();
  // stage.autoClear = true;
  // stage.enableDOMEvents(true);
  // createjs.Touch.enable(stage);
  // createjs.Ticker.setFPS(200);
  // createjs.Ticker.addEventListener("tick",tick);
}

function newJump(){
  //new rectangle(jump)
  var jump = new fabric.Rect({ left:500, top:500, width:110, height: 20, fill: 'red', stroke: 'blue', strokeWidth: 5});
  // jump.set({x:500, y:500});
  jump.set('selectable', true);
  jump.lockScalingX = true;
  jump.lockScalingY = true;
  jump.hasBorders = false;
  // jump.regX = 50;
  // jump.regY = 5;
  // jump.x = stageWidth/2;
  // jump.y = stageHeight/2;
  // jump.snapToPixel = true;
  // jump.mouseEnabled = true;
  // jump.alpha = 0.7;
  // // using "on" binds the listener to the scope of the currentTarget by default
  // // in this case that means it executes in the scope of the button.
  // jump.on("mousedown", function (evt) {
  //   this.parent.addChild(this);
  //   console.log(this, evt);
  //   this.offset = {
  //     x: this.x - evt.stageX,
  //     y: this.y - evt.stageY
  //   };
  // });
  // // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
  // jump.on("pressmove", function (evt) {
  //   console.log(this.offset);
  //   console.log(Math.sin(jump.rotation));
  //   // if(Math.abs(Math.sin(jump.rotation)) < .15)){
  //   //
  //   // }else{
  //   //
  //   // }
  //   if( Math.abs(this.offset.x) > 20 ){
  //     rotateCounter(this);
  //   }else{
  //     this.x = evt.stageX + this.offset.x;
  //     this.y = evt.stageY + this.offset.y;
  //     // indicates that the stage should be updated on the next tick:
  //     update = true;
  //   }
  // });
  stage.add(jump);
  // stage.update();
  //draw to the canvas

}



function persist(){
  var persistence = JSON.stringify(stage);
  return persistence
}
// function scalingValue(height, width){
//   scalex = stage.x/width //pixels/ft
//   scaley = stage.y/height//pixels/ft
// }
