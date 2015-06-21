(function() {
  window.onload = function() {
    var menu = 
        [
          ["Home", "index.html"],
          ["Keynotes", "keynotes.html"],
          ["Software", "instructions.html"],
          ["Resources", "resources.html"],
          ["Python", "python.html"],
          ["JavaScript", "javascript.html"],
          ["Showcase", "showcase.html"]
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