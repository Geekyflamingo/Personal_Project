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
  var l1 = new fabric.Rect({left: 100, top: 6, width:80, height: 6, fill: 'white'});
  var l2 = new fabric.Rect({left: 100, width:80, height: 21, fill: 'blue'});
  var end1 = new fabric.Rect({left:100, width: 10, height: 18, fill: 'black'});
  var end2 = new fabric.Rect({left:180, width: 10, height: 18, fill: 'black'});
  var str1 = new fabric.Rect({left:120, top: 6,  width: 10, height: 6, fill: 'black'});
  var str2 = new fabric.Rect({left:140, top: 6,  width: 10, height: 6, fill: 'black'});
  var str3 = new fabric.Rect({left:160, top: 6,  width: 10, height: 6, fill: 'black'});
  var jump = new fabric.Group([ l1, end1, end2,str1, str2, str3],{left:500, top:500});
  jump.set('selectable', true);
  jump.lockScalingX = true;
  jump.lockScalingY = true;
  jump.hasBorders = false;
  stage.add(jump);
}



function persist(){
  var persistence = JSON.stringify(stage);
  $.ajax({
  type: "POST",
  url: url,
  data: persistence,
  success: success,
  dataType: 'json'
});
}
// function scalingValue(height, width){
//   scalex = stage.x/width //pixels/ft
//   scaley = stage.y/height//pixels/ft
// }
