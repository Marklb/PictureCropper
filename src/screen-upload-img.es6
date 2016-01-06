"use strict";

class ScreenUploadImg extends Screen{
  constructor(elemId) {
    super(elemId);
    this.fileUploadBtnElem = document.getElementById('files-upload-btn');
    this.fileUploadBtnElem.addEventListener('change', this._OnImageChosen);
  }

  _OnImageChosen(){
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
      PicManip.switchToScreen('selection');
      let image = new Image();
      image.src = fileLoadedEvent.target.result;
      PicManip.getScreen('selection').setSelectedImage(image);
    };
    fileReader.readAsDataURL(this.files[0]);
  }

}
