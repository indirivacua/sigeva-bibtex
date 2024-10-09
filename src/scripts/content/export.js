function createExportButton() {
    let exportButton = document.createElement("input");
    exportButton.type = "submit";
    exportButton.name = "btnExport";
    exportButton.value = "Exportar";
    exportButton.className = "CformBoton";
    exportButton.style.backgroundColor = "#ffd000";
    exportButton.onclick = exportBibtex;
    return exportButton;
}

function exportBibtex() {
    let bibtexDict = {};

    //type
    let tipoTrabajo = document.getElementsByName("tipoTrabajo")[0];
    bibtexDict.type = tipoTrabajo.options[tipoTrabajo.selectedIndex].text;
    //title
    let tituloTrabajo = document.getElementsByName("produccion")[0];
    bibtexDict.title = tituloTrabajo.value;
    //language (custom)
    let idioma = document.getElementsByName("idioma")[0];
    bibtexDict.language = idioma.options[idioma.selectedIndex].text;
    //journal or booktitle
    let tituloPublicacion = document.getElementsByName("tituloPublicacion")[0];
    let tipoPublicacion = document.getElementsByName("tipoPublicacion")[0];
    switch (tipoPublicacion.value) {
        case "5":
            bibtexDict.booktitle = tituloPublicacion.value;
            break;
        case "6":
            bibtexDict.journal = tituloPublicacion.value;
            break;
        default:
            break;
    }
    //isbn
    let issnIsbn = document.getElementsByName("issnIsbn")[0];
    bibtexDict.isbn = issnIsbn.value;
    //country
    let paisEdicion = document.getElementsByName("paisEdicion")[0];
    bibtexDict.country = paisEdicion.options[paisEdicion.selectedIndex].text;
    //city
    let lugarPublicacion = document.getElementsByName("lugarPublicacion")[0];
    bibtexDict.city = lugarPublicacion.value;
    //publisher
    let editorial = document.getElementsByName("editorial")[0];
    bibtexDict.publisher = editorial.value;
    //year
    let anioPublica = document.getElementsByName("anioPublica")[0];
    bibtexDict.year = anioPublica.value;
    //print (custom)
    let tipoSoporteChecked = document.getElementsByName("tipoSoporteChecked");
    bibtexDict.print = tipoSoporteChecked[0].checked ? "Impreso" : "No Impreso";
    //url
    let web = document.getElementsByName("web")[0];
    bibtexDict.url = web.value;
    //meeting (custom)
    let reunionCientifica = document.getElementsByName("reunionCientifica")[0];
    bibtexDict.meeting = reunionCientifica.value;
    //event (custom)
    let tipoReunion = document.getElementsByName("tipoReunion")[0];
    bibtexDict.event = tipoReunion.options[tipoReunion.selectedIndex].text;
    //scope (custom)
    let scope = "";
    let nacionalCheckbox = document.getElementsByName("alcanceNacional")[0];
    let internacionalCheckbox = document.getElementsByName("alcanceInternacional")[0];
    if (nacionalCheckbox.checked && internacionalCheckbox.checked) {
        scope = "Nacional, Internacional";
    } else if (nacionalCheckbox.checked) {
        scope = "Nacional";
    } else if (internacionalCheckbox.checked) {
        scope = "Internacional";
    }
    bibtexDict.scope = scope;
    //countryEvent (custom)
    let paisEvento = document.getElementsByName("paisEvento")[0];
    bibtexDict.countryEvent = paisEvento.options[paisEvento.selectedIndex].text;
    //cityEvent (custom)
    let lugarReunion = document.getElementsByName("lugarReunion")[0];
    bibtexDict.cityEvent = lugarReunion.value;
    //month
    let fechaReunion = document.getElementsByName("fechaReunion")[0];
    let monthNumber = fechaReunion.value.split("/")[0];
    bibtexDict.month = getMonthName(monthNumber);
    //organization
    let institucionOrganizadora = document.getElementsByName("institucionOrganizadora")[0];
    bibtexDict.organization = institucionOrganizadora.value;
    //author
    let autorTable = document.querySelectorAll('#autorTable input[type="text"][name="autorParticipacionLabel"]');
    bibtexDict.author = getAuthorNames(autorTable);
    //affiliations (custom)
    let oganizacionTable = document.querySelectorAll("#autorTable tr");
    bibtexDict.affiliations = getAffiliationsWithIds(oganizacionTable);
    //knowledgeArea (custom)
    let campo_0 = document.getElementsByName("campo_0")[0];
    let campo_0_0 = document.getElementsByName("campo_0_0")[0];
    let value_0 = campo_0.value;
    let text_0 = campo_0.options[campo_0.selectedIndex].text;
    let value_0_0 = campo_0_0.value;
    let text_0_0 = campo_0_0.options[campo_0_0.selectedIndex].text;
    bibtexDict.knowledgeArea = `${text_0} {${value_0}} <SEP> ${text_0_0} {${value_0_0}}`;
    //keywords
    let palabraTable = document.querySelectorAll('#palabraTable input[type="text"][name="palabraLabel"]');
    bibtexDict.keywords = getKeywords(palabraTable);
    //abstract
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    bibtexDict.abstract = hdnresumen.value;
    //key
    let firstAuthor = bibtexDict.author.split(/ and |,/)[0].replace(/\s+/g, "");
    let firstWord = bibtexDict.title.split(/[ :\-]/)[0];
    bibtexDict.key = `${firstAuthor}${bibtexDict.year}${firstWord}`.toLowerCase();
    //entry
    bibtexDict.entry = "inproceedings"; //'article'

    if (!globalThis.exportWithCustomFields) {
        const keysToRemove = ["language", "print", "meeting", "event", "scope", "countryEvent", "cityEvent", "affiliations", "knowledgeArea"];
        keysToRemove.forEach((key) => {
            delete bibtexDict[key];
        });
        // alert("Exportando sin campos personalizados.");
    }

    let bibtex = dictToBibtex(bibtexDict);

    download(bibtex, `${bibtexDict.title}.bib`, "application/x-bibtex");
}

