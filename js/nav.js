(function() {
  window.onload = function() {
    var menu = 
        [
          ["Home", "index.html"],
          ["Instructions", "instructions.html"],
          ["Examples", "examples.html"],
          ["Resources", "resources.html"],
          ["Python", "python.html"],
          ["JavaScript", "javascript.html"],
          ["Workspace", "http://salty-wave-5013.herokuapp.com/"]
        ]
    var navList = document.getElementById("nav");
    for (var i = 0; i < menu.length; i++) {
      var d = document.createElement("div");
      d.innerHTML = makeMenu(menu[i]);
      navList.appendChild(d);
     }
  
    function makeMenu(item) {
      return "<a href='" + item[1] + "'>" + item[0] + "</a>"
    }
  
  }
  
})();