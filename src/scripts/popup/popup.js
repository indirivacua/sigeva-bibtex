document.getElementById("insert_button").addEventListener("click", function () {
    let myInput = document.getElementById("input_area");

    let bibtex = myInput.value;
    let bibtexDict = parseBibtex(bibtex);

    let console_log = document.getElementById("console_log");
    console_log.textContent = JSON.stringify(bibtexDict, null, 2);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "updatePage", bibtexDict: bibtexDict });
    });
});

document.getElementById("upload_button").addEventListener("click", function () {
    document.getElementById("file_input").click();
});

document.getElementById("file_input").addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        document.getElementById("input_area").value = event.target.result;
    };
    reader.readAsText(file);
});

// https://developer.chrome.com/docs/extensions/develop/ui/options-page?hl=es-419
// Restores checkbox state using the preferences stored in chrome.storage.
document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.sync.get({ exportWithCustomFields: false }, (items) => {
        document.getElementById("custom_fields_checkbox").checked = items.exportWithCustomFields;
    });
});
// Saves options to chrome.storage
document.getElementById("custom_fields_checkbox").addEventListener("change", function () {
    const exportWithCustomFields = document.getElementById("custom_fields_checkbox").checked;
    chrome.storage.sync.set({ exportWithCustomFields: exportWithCustomFields }, () => {
        console.log("Opciones guardadas: Exportar con campos personalizados: ", exportWithCustomFields);
    });
});

function parseBibtex(bibtex) {
    let bibtexDict = {};

    // Encuentra el tipo y la clave de la entrada
    let typeAndKey = bibtex.match(/@(\w*)\{([^,]*),/);
    bibtexDict["type"] = typeAndKey[1];
    bibtexDict["key"] = typeAndKey[2];

    // Encuentra los pares campo-valor
    let regex = /(\w*)=\{((?:[^{}]|{[^{}]*})*)\}/g;
    let match;
    while ((match = regex.exec(bibtex)) !== null) {
        let field = match[1];
        let value = match[2];

        // Reemplaza las codificaciones de acentos en LaTeX por los caracteres acentuados correspondientes
        value = replaceLatexAccents(value);

        // Convierte la entrada a UTF-8
        try {
            value = decodeURIComponent(escape(value));
        } catch {
            value = value;
        }

        bibtexDict[field] = value;
    }

    return bibtexDict;
}

function replaceLatexAccents(input) {
    const accentMap = {
        "\\'a": "á",
        "\\'e": "é",
        "\\'i": "í",
        "\\'o": "ó",
        "\\'u": "ú",
        "\\'A": "Á",
        "\\'E": "É",
        "\\'I": "Í",
        "\\'O": "Ó",
        "\\'U": "Ú",
        "\\~n": "ñ",
        "\\~N": "Ñ",
    };

    return input.replace(/{\\(['~]?[a-zA-Z])}/g, (match, p1) => accentMap[`\\${p1}`] || p1);
}
