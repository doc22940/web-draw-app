var last_color_selected = "black";
var last_size_selected = "size1";
var last_tool_selected = "none";
var tool_selected = "";

$(document).ready(function () {
	
	$(".wheel-button").wheelmenu({
	  trigger: "click", 
	  animation: "fly", 
	  animationSpeed: "fast", 
	  angle: "[0,90]", 
	});
	
	var audioElement = document.createElement('audio');
	
	var tmp = 	$("#content").css("width");
	var width = tmp.substring(0,tmp.indexOf("p"));
	tmp = 	$("#content").css("height");
	var height = tmp.substring(0,tmp.indexOf("p"));
	
	var canvas = new fabric.Canvas('canvas', {});
	canvas.setHeight(height);//set height and width with px
	canvas.setWidth(width);
	
	canvas.freeDrawingBrush.color = "black";
	canvas.isDrawingMode = true;
	canvas.freeDrawingCursor = 'url(images/pen.cur),default';
	
	canvas.setBackgroundColor('rgba(250, 250, 250, 1)', canvas.renderAll.bind(canvas));
	

	
	$("#freedraw").click(function(){
		canvas.isDrawingMode = true;
		canvas.freeDrawingBrush.color = "black";
		canvas.freeDrawingCursor = 'url(images/pen.cur),default';			
	});
	
	$("#eraser").click(function(){
		canvas.isDrawingMode = true;
		canvas.freeDrawingBrush.color = "#fafafa";
		canvas.freeDrawingCursor = 'url(images/eraser.cur),default';
		canvas.freeDrawingBrush.width = 4;
	});
	
	$("#save").on("mouseover", function () {
		audioElement.setAttribute('src', 'voice/save.mp3');
		audioElement.play();		
	});			
	
	$("#freedraw").on("mouseover", function () {
		audioElement.setAttribute('src', 'voice/freedraw.mp3');
		audioElement.play();		
	});			

	$("#eraser").on("mouseover", function () {
		audioElement.setAttribute('src', 'voice/eraser.mp3');
		audioElement.play();		
	});			
	
	$(".color").on("mouseover", function () {
		
		if (this.id == "black") {
			audioElement.setAttribute('src', 'voice/black.mp3');
			audioElement.play();
		} else if (this.id == "white") {
			audioElement.setAttribute('src', 'voice/white.mp3');
			audioElement.play();
		} else if (this.id == "purple") {
			audioElement.setAttribute('src', 'voice/purple.mp3');
			audioElement.play();
		} else if (this.id == "green") {
			audioElement.setAttribute('src', 'voice/green.mp3');
			audioElement.play();
		} else if (this.id == "yellow") {
			audioElement.setAttribute('src', 'voice/yellow.mp3');
			audioElement.play();
		} else if (this.id == "orange") {
			audioElement.setAttribute('src', 'voice/orange.mp3');
			audioElement.play();
		} else if (this.id == "blue") {
			audioElement.setAttribute('src', 'voice/blue.mp3');
			audioElement.play();
		} else if (this.id == "red") {
			audioElement.setAttribute('src', 'voice/red.mp3');
			audioElement.play();
		}

		
		if (this.id != last_color_selected) {
			var src = this.src;
			var placeOf1 = src.lastIndexOf("u");
			var new_src = src.substr(0, placeOf1) + "selected.png";
			$(this).attr("src", new_src);
		}
	});

	$(".color").on("mouseleave", function () {
		//audioElement.pause();
		if (this.id != last_color_selected) {
			var src = this.src;
			var placeOf2 = src.lastIndexOf("s");
			var new_src = src.substr(0, placeOf2) + "unselected.png";
			$(this).attr("src", new_src);
		}
	});
	
	$(".color").click(function () {

		if(last_color_selected != this.id){
			var src = $("#" + last_color_selected).attr("src");
			var placeOf2 = src.lastIndexOf("s");
			var new_src = src.substr(0, placeOf2) + "unselected.png";
			$("#" + last_color_selected).attr("src", new_src);

			last_color_selected = this.id;

			canvas.freeDrawingBrush.color = last_color_selected;
			canvas.getActiveObject().set("fill", this.id);
			canvas.renderAll(); //记得render all objects
		}

	});

	
	$("#save").click(function () {

		console.log("click");
		var img = new Image();
		//img.src = canvas.toDataURL("image/png");
		$("#save").attr("href", canvas.toDataURL("image/jpg"));

	});	
	

});
