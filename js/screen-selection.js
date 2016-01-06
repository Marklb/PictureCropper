"use strict";

class ScreenSelection extends Screen {
  constructor(elemId) {
    super(elemId);
    this.selectedImage = null;
    this.canvasElem = document.getElementById('myCanvas');
    this.canvasElem.addEventListener('mousemove', e => {
      this._OnMouseMove(e);
    }, false);
    this.canvasElem.addEventListener('mousedown', e => {
      this._OnMouseDown(e);
    }, false);
    this.canvasElem.addEventListener('mouseup', e => {
      this._OnMouseUp(e);
    }, false);
    document.body.addEventListener('mousemove', e => {
      this.updateCanvas();
    }, false);

    this.selectionBox = new SelectionBox();

    this.menuBarHeight = 25;
    this.canvasElem.style.marginTop = this.menuBarHeight + "px";
    this.containerElem.style.height = window.height - this.menuBarHeight + "px";

    this.doneBtnElem = document.getElementById('selectionDoneBtn');
    // this.doneBtnElem.style.height = (this.menuBarHeight)+"px";
    this.doneBtnElem.addEventListener('click', () => {
      PicManip.switchToScreen('done');
    }, false);
  }

  show() {
    super.show();
    this.doneBtnElem.classList.remove('hidden');
  }

  hide() {
    super.hide();
    // console.log("Hiding");
    // console.log(this.doneBtnElem.className);
    // this.doneBtnElem.classList.add('hidden');
    // FIXME: Class 'hidden' does not get added.
    this.doneBtnElem.style.overflow = 'hidden';
    this.doneBtnElem.style.width = 0;
    this.doneBtnElem.style.height = 0;
    this.doneBtnElem.style.border = 0;
    this.doneBtnElem.style.padding = 0;

    this.canvasElem.style.overflow = 'hidden';
    this.canvasElem.style.width = 0;
    this.canvasElem.style.height = 0;
    this.canvasElem.style.border = 0;
    this.canvasElem.style.padding = 0;
  }

  setSelectedImage(image) {
    this.selectedImage = image;
    this.updateCanvas();
  }

  getSelectionBox() {
    return this.selectionBox;
  }

  getSelectionBoxImage() {
    console.log('Getting Selection Box Image');
    let tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = this.selectionBox.getWidth();
    tmpCanvas.height = this.selectionBox.getHeight();
    console.log(this.selectionBox.getY() + this.selectionBox.getHeight());
    console.log(this.selectionBox.getY());
    console.log(this.selectionBox.getHeight());
    let ctx = tmpCanvas.getContext('2d');
    // ctx.drawImage(this.selectedImage,
    //   this.selectionBox.getX(),
    //   this.selectionBox.getY(),
    //   this.selectionBox.getX()+this.selectionBox.getWidth(),
    //   this.selectionBox.getY()+this.selectionBox.getHeight(),
    //   0,0,
    //   this.selectionBox.getWidth(),
    //   this.selectionBox.getHeight());
    ctx.drawImage(this.selectedImage, -this.selectionBox.getX(), -this.selectionBox.getY());
    // document.body.appendChild(tmpCanvas);

    let tmpImage = new Image();
    tmpImage.src = tmpCanvas.toDataURL();
    // document.body.appendChild(tmpImage);

    // let canvas=document.getElementById("myFinalCanvas");
    // let ctx2=canvas.getContext("2d");
    // tmpImage.onload = function(e) {
    //     ctx2.drawImage(tmpImage,0,0);
    // }

    return tmpImage;
  }

  updateCanvas() {
    this.canvasElem.width = this.selectedImage.width;
    this.canvasElem.height = this.selectedImage.height;

    // console.log('Width: '+this.selectedImage.width);
    // this.canvasElem.width = 100;
    // console.log('Width: '+this.selectedImage.width);
    let ctx = this.canvasElem.getContext('2d');
    // ctx.scale(0.5, 0.5);
    // ctx.drawImage(this.selectedImage,0,0,this.selectedImage.width,this.selectedImage.height);
    ctx.drawImage(this.selectedImage, 0, 0);

    this.selectionBox.draw(ctx);
  }

  _OnMouseMove(e) {
    this.selectionBox.OnMouseMove(e);
  }

  _OnMouseDown(e) {
    this.selectionBox.OnMouseDown(e);
  }

  _OnMouseUp(e) {
    this.selectionBox.OnMouseUp(e);
  }

}