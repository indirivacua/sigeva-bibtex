document.getElementById("insert_button").addEventListener("click", function() {
  let myInput = document.getElementById("input_area");

  let bibtex = myInput.value;
  let bibtexDict = parseBibtex(bibtex);

  let console_log = document.getElementById("console_log");
  console_log.textContent = JSON.stringify(bibtexDict, null, 2);

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "updatePage", bibtexDict: bibtexDict});
  });
});

function parseBibtex(bibtex) {
  let bibtexDict = {};

  // Encuentra el tipo y la clave de la entrada
  let typeAndKey = bibtex.match(/@(\w*)\{([^,]*),/);
  bibtexDict["type"] = typeAndKey[1];
  bibtexDict["key"] = typeAndKey[2];

  // Encuentra los pares campo-valor
  let fieldValues = bibtex.match(/(\w*)=\{([^\}]*)\}/g);
  for (let i = 0; i < fieldValues.length; i++) {
    let split = fieldValues[i].split("=");
    let field = split[0];
    let value = split[1].slice(1, -1);  // Elimina las llaves
    bibtexDict[field] = value;
  }

  return bibtexDict;
}
