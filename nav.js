(function() {
  window.onload = function() {
    var menu = 
        [
          ["Home", "../index.html"],
          ["Schedule", "../schedule/schedule.html"],
          ["Instructions", "../instructions/instructions.html"],
          ["Examples", "../examples/examples.html"],
          ["Resources", "../resources/resources.html"],
          ["Python", "../python/python.html"],
          ["JavaScript", "../javascript/javascript.html"],
          ["Contact", "../contact/contact.html"]
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