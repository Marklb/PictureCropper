"use strict";

class ScreenDone extends Screen{
  constructor(elemId) {
    super(elemId);
  }

  show(){
    super.show();
    console.log('Loaded Done Screen');

    console.log(PicManip.getScreen('selection'));
    let croppedImage = PicManip.getScreen('selection').getSelectionBoxImage();
    let canvas=document.getElementById("myFinalCanvas");
    let ctx=canvas.getContext("2d");

    let selBox = PicManip.getScreen('selection').getSelectionBox();
    console.log(selBox);

    //
    // let ratioWidth = 50/selBox.getWidth();
    // let ratioHeight = 50/selBox.getHeight();
    // console.log('RatioWidth: '+ratioWidth);
    // console.log('RatioHeight: '+ratioHeight);

    let maxWidth = 30;
    let maxHeight = 30;
    let tmpWidth = selBox.getWidth();
    let tmpHeight = selBox.getHeight();

    // Check width size
    if(tmpWidth > maxWidth){
      let ratio = maxWidth/tmpWidth;
      tmpWidth = tmpWidth * ratio;
      tmpHeight = tmpHeight * ratio;
    }
    // Check height size
    if(tmpHeight > maxHeight){
      let ratio = maxHeight/tmpHeight;
      tmpWidth = tmpWidth * ratio;
      tmpHeight = tmpHeight * ratio;
    }

    // Center the image
    let widthOffset = 0;
    let heightOffset = 0;
    if(tmpWidth < maxWidth){
      let t = maxWidth - tmpWidth;
      widthOffset = t/2;
    }
    if(tmpHeight < maxHeight){
      let t = maxHeight - tmpHeight;
      heightOffset = t/2;
    }


    // Draw the new image
    let rows = 3;
    let columns = 4;

    let rowGap = (360-(rows*maxHeight))/(rows+1);
    let columnsGap = (640-(columns*maxWidth))/(columns+1);
    // console.log('RowGap: '+rowGap);
    // console.log('ColGap: '+columnsGap);
    croppedImage.onload = function(e) {
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0,0,640,360);

      let colPos = columnsGap;
      for(let i = 0; i < columns; i++){
        let rowPos = rowGap;
        for(let j = 0; j < rows; j++){
          // console.log('r: '+rowPos+',  c: '+colPos);
          // ctx.strokeStyle = 'blue';
          // ctx.strokeRect(colPos,rowPos,maxWidth,maxHeight);
          ctx.drawImage(croppedImage,colPos+widthOffset,rowPos+heightOffset,tmpWidth,tmpHeight);
          rowPos += rowGap+tmpHeight;
        }
        colPos += columnsGap+tmpWidth;
      }

        // ctx.strokeStyle = 'blue';
        // ctx.strokeRect(67,67,300,300);
        // ctx.drawImage(croppedImage,67+widthOffset,67+heightOffset,tmpWidth,tmpHeight);

        // ctx.drawImage(croppedImage,50,50,selBox.getWidth()*ratioWidth,selBox.getHeight()*ratioHeight);
        // ctx.drawImage(croppedImage,50,150,selBox.getWidth()*ratioWidth,selBox.getHeight()*ratioHeight);
        //
        // ctx.drawImage(croppedImage,150,50,selBox.getWidth()*ratioWidth,selBox.getHeight()*ratioHeight);
        // ctx.drawImage(croppedImage,150,150,selBox.getWidth()*ratioWidth,selBox.getHeight()*ratioHeight);
        //
        // ctx.drawImage(croppedImage,250,50,selBox.getWidth()*ratioWidth,selBox.getHeight()*ratioHeight);
        // ctx.drawImage(croppedImage,250,150,selBox.getWidth()*ratioWidth,selBox.getHeight()*ratioHeight);
        //
        // ctx.drawImage(croppedImage,350,50,selBox.getWidth()*ratioWidth,selBox.getHeight()*ratioHeight);
        // ctx.drawImage(croppedImage,350,150,selBox.getWidth()*ratioWidth,selBox.getHeight()*ratioHeight);
    }
    console.log('Loaded Done Screen: Done');
  }

}
