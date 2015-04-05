/*   
  Experiments with diffusion-limited aggregation.  
*/


var dlaBanner;
dlaBanner = dlaBanner || {};




(function() {

  // get a reference to the canvas
  
  var theCanvas = document.getElementById("dla-banner-canvas");
  
  if ( ! theCanvas ) return false;
  
  var cv = theCanvas.getContext("2d");
  
  
  // size of a single particle in terms of screen pixels,
  // which determines the number of columns and rows in array
  
  var pixelScale = 1.5;
  var modelWidth = Math.floor(theCanvas.width / pixelScale);
  var modelHeight = Math.floor(theCanvas.height / pixelScale);
  
  
  // highest particle deposited so far, as a fraction of modelHeight
  
  var treeTop;
  var maxTreeTop = 0.85;
  
  
  // number of particles deposited so far
  
  var particleCount;
  
  // background against which the pattern is drawn
  
  var bkgdColor = "#8890a5";
  
  
  
  
  // constructor for the shadow grid that keeps track of 
  // occupied cells
  
  function ShadowGrid(w, h) {
    this.columns = w;
    this.rows = h;
    this.grid = new Array(w);
    for (var i=0 ; i < this.columns ; i++)
      this.grid[i] = new Array(this.rows);
  }
  
  
  // getters and setters for grid cells
  
  ShadowGrid.prototype.get = function(x, y) {
    return this.grid[x][y];
  }
  
  ShadowGrid.prototype.put = function(x, y, val) {
    return this.grid[x][y] = val;
  }
  
  
  // given a cell within the grid, return true iff any
  // of the four nearest neighbors is occupied
  
  ShadowGrid.prototype.touch = function(x, y) {
    if (y <= 0) { return true };
    var neighborhood = [[0, 1], [0, -1], [1, 0], [-1, 0]];  
    for (var i=0 ; i < neighborhood.length ; i++) {
      var xi = x + neighborhood[i][0];
      if (xi < 0) xi = this.columns - 1;
      if (xi >= this.columns) xi = 0;
      var yi = y + neighborhood[i][1];
      if (yi < 0) yi = 0;
      if (yi >= this.rows) yi = this.rows - 1;
      if (this.get(xi, yi)) {
        return true;
      }
    }
    return false;
  }
  
  
  // global variable for an instance of the ShadowGrid
  
  var sg = new ShadowGrid(modelWidth, modelHeight);
  
  
  // Functions for defining the color gradient. The first particles
  // deposited are a deep maroon; they pass through bright red to yellow.
  
  var colorFn = function(progress) {
    var start = [54, 38, 82];
    var mid   = [196, 0, 38];
    var end   = [255, 255, 0];
    if (progress < 0.5) {
      var q = progress * 2;
      return interpolateColors(start, mid, q);
    }
    else {
      var q = (progress - 0.5) * 2;
      return interpolateColors(mid, end, q);
    }
  }
  
  var interpolateColors = function(rgb1, rgb2, q) {
    var mix = [];
    for (var i=0 ; i < 3 ; i++) {
      mix[i] = Math.floor(rgb1[i] + ((rgb2[i] - rgb1[i]) * q));
    }
    return "rgb(" + mix[0].toString() + ", " + mix[1].toString() + ", " + mix[2].toString() + ")";
  }
  
  var paintPixel = function(x, y, progress) {
    cv.fillStyle = colorFn(progress);
    cv.fillRect(x, y, 1, 1);
  }
  
  
  // initialize or reset the model to the starting state, with
  // a blank canvas and an empty ShadowGrid
  
  var initModel = function() {
    theCanvas.width = theCanvas.width;
    cv.translate(0.5, theCanvas.height + 0.5);   // first quadrant
    cv.scale(pixelScale, -pixelScale);
    treeTop = 0;
    particleCount = 0;
    modelWidth = Math.floor(theCanvas.width / pixelScale);
    modelHeight = Math.floor(theCanvas.height / pixelScale);
    cv.fillStyle = bkgdColor;
    cv.fillRect(0, 0, modelWidth, modelHeight);
    sg = new ShadowGrid(modelWidth, modelHeight);
  }
  
  
  var progress = 0;   // fraction of distance to treeTop height
  
  
  // start a particle at a random x coordinate and at a y coordinate
  // 10 cells above the treetops; move vertically downward until sticking
  // to some already-occupied cell, or the base layer
  
  var randomDescent = function() {
    var x = startX = Math.floor(Math.random() * modelWidth);
    var y = startY = treeTop + 10;
    while (true) {
      if (sg.touch(x, y)) {
        sg.put(x, y, particleCount);
        treeTop = Math.max(treeTop, y);
        particleCount++;
        progress = (treeTop / modelHeight) / maxTreeTop;
        paintPixel(x, y, progress);
        break;
      }
      else {
        y--
      }
    }
  }
  
  
  
  // execute randomDescent for n particles
  
  var runAglorithm = function(n) {
    for (var i=1 ; i <= n ; i++) {
      randomDescent();
    }
  }
  
  
  // break up the overall computation into units of 100 particles,
  // so that the structure builds up gradually on screen
  
  var animationStep = function() {
    runAglorithm(100);
    if (treeTop > (maxTreeTop * modelHeight)) {
      clearInterval(plotTimer);
//      showButtons();
    }
  }
  
  
  // the main entry point, which we export
  
  var runModel = function() {
    initModel();
//    hideButtons();
    plotTimer = setInterval(animationStep, 10);   // note GLOBAL
  }
  
  dlaBanner.animate = runModel;
  dlaBanner.init = initModel;
  
  
  // hide buttons while the animation is in progress
  
//  var theDiv = document.getElementById("dla-banner-div");
//  
//  var hideButtons = function() {
//    var btns = theDiv.getElementsByTagName("button");
//      for (i=0 ; i < btns.length ; i++) {
//         btns[i].style.visibility = "hidden";
//       }
//  }
//  
//  var showButtons = function() {
//    var btns = theDiv.getElementsByTagName("button");
//      for (i=0 ; i < btns.length ; i++) {
//         btns[i].style.visibility = "visible";
//       }
//  }



})();


// if we have a canvas, paint on it

if (document.getElementById("dla-banner-canvas")) {
  dlaBanner.init();
}

































