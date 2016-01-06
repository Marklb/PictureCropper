

var SelectionDragBox = function(){
  this.w = 10;
  this.h = 10;

  this.color = '#F0FFFF';
  this.hoverColor = '#FF0000';
  this.borderColor = '#1E90FF';

  this.hovering = false;
  this.pressed = false;
};
SelectionDragBox.prototype.getColor = function(){
  if(this.hovering){
    return this.hoverColor;
  }else{
    return this.color;
  }
};

var SelectionBox = function(){
  this.x = 50;
  this.y = 50;
  this.w = 50;
  this.h = 50;

  this.resizing = false;
  this.mousePressedStart = null;

  this.borderColor = '#1E90FF';

  this.topLeftBox = new SelectionDragBox();
  this.topRightBox = new SelectionDragBox();
  this.bottomLeftBox = new SelectionDragBox();
  this.bottomRightBox = new SelectionDragBox();
};
SelectionBox.prototype.draw = function(ctx){
  ctx.strokeRect(currentSelectionBox.x,currentSelectionBox.y,currentSelectionBox.w,currentSelectionBox.h);

  ctx.fillStyle=currentSelectionBox.topLeftBox.getColor();
  ctx.fillRect(currentSelectionBox.getTopLeftDragX(),
               currentSelectionBox.getTopLeftDragY(),
               currentSelectionBox.topLeftBox.w,
               currentSelectionBox.topLeftBox.h);
  ctx.strokeRect(currentSelectionBox.getTopLeftDragX(),
                 currentSelectionBox.getTopLeftDragY(),
                 currentSelectionBox.topLeftBox.w,
                 currentSelectionBox.topLeftBox.h);

  ctx.fillStyle=currentSelectionBox.topRightBox.getColor();
  ctx.fillRect(currentSelectionBox.getTopRightDragX(),
               currentSelectionBox.getTopRightDragY(),
               currentSelectionBox.topRightBox.w,
               currentSelectionBox.topRightBox.h);
  ctx.strokeRect(currentSelectionBox.getTopRightDragX(),
                 currentSelectionBox.getTopRightDragY(),
                 currentSelectionBox.topRightBox.w,
                 currentSelectionBox.topRightBox.h);

  ctx.fillStyle=currentSelectionBox.bottomLeftBox.getColor();
  ctx.fillRect(currentSelectionBox.getBottomLeftDragX(),
               currentSelectionBox.getBottomLeftDragY(),
               currentSelectionBox.bottomLeftBox.w,
               currentSelectionBox.bottomLeftBox.h);
  ctx.strokeRect(currentSelectionBox.getBottomLeftDragX(),
                 currentSelectionBox.getBottomLeftDragY(),
                 currentSelectionBox.bottomLeftBox.w,
                 currentSelectionBox.bottomLeftBox.h);

  ctx.fillStyle=currentSelectionBox.bottomRightBox.getColor();
  ctx.fillRect(currentSelectionBox.getBottomRightDragX(),
               currentSelectionBox.getBottomRightDragY(),
               currentSelectionBox.bottomRightBox.w,
               currentSelectionBox.bottomRightBox.h);
  ctx.strokeRect(currentSelectionBox.getBottomRightDragX(),
                 currentSelectionBox.getBottomRightDragY(),
                 currentSelectionBox.bottomRightBox.w,
                 currentSelectionBox.bottomRightBox.h);
}

SelectionBox.prototype.getTopLeftDragX = function(){
  return currentSelectionBox.x-currentSelectionBox.topLeftBox.w;
};
SelectionBox.prototype.getTopLeftDragY = function(){
  return currentSelectionBox.y-currentSelectionBox.topLeftBox.h;
};
SelectionBox.prototype.isOverTopLeftBox = function(x, y){
  if(x > this.getTopLeftDragX() && x < (this.getTopLeftDragX()+this.topLeftBox.w)
     && y > this.getTopLeftDragY() && y < (this.getTopLeftDragY()+this.topLeftBox.h)){
    return true;
  }else{
    return false;
  }
};

SelectionBox.prototype.getTopRightDragX = function(){
  return currentSelectionBox.x+currentSelectionBox.w;
};
SelectionBox.prototype.getTopRightDragY = function(){
  return currentSelectionBox.y-currentSelectionBox.topRightBox.h;
};
SelectionBox.prototype.isOverTopRightBox = function(x, y){
  if(x > this.getTopRightDragX() && x < (this.getTopRightDragX()+this.topRightBox.w)
     && y > this.getTopRightDragY() && y < (this.getTopRightDragY()+this.topRightBox.h)){
    return true;
  }else{
    return false;
  }
};

