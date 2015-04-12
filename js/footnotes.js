// Wednesday, April 8, 2015 modified by Brian Hayes
// from https://github.com/rauschma/html_demos

// How to: the reference from which the note is triggered is a span with
// the className "footnote-ref" and with an id such as "topic-13". Then the
// text of the note itself is written in an element with the className 
// "footnote-text" and the id "footnote-topic-13".



(function () {
    
    var oldOnLoad = window.onload;
    window.onload = function (event) {
        if (document.getElementsByClassName) {
            var elems = document.getElementsByClassName("peekaboo-ref");
            for (var i = 0; i<elems.length; i++) {
                var elem = elems[i];
                elem.onclick = peekaboo;
            }
        }
        if (typeof oldOnLoad === "function") {
            oldOnLoad(event);
        }
    };
  
    function peekaboo(ev) {
      var theId = this.id;
      var theNote = document.getElementById("note-" + theId);
      theNote.classList.toggle("shuttered")
    }
        
    var currentDiv = null;
    var currentId = null;
    function toggle(event) {
        var parent = this.parentNode;
        if (currentDiv) {
            parent.removeChild(currentDiv);
            currentDiv = null;
        }
        var footnoteId = this.id;
        if (currentId === footnoteId) {
            currentId = null;
        } 
        else {
            currentId = footnoteId;
            currentDiv = document.createElement("div");
            var footnoteHtml = document.getElementById("footnote-" + footnoteId).innerHTML;
            currentDiv.innerHTML = footnoteHtml;
            currentDiv.className = "footnote-tooltip";
            parent.insertBefore(currentDiv, this.nextSibling);
            setTimeout(function () {
                currentDiv.style.opacity = "1";
            }, 0);
        }
        event.preventDefault();
    }
}());
