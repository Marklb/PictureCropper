"use strict";

class SelectionBoxDragBox {
  constructor(selectionBox) {
    this.selectionBox = selectionBox;
    this.inset = true;

    this.w = 10;
    this.h = 10;

    this.color = '#F0FFFF';
    this.hoverColor = '#FF0000';
    this.borderColor = '#1E90FF';

    this.hovering = false;
    this.pressed = false;
    this.mousePressedStart = null;
  }

  draw(ctx) {}

  getColor() {
    if (this.isHovered()) {
      return this.hoverColor;
    } else {
      return this.color;
    }
  }

  getSelectionBox() {
    return this.selectionBox;
  }

  getX() {
    // This should be overwritten
    return this.x;
  }

  getY() {
    // This should be overwritten
    return this.y;
  }

  getWidth() {
    return this.w;
  }

  setWidth(w) {
    this.w = w;
  }

  getHeight() {
    return this.h;
  }

  setHeight(h) {
    this.h = h;
  }

  isHovering(mx, my) {
    if (mx > this.getX() && mx < this.getX() + this.getWidth() && my > this.getY() && my < this.getY() + this.getHeight()) {
      return true;
    } else {
      return false;
    }
  }

  setHovering(b) {
    this.hovering = b;
  }

  isHovered() {
    return this.hovering;
  }

  isPressed() {
    return this.pressed;
  }

  setPressed(b, mx, my) {
    this.pressed = b;
    if (this.pressed) {
      console.log('Pressed');
    }
  }

  setMousePressedStart(mStart) {
    this.mousePressedStart = mStart;
  }

  getMousePressedStart() {
    return this.mousePressedStart;
  }

}