SelectionBox.prototype.getBottomLeftDragX = function(){
  return currentSelectionBox.x-currentSelectionBox.bottomLeftBox.w;
};
SelectionBox.prototype.getBottomLeftDragY = function(){
  return currentSelectionBox.y+currentSelectionBox.h;
};
SelectionBox.prototype.isOverBottomLeftBox = function(x, y){
  if(x > this.getBottomLeftDragX() && x < (this.getBottomLeftDragX()+this.bottomLeftBox.w)
     && y > this.getBottomLeftDragY() && y < (this.getBottomLeftDragY()+this.bottomLeftBox.h)){
    return true;
  }else{
    return false;
  }
};

SelectionBox.prototype.getBottomRightDragX = function(){
  return currentSelectionBox.x+currentSelectionBox.w;
};
SelectionBox.prototype.getBottomRightDragY = function(){
  return currentSelectionBox.y+currentSelectionBox.h;
};
SelectionBox.prototype.isOverBottomRightBox = function(x, y){
  if(x > this.getBottomRightDragX() && x < (this.getBottomRightDragX()+this.bottomRightBox.w)
     && y > this.getBottomRightDragY() && y < (this.getBottomRightDragY()+this.bottomRightBox.h)){
    return true;
  }else{
    return false;
  }
};




var currentSelectionBox = new SelectionBox();
var selectedImage = null;



var containerUploadImg = document.getElementById('upload-img');
var containerSelection = document.getElementById('selection');
var selectionDoneBtn = document.getElementById('selectionDoneBtn');
var containerDone = document.getElementById('done');



var fileUploadElem = document.getElementById('files-upload-btn');
fileUploadElem.addEventListener("change", function () {
  console.log('Selected Image');
  containerUploadImg.classList.add('hidden');
  containerSelection.classList.remove('hidden');
  selectionDoneBtn.classList.remove('hidden');

  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent){
    console.log(fileLoadedEvent);
    var canvas=document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
    var image = new Image();
    selectedImage = image;
    image.src = fileLoadedEvent.target.result;
    console.log("width: " + image.width);
    console.log("height: " + image.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image,0,0,image.width,image.height);

    currentSelectionBox.draw(ctx);


    // ctx.strokeRect(currentSelectionBox.x,currentSelectionBox.y,currentSelectionBox.w,currentSelectionBox.h);
    //
    // ctx.fillStyle=currentSelectionBox.topLeftBox.getColor();
    // ctx.fillRect(currentSelectionBox.getTopLeftDragX(),
    //              currentSelectionBox.getTopLeftDragY(),
    //              currentSelectionBox.topLeftBox.w,
    //              currentSelectionBox.topLeftBox.h);
    // ctx.strokeRect(currentSelectionBox.getTopLeftDragX(),
    //                currentSelectionBox.getTopLeftDragY(),
    //                currentSelectionBox.topLeftBox.w,
    //                currentSelectionBox.topLeftBox.h);
    //
    // ctx.fillStyle=currentSelectionBox.topRightBox.getColor();
    // ctx.fillRect(currentSelectionBox.getTopRightDragX(),
    //              currentSelectionBox.getTopRightDragY(),
    //              currentSelectionBox.topRightBox.w,
    //              currentSelectionBox.topRightBox.h);
    // ctx.strokeRect(currentSelectionBox.getTopRightDragX(),
    //                currentSelectionBox.getTopRightDragY(),
    //                currentSelectionBox.topRightBox.w,
    //                currentSelectionBox.topRightBox.h);
    //
    // ctx.fillStyle=currentSelectionBox.bottomLeftBox.getColor();
    // ctx.fillRect(currentSelectionBox.getBottomLeftDragX(),
    //              currentSelectionBox.getBottomLeftDragY(),
    //              currentSelectionBox.bottomLeftBox.w,
    //              currentSelectionBox.bottomLeftBox.h);
    // ctx.strokeRect(currentSelectionBox.getBottomLeftDragX(),
    //                currentSelectionBox.getBottomLeftDragY(),
    //                currentSelectionBox.bottomLeftBox.w,
    //                currentSelectionBox.bottomLeftBox.h);
    //
    // ctx.fillStyle=currentSelectionBox.bottomRightBox.getColor();
    // ctx.fillRect(currentSelectionBox.getBottomRightDragX(),
    //              currentSelectionBox.getBottomRightDragY(),
    //              currentSelectionBox.bottomRightBox.w,
    //              currentSelectionBox.bottomRightBox.h);
    // ctx.strokeRect(currentSelectionBox.getBottomRightDragX(),
    //                currentSelectionBox.getBottomRightDragY(),
    //                currentSelectionBox.bottomRightBox.w,
    //                currentSelectionBox.bottomRightBox.h);



      // c.style.width = "1000px";
      // c.style.height = "1000px";
      // var ctx=c.getContext("2d");
      // var img=document.getElementById("scream");
      // ctx.drawImage(img,10,10);
      // var imgElem = document.createElement('img');
      // var image = new Image();
      // image.src = fileLoadedEvent.target.result;
      // console.log("width: " + image.width);
      // console.log("height: " + image.height);
      // c.width = image.width;
      // c.height = image.height;
      // document.body.appendChild(imgElem);
      // console.log(imageLoaded);
      // ctx.drawImage(imageLoaded,0,0,640,360);
      // ctx.drawImage(image,0,0,640,360);
      // c.style.width = image.width+"px";
      // c.style.height = image.height+"px";
      // ctx.drawImage(image,0,0,image.width,image.height);


      // var selBox = new SelectionBox();
      // ctx.drawImage(image,selBox.x,selBox.y,selBox.x+selBox.w,selBox.y+selBox.h   ,0,0,selBox.w,selBox.h);

  };
  fileReader.readAsDataURL(this.files[0]);
}, false);






