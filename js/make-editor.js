CodeMirror.defaults.lineNumbers = true;
CodeMirror.defaults.matchBrackets = true;
CodeMirror.defaults.theme = "solarized light";


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
    
    var outputDiv = document.createElement("div");
    outputDiv.className = "output-div hidden";
    outputDiv.cmInstance = cm;
    var outputHeight = txtAreas[i].parentNode.dataset.outputHeight;
    outputDiv.style.height = outputHeight;
    txtAreas[i].parentNode.appendChild(outputDiv);
  }
}


function runner(e) {
  var outputDiv = this.parentNode.lastChild;
  var ourID = this.parentNode.id;
  var getElemStmt = 'var outputDiv = document.getElementById("' + ourID + '").lastChild\n\n';
  var code = getElemStmt + this.cmInstance.getValue();
  var scpt = document.createElement("script");
  scpt.textContent = code;
  document.body.appendChild(scpt);
}

function resetter(e) {
  this.cmInstance.doc.setValue(this.originalContent);
  var outputDiv = this.parentNode.lastChild;
  outputDiv.innerHTML = "";
  outputDiv.classList.add("hidden");
}

function print(args) {
  if (outputDiv.classList.contains("hidden")) {
    outputDiv.classList.remove("hidden");
  }
  var para = document.createElement("p");
  outputDiv.appendChild(para);
  for (var i = 0; i < args.length; i++) {
    para.innerHTML += format(args[i]);
    para.innerHTML += ' ';
  }
}

function format(item) {
  if (typeof(item) === "object") {
    if (item.length) {                // item is an array or arraylike object
      var str = "[";
      for (var i = 0; i < item.length; i++) {
        str += format(item[i]);
        if (i < item.length - 1) {
          str += ", ";
        }
      }
      str += "]";
      return str;
    }
    else {                          // some other kind of object
      var str = "{";
      for (prop in item) {
        str += prop + ": " + format(item[prop.toString()]) + ", ";
      }
      if (str.length > 2) {
        str = str.slice(0, str.length - 2);
        str += "}";
      }
      return str;
    }
  }
  else {
    return item;
  }
}


console.trueLog = console.log     // monkey-patch console.log()

console.log = function() {
  print(arguments);
  console.trueLog.apply(this, arguments);
}



convertToCm()