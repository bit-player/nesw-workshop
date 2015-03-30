(function() {
  window.onload = function() {
    var menu = 
        [
          ["Home", "index.html"],
          ["Schedule", "schedule.html"],
          ["Instructions", "instructions.html"],
          ["Examples", "examples.html"],
          ["Resources", "resources.html"],
          ["Python", "python.html"],
          ["JavaScript", "javascript.html"],
          ["Contact", "contact.html"]
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