var Point2D = function(x, y){
  this.x = x;
  this.y = y;
}


function getPosition(event){
  var x = new Number();
  var y = new Number();
  var canvas = document.getElementById("myCanvas");

  if (event.x != undefined && event.y != undefined)
  {
    x = event.x;
    y = event.y;
  }
  else // Firefox method to get the position
  {
    x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
  }

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  // alert("x: " + x + "  y: " + y);
  // console.log("x: " + x + "  y: " + y);
  return new Point2D(x, y);
}

var canvasElem = document.getElementById("myCanvas");
canvasElem.addEventListener("mousedown", function(e){
  var mousePos = getPosition(e);
  if(currentSelectionBox.topLeftBox.hovering){
    currentSelectionBox.topLeftBox.pressed = true;
    currentSelectionBox.mousePressedStart = mousePos;
  }else if(currentSelectionBox.topRightBox.hovering){
    currentSelectionBox.topRightBox.pressed = true;
    currentSelectionBox.mousePressedStart = mousePos;
  }else if(currentSelectionBox.bottomLeftBox.hovering){
    currentSelectionBox.bottomLeftBox.pressed = true;
    currentSelectionBox.mousePressedStart = mousePos;
  }else if(currentSelectionBox.bottomRightBox.hovering){
    currentSelectionBox.bottomRightBox.pressed = true;
    currentSelectionBox.mousePressedStart = mousePos;
  }
}, false);

canvasElem.addEventListener("mouseup", function(e){
  var mousePos = getPosition(e);
  if(currentSelectionBox.topLeftBox.pressed){
    currentSelectionBox.topLeftBox.pressed = false;
    var distX = mousePos.x - currentSelectionBox.mousePressedStart.x;
    var distY = mousePos.y - currentSelectionBox.mousePressedStart.y;
    currentSelectionBox.x += distX;
    currentSelectionBox.w -= distX;
    currentSelectionBox.y += distY;
    currentSelectionBox.h -= distY;
  }
  if(currentSelectionBox.topRightBox.pressed){
    currentSelectionBox.topRightBox.pressed = false;
    var distX = mousePos.x - currentSelectionBox.mousePressedStart.x;
    var distY = mousePos.y - currentSelectionBox.mousePressedStart.y;
    currentSelectionBox.w += distX;
    currentSelectionBox.y += distY;
    currentSelectionBox.h -= distY;
  }
  if(currentSelectionBox.bottomLeftBox.pressed){
    currentSelectionBox.bottomLeftBox.pressed = false;
    var distX = mousePos.x - currentSelectionBox.mousePressedStart.x;
    var distY = mousePos.y - currentSelectionBox.mousePressedStart.y;
    currentSelectionBox.x += distX;
    currentSelectionBox.w -= distX;
    currentSelectionBox.h += distY;
  }
  if(currentSelectionBox.bottomRightBox.pressed){
    currentSelectionBox.bottomRightBox.pressed = false;
    var distX = mousePos.x - currentSelectionBox.mousePressedStart.x;
    var distY = mousePos.y - currentSelectionBox.mousePressedStart.y;
    currentSelectionBox.w += distX;
    currentSelectionBox.h += distY;
  }
}, false);

