"use strict";

class SelectionBox {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.w = 100;
    this.h = 100;

    this.resizing = false;
    // this.mousePressedStart = null;

    this.borderColor = '#1E90FF';

    this.dragBoxes = {
      'topLeft': new SelectionBoxDragBoxTopLeft(this),
      'topRight': new SelectionBoxDragBoxTopRight(this),
      'bottomLeft': new SelectionBoxDragBoxBottomLeft(this),
      'bottomRight': new SelectionBoxDragBoxBottomRight(this)
    };
  }

  draw(ctx) {
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    for (let key in this.dragBoxes) {
      this.dragBoxes[key].draw(ctx);
    }
  }

  getX() {
    return this.x;
  }

  setX(x) {
    this.x = x;
  }

  getY() {
    return this.y;
  }

  setY(y) {
    this.y = y;
  }

  setWidth(w) {
    this.w = w;
  }

  getWidth() {
    return this.w;
  }

  setHeight(h) {
    this.h = h;
  }

  getHeight() {
    return this.h;
  }

  OnMouseMove(e) {
    let mousePos = getPosition(e);
    for (let key in this.dragBoxes) {
      if (this.dragBoxes[key].isHovering(mousePos.x, mousePos.y)) {
        this.dragBoxes[key].setHovering(true);
      } else {
        this.dragBoxes[key].setHovering(false);
      }
    }
  }

  OnMouseDown(e) {
    let mousePos = getPosition(e);
    for (let key in this.dragBoxes) {
      if (this.dragBoxes[key].isHovered()) {
        this.dragBoxes[key].setPressed(true);
        this.dragBoxes[key].setMousePressedStart(mousePos);
      }
    }
  }

  OnMouseUp(e) {
    let mousePos = getPosition(e);
    for (let key in this.dragBoxes) {
      if (this.dragBoxes[key].isPressed()) {
        this.dragBoxes[key].setPressed(false, mousePos.x, mousePos.y);
      }
    }
  }

}