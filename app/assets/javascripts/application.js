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
  $('#jumpModal').modal('hide');
});


$(document).on('click', '#saveButton', function () {
  persist(document.getElementById('name').value);
  $('#saveModal').modal('hide');
});

$(document).on('click', '#loadButton', function () {
  var courseId = $(this).data('id');
  load(courseId);
  $('#loadModal').modal('hide');
});

$(document).on('click', '#email', function () {
  var courseId = $(this).data('id');
  downloadIt();
});

function init(){
  stage = new fabric.Canvas(document.getElementById("myCanvas"));
  article = document.getElementById('user');
}

function single(){
  var l1 = new fabric.Rect({left: 100, top: 6, width:80, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var end1 = new fabric.Rect({left:100, width: 11, height: 18, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  var end2 = new fabric.Rect({left:180, width: 11, height: 18, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  var str1 = new fabric.Rect({left:120, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2 = new fabric.Rect({left:140, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3 = new fabric.Rect({left:160, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});
  var num = new fabric.Text(document.getElementById('ordering').value,{ fontSize: 15, originX:'center', originY:'center', left: 90, top: 10,});
  var jump = new fabric.Group([ l1, end1, end2,str1, str2, str3, num],{left:500, top:500}); // This is the problem!
  return jump;
}

function double(){
  var end1 = new fabric.Rect({left:100, width: 10, height: 30, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  var end2 = new fabric.Rect({left:180, width: 10, height: 30, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});

  var p1 = new fabric.Rect({left: 110, top: 6, width:70, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var str1p1 = new fabric.Rect({left:120, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2p1 = new fabric.Rect({left:140, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3p1 = new fabric.Rect({left:160, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});

  var p2 = new fabric.Rect({left: 110, top: 18, width:70, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var str1p2 = new fabric.Rect({left:120, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2p2 = new fabric.Rect({left:140, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3p2 = new fabric.Rect({left:160, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});

  var num = new fabric.Text(document.getElementById('ordering').value,{ fontSize: 15, originX:'center', originY:'center', left: 90, top: 10,});
  var jump = new fabric.Group([end1, end2, p1, str1p1, str2p1, str3p1,  p2, str1p2, str2p2, str3p2, num],{left:500, top:500}); // This is the problem!
  return jump;
}

function triple(){
  var end1 = new fabric.Rect({left:100, width: 10, height: 42, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  var end2 = new fabric.Rect({left:180, width: 10, height: 42, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});

  var p1 = new fabric.Rect({left: 110, top: 6, width:70, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var str1p1 = new fabric.Rect({left:120, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2p1 = new fabric.Rect({left:140, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3p1 = new fabric.Rect({left:160, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});

  var p2 = new fabric.Rect({left: 110, top: 18, width:70, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var str1p2 = new fabric.Rect({left:120, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2p2 = new fabric.Rect({left:140, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3p2 = new fabric.Rect({left:160, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});

  var p3 = new fabric.Rect({left: 110, top: 30, width:70, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var str1p3 = new fabric.Rect({left:120, top: 30,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2p3 = new fabric.Rect({left:140, top: 30,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3p3 = new fabric.Rect({left:160, top: 30,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});

  var num = new fabric.Text(document.getElementById('ordering').value,{ fontSize: 15, originX:'center', originY:'center', left: 90, top: 10,});
  var jump = new fabric.Group([end1, end2, p1, str1p1, str2p1, str3p1,  p2, str1p2, str2p2, str3p2,   p3, str1p3, str2p3, str3p3, num],{left:500, top:500}); // This is the problem!
  return jump;
}

function singliverpool(){
  var l2 = new fabric.Rect({left: 114, top: -2, width:64, height: 22, fill: 'blue'});
  var l1 = new fabric.Rect({left: 100, top: 6, width:80, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var end1 = new fabric.Rect({left:100, width: 11, height: 18, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  var end2 = new fabric.Rect({left:180, width: 11, height: 18, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  var str1 = new fabric.Rect({left:120, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2 = new fabric.Rect({left:140, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3 = new fabric.Rect({left:160, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});
  var num = new fabric.Text(document.getElementById('ordering').value,{ fontSize: 15, originX:'center', originY:'center', left: 90, top: 10,});
  var jump = new fabric.Group([ l2, l1, end1, end2,str1, str2, str3, num],{left:500, top:500}); // This is the problem!
  return jump;
}

function doubliverpool(){
  var liv =  new fabric.Rect({left: 113, top: -3, width:64, height: 36, fill: 'blue'});
  var end1 = new fabric.Rect({left:100, width: 10, height: 30, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  var end2 = new fabric.Rect({left:180, width: 10, height: 30, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});

  var p1 = new fabric.Rect({left: 110, top: 6, width:70, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var str1p1 = new fabric.Rect({left:120, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2p1 = new fabric.Rect({left:140, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3p1 = new fabric.Rect({left:160, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});

  var p2 = new fabric.Rect({left: 110, top: 18, width:70, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  var str1p2 = new fabric.Rect({left:120, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  var str2p2 = new fabric.Rect({left:140, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  var str3p2 = new fabric.Rect({left:160, top: 18,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});

  var num = new fabric.Text(document.getElementById('ordering').value,{ fontSize: 15, originX:'center', originY:'center', left: 90, top: 10,});
  var jump = new fabric.Group([ liv, end1, end2, p1, str1p1, str2p1, str3p1,  p2, str1p2, str2p2, str3p2, num],{left:500, top:500}); // This is the problem!
  return jump;
}

function newJump(){
  var jump;
  // var l1 = new fabric.Rect({left: 100, top: 6, width:80, height: 6, fill: document.getElementById('colorPick2').style.cssText.split(":")[1]});
  // var l2 = new fabric.Rect({left: 100, width:80, height: 21, fill: 'blue'});
  // var end1 = new fabric.Rect({left:100, width: 11, height: 18, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  // var end2 = new fabric.Rect({left:180, width: 11, height: 18, fill: document.getElementById('colorPick1').style.cssText.split(":")[1]});
  // var str1 = new fabric.Rect({left:120, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick3').style.cssText.split(":")[1]});
  // var str2 = new fabric.Rect({left:140, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick4').style.cssText.split(":")[1]});
  // var str3 = new fabric.Rect({left:160, top: 6,  width: 10, height: 6, fill: document.getElementById('colorPick5').style.cssText.split(":")[1]});
  // var num = new fabric.Text(document.getElementById('ordering').value,{ fontSize: 15, originX:'center', originY:'center', left: 90, top: 10,});
  // var jump = new fabric.Group([ l1, end1, end2,str1, str2, str3, num],{left:500, top:500}); // This is the problem!
  sing = document.getElementById('jumpType1').checked
  ox = document.getElementById('jumpType2').checked
  trip = document.getElementById('jumpType3').checked
  singliv = document.getElementById('jumpType4').checked
  oxliv = document.getElementById('jumpType5').checked

  if(sing){
    jump = single();
  }else if(singliv){
      jump = singliverpool();
  }else if(ox){
    jump = double();
  }else if(oxliv){
      jump = doubliverpool();
  }else if(trip){
    jump = triple();
  }

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


function mailIt(){
  var image = stage.toDataURL();
  var svg = stage.toSVG({suppressPreamble: true});
  //var link = document.createElement("a");
  var link = "mailto:?"
           + "to=&"
           + "body=Stay ON COURSE"
           + "&subject=Jumping Course"
           + "&attach="+""+svg;
window.location.href = link;
}
function downloadIt(){
  stage.setBackgroundColor("#D1C860", null);
  var image = stage.toDataURL();
  var link = document.createElement("a");
  link.download = "OnCourse";
  link.href = image;
  link.click();
}

// function scalingValue(height, width){
//   scalex = stage.x/width //pixels/ft
//   scaley = stage.y/height//pixels/ft
// }
