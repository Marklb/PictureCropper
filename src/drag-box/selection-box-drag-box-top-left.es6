"use strict";

class SelectionBoxDragBoxTopLeft extends SelectionBoxDragBox{
  constructor(selectionBox) {
    super(selectionBox);
  }

  draw(ctx){
    super.draw(ctx);
    ctx.fillStyle=this.getColor();
    ctx.fillRect(this.getX(),this.getY(),this.getWidth(),this.getHeight());
    ctx.strokeRect(this.getX(),this.getY(),this.getWidth(),this.getHeight());
  }

  getX(){
    if(this.inset){
      return this.getSelectionBox().getX();
    }else{
      return this.getSelectionBox().getX()-this.getWidth();
    }
  }

  getY(){
    if(this.inset){
      return this.getSelectionBox().getY();
    }else{
      return this.getSelectionBox().getY()-this.getHeight();
    }
  }

  isHovering(mx, my){
    let isHov = super.isHovering(mx, my);
    if(isHov){
      console.log('Hovering top left');
    }
    return isHov;
  }

  setPressed(b, mx, my){
    super.setPressed(b);
    if(!b){
      console.log("UnPressed Top Left");
      let distX = mx - this.getMousePressedStart().x;
      let distY = my - this.getMousePressedStart().y;
      this.getSelectionBox().setX(this.getSelectionBox().getX() + distX);
      this.getSelectionBox().setWidth(this.getSelectionBox().getWidth() - distX);
      this.getSelectionBox().setY(this.getSelectionBox().getY() + distY);
      this.getSelectionBox().setHeight(this.getSelectionBox().getHeight() - distY);
    }
  }

}
