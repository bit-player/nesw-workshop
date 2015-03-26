(function() {
  window.onload = function() {
    var menu = 
        [
          ["Home", "index.html"],
          ["Schedule", "NESW-code-schedule.html"],
          ["Instructions", "NESW-code-instructions.html"],
          ["Examples", "NESW-code-examples.html"],
          ["Resources", "NESW-code-resources.html"],
          ["Python", "NESW-code-python.html"],
          ["JavaScript", "NESW-code-javascript.html"],
          ["Contact", "NESW-code-contact.html"]
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