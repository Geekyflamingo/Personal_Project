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

$(document).on('click', '#myButton', function () {
  newJump();
});

$(document).on('click', '#saveButton', function () {
  persist();
});

function init(coursePath){
  stage = new fabric.Canvas(document.getElementById("myCanvas"));
  article = document.getElementById('user');
}

function newJump(){
  var l1 = new fabric.Rect({left: 100, top: 6, width:80, height: 6, fill: 'black'});
  var l2 = new fabric.Rect({left: 100, width:80, height: 21, fill: 'blue'});
  var end1 = new fabric.Rect({left:100, width: 10, height: 18, fill: 'black'});
  var end2 = new fabric.Rect({left:180, width: 10, height: 18, fill: 'black'});
  var str1 = new fabric.Rect({left:120, top: 6,  width: 10, height: 6, fill: 'white'});
  var str2 = new fabric.Rect({left:140, top: 6,  width: 10, height: 6, fill: 'red'});
  var str3 = new fabric.Rect({left:160, top: 6,  width: 10, height: 6, fill: 'yellow'});
  var jump = new fabric.Group([ l1, end1, end2,str1, str2, str3],{left:500, top:500});
  jump.set('selectable', true);
  jump.lockScalingX = true;
  jump.lockScalingY = true;
  jump.hasBorders = false;
  jump.hoverCursor = 'pointer';
  jump.set({
    cornerColor: 'black',
    cornerSize: 8,
    transparentCorners: true,
  });
  stage.add(jump);
}

function persist(){
  //var article = document.getElementById('user')
  var persistence = JSON.stringify(stage);
  var obj = {course: {name: 'voodoo', jumps: persistence, user_id: article.dataset.userid }};
  $.ajax({
    type: "POST",
    url: "/courses",
    data: obj,
    success: alert("success!"),
    dataType: 'json'
  });
}

function getUserCourses(){
  $.ajax({
    type: "GET",
    url: "/courses",
    success: alert("success!"),
  });
}

function load(){
$.ajax({
  type: "GET",
  url: "/courses/" + /*NEED COURSE ID HERE*/ + "/edit",
  success: alert("success!"),
});
}
// function scalingValue(height, width){
//   scalex = stage.x/width //pixels/ft
//   scaley = stage.y/height//pixels/ft
// }
