//Constructor
function Preloadimages(arr){
  this.arr = arr;
  this.loadedimages = 0;
  this.newImages;
  this.postAction = function(){};
}

Preloadimages.prototype.loadImg = function() {
  var _this = this;
  _this.loadedimages++

  if (loadedimages == _this.arr.length){
    console.log("All images have loaded (or died trying)!")
  }
};

Preloadimages.prototype.failImage = function() {
  console.log('error load image');
};

Preloadimages.prototype.one = function() {
  _this.newImages[i] = new Image();
  _this.newImages[i].src = _this.arr[i];

  _this.newImages[i].onload = function() {
    this.loadImg();
  }

  _this.newImages[i].onerror = function() {
    this.failImage();
  }
};

Preloadimages.prototype.all = function() {
  var _this = this;

  for (var i = 0; i < _this.arr.length; i++){
    this.one();
  }
};

  module.exports = Preloadimages;





