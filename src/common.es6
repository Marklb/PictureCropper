"use strict";

let Point2D = function(x, y){
  this.x = x;
  this.y = y;
}


function getPosition(event){
  let x = new Number();
  let y = new Number();
  let canvas = document.getElementById("myCanvas");

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

  return new Point2D(x, y);
}