canvasElem.addEventListener("mousemove", function(e){
  var mousePos = getPosition(e);

  if(currentSelectionBox.isOverTopLeftBox(mousePos.x, mousePos.y)){
    currentSelectionBox.topLeftBox.hovering = true;
  }else{
    currentSelectionBox.topLeftBox.hovering = false;
  }

  if(currentSelectionBox.isOverTopRightBox(mousePos.x, mousePos.y)){
    currentSelectionBox.topRightBox.hovering = true;
  }else{
    currentSelectionBox.topRightBox.hovering = false;
  }

  if(currentSelectionBox.isOverBottomLeftBox(mousePos.x, mousePos.y)){
    currentSelectionBox.bottomLeftBox.hovering = true;
  }else{
    currentSelectionBox.bottomLeftBox.hovering = false;
  }

  if(currentSelectionBox.isOverBottomRightBox(mousePos.x, mousePos.y)){
    currentSelectionBox.bottomRightBox.hovering = true;
  }else{
    currentSelectionBox.bottomRightBox.hovering = false;
  }

  var canvas=document.getElementById("myCanvas");
  var ctx=canvas.getContext("2d");
  ctx.drawImage(selectedImage,0,0);
  currentSelectionBox.draw(ctx);

}, false);











selectionDoneBtn.addEventListener("click", function(e){
  console.log("Clicked Done");
  containerSelection.classList.add('hidden');
  selectionDoneBtn.classList.add('hidden');
  containerDone.classList.remove('hidden');

  var canvas=document.getElementById("myFinalCanvas");
  var ctx=canvas.getContext("2d");

  ctx.drawImage(selectedImage,
    currentSelectionBox.x,currentSelectionBox.y,
    currentSelectionBox.x+currentSelectionBox.w,
    currentSelectionBox.y+currentSelectionBox.h,
    0,0,currentSelectionBox.w,currentSelectionBox.h);
}, false);


























// var fileUploadElem = document.getElementById('files-upload');
// fileUploadElem.addEventListener("change", function () {
// 	// traverseFiles(this.files);
//   // console.log(this.files);
//   var fileReader = new FileReader();
//   fileReader.onload = function(fileLoadedEvent)
//   {
//     console.log(fileLoadedEvent);
//       // var imageLoaded = document.createElement("img");
//       // imageLoaded.src = fileLoadedEvent.target.result;
//       // document.body.appendChild(imageLoaded);
//       // var workingContainerElem = document.getElementById('working-container');
//       // workingContainerElem.appendChild(imageLoaded);
//
//       var c=document.getElementById("myCanvas");
//       // c.style.width = "1000px";
//       // c.style.height = "1000px";
//       var ctx=c.getContext("2d");
//       // var img=document.getElementById("scream");
//       // ctx.drawImage(img,10,10);
//       // var imgElem = document.createElement('img');
//       var image = new Image();
//       image.src = fileLoadedEvent.target.result;
//       // console.log("width: " + image.width);
//       // console.log("height: " + image.height);
//       c.width = image.width;
//       c.height = image.height;
//       // document.body.appendChild(imgElem);
//       // console.log(imageLoaded);
//       // ctx.drawImage(imageLoaded,0,0,640,360);
//       // ctx.drawImage(image,0,0,640,360);
//       // c.style.width = image.width+"px";
//       // c.style.height = image.height+"px";
//       ctx.drawImage(image,0,0,image.width,image.height);
//
//
//       // var selBox = new SelectionBox();
//       // ctx.drawImage(image,selBox.x,selBox.y,selBox.x+selBox.w,selBox.y+selBox.h   ,0,0,selBox.w,selBox.h);
//
//   };
//   fileReader.readAsDataURL(this.files[0]);
// }, false);
//
//
// var downloadButton = document.getElementById('download-button');
//
// // downloadButton.onClick = function(){
// downloadButton.addEventListener('click', function(){
//   console.log('Clicked');
//   var canvas=document.getElementById("myCanvas");
//   // var dt = canvas.toDataURL('image/png');
//   // this.href = dt;
//   ReImg.fromCanvas(canvas).downloadPng()
// });
//
//
//
//
// function getPosition(event)
// {
//   var x = new Number();
//   var y = new Number();
//   var canvas = document.getElementById("myCanvas");
//
//   if (event.x != undefined && event.y != undefined)
//   {
//     x = event.x;
//     y = event.y;
//   }
//   else // Firefox method to get the position
//   {
//     x = event.clientX + document.body.scrollLeft +
//         document.documentElement.scrollLeft;
//     y = event.clientY + document.body.scrollTop +
//         document.documentElement.scrollTop;
//   }
//
//   x -= canvas.offsetLeft;
//   y -= canvas.offsetTop;
//
//   // alert("x: " + x + "  y: " + y);
//   console.log("x: " + x + "  y: " + y);
// }
// document.getElementById("myCanvas").addEventListener("mousedown", getPosition, false);
