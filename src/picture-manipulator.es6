"use strict";

class PictureManipulator {
  constructor() {
    this.screens = {
      'upload-img': new ScreenUploadImg('upload-img'),
      'selection': new ScreenSelection('selection'),
      'done': new ScreenDone('done')
    };
    this.activeScreen = this.screens['upload-img'];
    this.activeScreen.show();
  }

  getScreen(screenId){
    return this.screens[screenId];
  }

  switchToScreen(screenId){
    this.activeScreen.hide();
    this.activeScreen = this.screens[screenId];
    this.activeScreen.show();
  }
}
