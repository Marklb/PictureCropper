"use strict";

class Screen {
  constructor(elemId) {
    this.containerElem = document.getElementById(elemId);
    this.containerElem.classList.add('hidden');
  }

  show(){
    this.containerElem.classList.remove('hidden');
  }

  hide(){
    this.containerElem.classList.add('hidden');
  }
}
