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
//= require_tree .
//= require fabricEXT.js
//= require colpick.js

$(document).ready(function() {
    		$('.colorPick').colpick({
    			layout:'hex',
    			colorScheme:'dark',
				onSubmit:function(hsb,hex,rgb,el) {
					$(el).css('background-color', '#'+hex);
					$(el).colpickHide();
				}
    		});
    	});

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
  persist(document.getElementById('name').value);
});

$(document).on('click', '#loadButton', function () {
  var courseId = $(this).data('id');
  load(courseId);
});

function init(){
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
  var num = new fabric.Text("",{ fontSize: 15, originX:'center', originY:'center', left: 90, top: 10,});
  var jump = new fabric.Group([ l1, end1, end2,str1, str2, str3, num],{left:500, top:500}); // This is the problem!
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
  // l1.on('event:selected', function (options) {
  //   console.log('mouse:dblclick');
  // });
  stage.add(jump);
}

function persist(name){

  var persistence = JSON.stringify(stage.toJSON());
  var obj = {course: {name: name, jumps: persistence, user_id: article.dataset.userid }};
  $.ajax({
    type: "POST",
    url: "/courses",
    data: obj,
    success: alert("success!"),
    dataType: 'json'
  });
}

function load(cID){

  $.get("/courses/" + cID,function(course){

    for (var i = 0; i < course.jumps.objects.length; i++) {
      delete course.jumps.objects[i].fill;
    }

    stage.loadFromJSON(course.jumps, stage.renderAll.bind(stage));
  });
}
// function scalingValue(height, width){
//   scalex = stage.x/width //pixels/ft
//   scaley = stage.y/height//pixels/ft
// }
