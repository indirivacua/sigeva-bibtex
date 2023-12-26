let monthNumbers = {
  "January": "01",
  "February": "02",
  "March": "03",
  "April": "04",
  "May": "05",
  "June": "06",
  "July": "07",
  "August": "08",
  "September": "09",
  "October": "10",
  "November": "11",
  "December": "12"
};

let eventType = {
  "Congreso": "Congreso",
  "Congress": "Congreso",
  "Conferencia": "Conferencia",
  "Conference": "Conferencia",
  "Simposio": "Simposio",
  "Symposium": "Simposio",
  "Taller": "Taller",
  "Workshop": "Workshop",
  "Jornada": "Jornada",
  "Exposición": "Exposición",
  "Exhibition": "Exposición",
  "Seminario": "Seminario",
  "Seminar": "Seminario",
  "Encuentro": "Encuentro",
  "Meeting": "Encuentro",
  // Plurales
  "Congresos": "Congreso",
  "Congresses": "Congreso",
  "Conferencias": "Conferencia",
  "Conferences": "Conferencia",
  "Simposios": "Simposio",
  "Symposiums": "Simposio",
  "Talleres": "Taller",
  "Workshops": "Workshop",
  "Jornadas": "Jornada",
  "Exposiciones": "Exposición",
  "Exhibitions": "Exposición",
  "Seminarios": "Seminario",
  "Seminars": "Seminario",
  "Encuentros": "Encuentro",
  "Meetings": "Encuentro",
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "updatePage") {
      bibtexDict = request.bibtexDict

      // DATOS BÁSICOS

      // Tipo de trabajo:
      let tipoTrabajo = document.getElementsByName("tipoTrabajo")[0];
      switch (bibtexDict["type"]) {
        case "article":
        case "inproceedings":
        case "incollection":
          tipoTrabajo.value = "1";  // Artículo Completo
          break;
        case "misc":
          tipoTrabajo.value = "4";  // Otro
          break;
        default:
          tipoTrabajo.value = "-1";  // ---------- Seleccionar ----------
      }
      // Título de trabajo:
      let produccion = document.getElementsByName("produccion")[0];
      produccion.value = bibtexDict["title"];
      // Idioma:
      //https://developer.chrome.com/docs/extensions/reference/api/i18n#method-detectLanguage
      //https://stackoverflow.com/a/60028059/11975664
      let idioma = document.getElementsByName("idioma")[0];
      const i18n = (window.browser || window.chrome || {}).i18n || { detectLanguage: () => undefined };
      i18n.detectLanguage(bibtexDict["title"], function(result) {
        switch (result.languages[0].language) {
          case "es":
            idioma.value = "5";  // Español
            break;
          case "en":
            idioma.value = "4";  // Inglés
            break;
          default:
            idioma.value = "-1";  // ---------- Seleccionar ----------
        }
      });
      // Tipo de publicación: y Título de la/el revista/libro:
      let tipoPublicacion = document.getElementsByName("tipoPublicacion")[0];
      let tituloPublicacion = document.getElementsByName("tituloPublicacion")[0];
      if (bibtexDict.hasOwnProperty("journal")) {
        tipoPublicacion.value = "6";  // Revista
        tituloPublicacion.value = bibtexDict["journal"];
      } else if (bibtexDict.hasOwnProperty("booktitle")) {
        tipoPublicacion.value = "5";  // Libro
        tituloPublicacion.value = bibtexDict["booktitle"];
      } else {
        tipoPublicacion.value = "-1";  // ---------- Seleccionar ----------
      }
      // ISSN/ISBN:
      let issnIsbn = document.getElementsByName("issnIsbn")[0];
      if (bibtexDict.hasOwnProperty("isbn")) {
        issnIsbn.value = bibtexDict["isbn"];
      } else if (bibtexDict.hasOwnProperty("issn")) {
        issnIsbn.value = bibtexDict["issn"];
      }
      // País de edición: (paisEdicion=paisEvento)
      // Ciudad de la editorial: (lugarPublicacion=lugarReunion)
      // Editorial:
      let editorial = document.getElementsByName("editorial")[0];
      editorial.value = bibtexDict["publisher"];
      // Año de publicación:
      let anioPublica = document.getElementsByName("anioPublica")[0];
      anioPublica.value = bibtexDict["year"];
      // SOPORTE Y/O MEDIO DE DIFUSIÓN (URL)
      let tipoSoporteChecked = document.getElementsByName("tipoSoporteChecked");
      let web = document.getElementsByName("web")[0];
      if (bibtexDict.hasOwnProperty("url")) {
        tipoSoporteChecked[1].checked = true;
        web.value = bibtexDict["url"];
      } else {
        tipoSoporteChecked[0].checked = true;
      }
    }

    // DATOS DEL EVENTO

    // Nombre del evento:
    let reunionCientifica = document.getElementsByName("reunionCientifica")[0];
    reunionCientifica.value = bibtexDict["booktitle"];
    // Tipo de evento:
    let tipoReunion = document.getElementsByName("tipoReunion")[0];
    let options_tipoReunion = tipoReunion.options;
    for (let key in eventType) {
      if (bibtexDict["booktitle"].includes(key)) {
        for (let i = 0; i < options_tipoReunion.length; i++) {
          if (options_tipoReunion[i].text === eventType[key]) {
            tipoReunion.value = options_tipoReunion[i].value;
            break;
          }
        }
      }
    }
    if (tipoReunion.value == "-1") {  // ---------- Seleccionar ----------
      tipoReunion.value = "7";  // Otro
    }
    // Alcance geográfico:
    let alcanceInternacional = document.getElementsByName("alcanceInternacional")[0];
    alcanceInternacional.checked = true;
    // País del evento:
    let paisEvento = document.getElementsByName("paisEvento")[0];
    let paisEdicion = document.getElementsByName("paisEdicion")[0];
    let options_paisEvento = paisEvento.options;
    for (let i = 0; i < options_paisEvento.length; i++) {
        if (options_paisEvento[i].text === bibtexDict["country"]) {
          paisEvento.value = options_paisEvento[i].value;
          paisEdicion.value = options_paisEvento[i].value;
          break;
        }
    }
    // Ciudad del evento:
    let lugarReunion = document.getElementsByName("lugarReunion")[0];
    let lugarPublicacion = document.getElementsByName("lugarPublicacion")[0];
    lugarReunion.value = bibtexDict["city"];
    lugarPublicacion.value = bibtexDict["city"];
    // Fecha del evento:
    let fechaReunion = document.getElementsByName("fechaReunion")[0];
    let monthNumber = monthNumbers[bibtexDict["month"]];
    fechaReunion.value = monthNumber + "/" + bibtexDict["year"];
    // Institución organizadora:
    let institucionOrganizadora = document.getElementsByName("institucionOrganizadora")[0];
    institucionOrganizadora.value = bibtexDict["organization"];

    // AUTORES

    let autores = bibtexDict["author"].split(" and ");
    let autorParticipacionLabel = document.getElementsByName("autorParticipacionLabel");
    let autorNuevo = document.getElementsByName("autorNuevo")[0];
    for (let i = 0; i < autores.length; i++) {
      if (i >= autorParticipacionLabel.length) {
        autorNuevo.click();
        setTimeout(function() {
          autorParticipacionLabel = document.getElementsByName("autorParticipacionLabel");
        }, 500);
      }
      autorParticipacionLabel[i].value = autores[i].trim();
    }

    // ÁREAS DEL CONOCIMIENTO Y PALABRAS CLAVE

    // ÁREA DEL CONOCIMIENTO (MÁXIMO TRES)
    let campo_0 = document.getElementsByName("campo_0")[0];
    campo_0.value = "6";  // 1.2 Ciencias de la Computación e Información
    let event = new Event("change");
    campo_0.dispatchEvent(event);
    setTimeout(function() {
      let campo_0_0 = document.getElementsByName("campo_0_0")[0];
      campo_0_0.value = "254";  // 1.2.3 Otras Ciencias de la Computación e Información
    }, 1000);
    // PALABRA CLAVE
    let palabrasClave = bibtexDict["keywords"].split(",");
    let palabraLabel = document.getElementsByName("palabraLabel");
    let palabraNuevo = document.getElementsByName("palabraNuevo")[0];
    for (let i = 0; i < palabrasClave.length; i++) {
      if (i >= palabraLabel.length) {
        palabraNuevo.click();
        setTimeout(function() {
          palabraLabel = document.getElementsByName("palabraLabel");
        }, 500);
      }
      palabraLabel[i].value = palabrasClave[i].trim();
    }

    // RESUMEN (O ABSTRACT)
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    hdnresumen.value = bibtexDict["abstract"];
  }
);

