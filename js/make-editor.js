CodeMirror.defaults.lineNumbers = true;
CodeMirror.defaults.matchBrackets = true;
CodeMirror.defaults.theme = "solarized light";

/*
buttons is an array of objects, like so:
[
  {
    name: run,
    id: "run",
    text: "Run",
    click: runHandler,
  }
]

*/

function convertToCm() {
  txtAreas = document.querySelectorAll("textarea.cm")
  for (i = 0; i < txtAreas.length; i++) {
    var cm = CodeMirror.fromTextArea(txtAreas[i]);

    var runButton = document.createElement("button");
    runButton.textContent = "Run";
    runButton.className = "run-button";
    runButton.cmInstance = cm;
    runButton.onclick = runner;
    txtAreas[i].parentNode.appendChild(runButton);
    
    var resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    resetButton.className = "reset-button";
    resetButton.cmInstance = cm;
    resetButton.originalContent = txtAreas[i].textContent;
    resetButton.onclick = resetter;
    txtAreas[i].parentNode.appendChild(resetButton);
    
  }
}



function makeEditor(txtArea) {
  var cm = CodeMirror.fromTextArea(txtArea);
  
  for (i = 0; i < buttons.length; i++) {
    var spec = buttons[i];
    var btn = document.createElement("button");
    btn.textContent = spec.text;
    btn.onclick = spec.click;
    cm.appendChild(btn);
  }
}

function runner(e) {
  var code = this.cmInstance.getValue();
  var scpt = document.createElement("script");
  scpt.textContent = code;
  document.body.appendChild(scpt);
}

function resetter(e) {
  this.cmInstance.doc.setValue(this.originalContent);
}





convertToCm()