function download(data, filename, type) {
    let file = new Blob([data], { type: type });
    let a = document.createElement("a");
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function dictToBibtex(dict) {
    let bibtex = "@" + dict.entry + "{" + dict.key + ",\n";
    for (let key in dict) {
        if (dict.hasOwnProperty(key) && key !== "entry" && key !== "key") {
            bibtex += "  " + key + "={" + dict[key] + "},\n";
        }
    }
    bibtex += "}";
    return bibtex;
}

function getAuthorNames(autorTable) {
    let authorNames = [];
    for (let i = 0; i < autorTable.length; i++) {
        authorNames.push(autorTable[i].value);
    }
    let authorNamesString = authorNames.join(" and ");
    // Trim the trailing " and " from the string
    if (authorNamesString.endsWith(" and ")) {
        authorNamesString = authorNamesString.substring(0, authorNamesString.length - 5);
    }
    return authorNamesString;
}

function getAffiliationsWithIds(organizacionTable) {
    let affiliationsWithIds = [];
    for (let i = 0; i < organizacionTable.length; i++) {
        let authorName = organizacionTable[i].querySelector('input[type="text"][name="autorParticipacionLabel"]');
        if (authorName) {
            let organizacionLabels = organizacionTable[i].querySelectorAll('input[type="hidden"][name="autorOrganizacionLabel"]');
            let organizacionIds = organizacionTable[i].querySelectorAll('input[type="hidden"][name="autorOrganizacionId"]');
            // Iterate over all the organizations associated with an author
            for (let j = 0; j < organizacionLabels.length; j++) {
                let organizacionLabel = organizacionLabels[j];
                let organizacionId = organizacionIds[j];
                if (organizacionLabel && organizacionId) {
                    let organizacionText = `{${authorName.value}} ${organizacionLabel.value} {${organizacionId.value}}`;
                    affiliationsWithIds.push(organizacionText);
                }
            }
        }
    }
    return affiliationsWithIds.join(" <SEP> ");
}

function getMonthName(monthNumber) {
    for (let month in monthNumbers) {
        if (monthNumbers[month] === monthNumber) {
            return month;
        }
    }
}

function getKeywords(palabraTable) {
    let keywords = [];
    for (let i = 0; i < palabraTable.length; i++) {
        keywords.push(palabraTable[i].value);
    }
    let keywordsString = keywords.join(", ");
    return keywordsString;
}

globalThis.createExportButton = createExportButton;
