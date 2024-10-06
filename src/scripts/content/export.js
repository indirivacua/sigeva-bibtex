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
    bibtexDict.type = tipoTrabajo.value == "1" ? "article" : "misc";
    //title
    let tituloTrabajo = document.getElementsByName("produccion")[0];
    bibtexDict.title = tituloTrabajo.value;
    //author
    let autorTable = document.querySelectorAll('#autorTable input[type="text"][name="autorParticipacionLabel"]');
    bibtexDict.author = getAuthorNames(autorTable);
    // affiliations
    let oganizacionTable = document.querySelectorAll("#autorTable tr");
    bibtexDict.affiliations = getAffiliationsWithIds(oganizacionTable);
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
    //publisher
    let editorial = document.getElementsByName("editorial")[0];
    bibtexDict.publisher = editorial.value;
    //year
    let anioPublica = document.getElementsByName("anioPublica")[0];
    bibtexDict.year = anioPublica.value;
    //url
    let web = document.getElementsByName("web")[0];
    bibtexDict.url = web.value;
    //country
    let paisEdicion = document.getElementsByName("paisEdicion")[0];
    let selectedOption = paisEdicion.options[paisEdicion.selectedIndex];
    bibtexDict.country = selectedOption.text;
    //city
    let lugarPublicacion = document.getElementsByName("lugarPublicacion")[0];
    bibtexDict.city = lugarPublicacion.value;
    //month
    let fechaReunion = document.getElementsByName("fechaReunion")[0];
    let monthNumber = fechaReunion.value.split("/")[0];
    bibtexDict.month = getMonthName(monthNumber);
    //organization
    let institucionOrganizadora = document.getElementsByName("institucionOrganizadora")[0];
    bibtexDict.organization = institucionOrganizadora.value;
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
    let bibtex = "@" + dict.type + "{" + dict.key + ",\n";
    for (let key in dict) {
        if (dict.hasOwnProperty(key) && key !== "type" && key !== "key") {
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
            let organizacionLabels = organizacionTable[i].querySelectorAll(
                'input[type="hidden"][name="autorOrganizacionLabel"]',
            );
            let organizacionIds = organizacionTable[i].querySelectorAll(
                'input[type="hidden"][name="autorOrganizacionId"]',
            );
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
