// Two eyes on a canvas that follow the mouse cursos
// just like xeyes
// Copyright (c) 2013 Niels Doorn
 
var canvas;
var context;
var mx = 0;
var my = 0;
var eyes; 

 
window.onload = function() {

	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	
	eyes = [
   { 
    'centerX' : width/2 - height/40,
    'centerY' : height/20,
    'radius' : height/60
  },
    { 
    'centerX' : width/2 + height/40,
    'centerY' : height/20,
    'radius' : height/60
  }
]

  canvas = document.getElementById('eyes');
  context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.onmousemove = function(evt) { mx = evt.x; my = evt.y };
  tekenFrame();
}
 
function tekenFrame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < eyes.length; i++) {
    drawEye(eyes[i]);
  };
  // loop
  requestAnimationFrame(tekenFrame);
}
 
function drawEye(eye) {
  bepaalCoordinaten(eye);
 
  // clip the eye
  context.save();

  context.beginPath();
  context.arc(eye.centerX, eye.centerY, eye.radius, 0, Math.PI * 2);
  context.strokeStyle = '#000000'; 
  context.lineWidth = 3;
  context.stroke();
  context.clip();

 
 
  // eye
  context.beginPath();
  context.arc(eye.centerX, eye.centerY, eye.radius, 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();
 
  // iris
 /* context.beginPath();
  context.arc(eye.centerX + eye.pupilX, eye.centerY + eye.pupilY, eye.radius / 2, 0, Math.PI * 2);
  context.fillStyle = "#007";
  context.fill();
  context.closePath();
*/ 
  // pupil
  context.beginPath();
  context.arc(eye.centerX + eye.pupilX, eye.centerY + eye.pupilY, eye.radius / 2, 0, Math.PI * 2);
  context.fillStyle = "#000";
  context.fill();
  context.closePath();
 
  context.restore();
}
 
function bepaalCoordinaten(eye) {
  // afstand van middenpunt oog tot cursor
  dx = mx - eye.centerX;
  dy = my - eye.centerY;
  // stelling van pythagoras
  c = Math.sqrt((dx*dx) + (dy*dy));
  
  // afstand middelpunt tot pupil
  r = eye.radius * 0.8;
 
  // cursor op oog
  if (Math.abs(dx) < r && Math.abs(dy) < r && c < r) {
    r = c;
  } 
 
  // hoek bepalen
  alfa = Math.asin(dy / c);
 
  // coordinaten op rand cirkel bepalen
  eye.pupilX = Math.cos(alfa) * r;
  // 180 graden fout herstellen
  eye.pupilX = (dx < 0 ? eye.pupilX * -1 : eye.pupilX);
  eye.pupilY = Math.sin(alfa) * r;
}