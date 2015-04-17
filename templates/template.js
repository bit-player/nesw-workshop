/*   
  What is it? How does it work? Who wrote it?  
*/

(function() {

  var theViz = document.getElementById("the-viz");
  var theCanvas = document.getElementById("the-canvas");
  var cvx = theCanvas.getContext("2d");
  var theButton = document.getElementById("the-button");
  theButton.onclick = doButton;  
  
  function init() {
    console.log("initing");
  }
  
  function run() {
    console.log("running");
  }
  
  function doButton(e) {
    console.log("buttoning")
  }
  
  init();
  run();

})();