function download(data, filename, type) {
    let file = new Blob([data], {type: type});
    let a = document.createElement("a");
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
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

let exportButton = document.createElement("input");
exportButton.type = "submit";
exportButton.name = "btnExport";
exportButton.value = "Exportar";
exportButton.className = "CformBoton";
exportButton.style.backgroundColor = "#ffd000";

exportButton.onclick = function() {
    let bibtexDict = {};

    //type
    let tipoTrabajo = document.getElementsByName("tipoTrabajo")[0];
    bibtexDict.type = tipoTrabajo.value == "1" ? "article" : "misc";
    //key
    bibtexDict.key = "example2023";
    //title
    let tituloTrabajo = document.getElementsByName("produccion")[0];
    bibtexDict.title = tituloTrabajo.value;
    //author
    let autorTable = document.querySelectorAll('#autorTable input[type="text"][name="autorParticipacionLabel"]');
    bibtexDict.author = getAuthorNames(autorTable);
    //journal
    let tituloPublicacion = document.getElementsByName("tituloPublicacion")[0];
    let tipoPublicacion = document.getElementsByName("tipoPublicacion")[0];
    if (tipoPublicacion.value == "6") {
      bibtexDict.journal = tituloPublicacion.value;
    } else if (tipoPublicacion.value == "5") {
      bibtexDict.booktitle = tituloPublicacion.value;
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
    bibtexDict.month = getMonthName(monthNumber)
    //organization
    let institucionOrganizadora = document.getElementsByName("institucionOrganizadora")[0];
    bibtexDict.organization = institucionOrganizadora.value;
    //keywords
    let palabraTable = document.querySelectorAll('#palabraTable input[type="text"][name="palabraLabel"]');
    bibtexDict.keywords = getKeywords(palabraTable);
    //abstract
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    bibtexDict.abstract = hdnresumen.value;

    let bibtex = dictToBibtex(bibtexDict);

    download(bibtex, `${bibtexDict.title}.bib`, "application/x-bibtex");
};

let guardarButton = document.querySelector('input[value="Modificar"]');

if (guardarButton) {
  guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
}
