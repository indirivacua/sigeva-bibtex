function importBibtex(bibtexDict) {
    // DATOS BÁSICOS

    // Tipo de trabajo:
    let tipoTrabajo = document.getElementsByName("tipoTrabajo")[0];
    switch (bibtexDict["type"]) {
        case "Artículo Completo":
            tipoTrabajo.value = "1";
            break;
        case "Artículo Breve":
            tipoTrabajo.value = "2";
            break;
        case "Resumen":
            tipoTrabajo.value = "3";
            break;
        case "Otro":
            tipoTrabajo.value = "4";
            break;
        default:
            tipoTrabajo.value = "-1"; // ---------- Seleccionar ----------
    }
    // Título de trabajo:
    let produccion = document.getElementsByName("produccion")[0];
    produccion.value = bibtexDict["title"];
    // Idioma:
    let idioma = document.getElementsByName("idioma")[0];
    if (bibtexDict.hasOwnProperty("language")) {
        switch (bibtexDict["language"]) {
            case "Español":
                idioma.value = "5";
                break;
            case "Inglés":
                idioma.value = "4";
                break;
            case "Portugués":
                idioma.value = "10";
                break;
            case "Francés":
                idioma.value = "6";
                break;
            case "Alemán":
                idioma.value = "2";
                break;
            case "Italiano":
                idioma.value = "7";
                break;
            case "Japonés":
                idioma.value = "8";
                break;
            case "Chino":
                idioma.value = "12";
                break;
            case "Ruso":
                idioma.value = "11";
                break;
            case "Latín":
                idioma.value = "9";
                break;
            case "Griego (moderno)":
                idioma.value = "3";
                break;
            case "Otro":
                idioma.value = "1";
                break;
            default:
                idioma.value = "-1"; // ---------- Seleccionar ----------
        }
    } else {
        //https://developer.chrome.com/docs/extensions/reference/api/i18n#method-detectLanguage
        //https://stackoverflow.com/a/60028059/11975664
        const i18n = (window.browser || window.chrome || {}).i18n || {
            detectLanguage: () => undefined,
        };
        i18n.detectLanguage(bibtexDict["title"], function (result) {
            switch (result.languages[0].language) {
                case "es":
                    idioma.value = "5"; // Español
                    break;
                case "en":
                    idioma.value = "4"; // Inglés
                    break;
                default:
                    idioma.value = "-1"; // ---------- Seleccionar ----------
            }
        });
    }
    // Tipo de publicación: y Título de la/el revista/libro:
    let tipoPublicacion = document.getElementsByName("tipoPublicacion")[0];
    let tituloPublicacion = document.getElementsByName("tituloPublicacion")[0];
    if (bibtexDict.hasOwnProperty("journal")) {
        tipoPublicacion.value = "6"; // Revista
        tituloPublicacion.value = bibtexDict["journal"];
    } else if (bibtexDict.hasOwnProperty("booktitle")) {
        tipoPublicacion.value = "5"; // Libro
        tituloPublicacion.value = bibtexDict["booktitle"];
    } else {
        tipoPublicacion.value = "-1"; // ---------- Seleccionar ----------
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
    if (bibtexDict.hasOwnProperty("print")) {
        if (bibtexDict["print"] === "Impreso") {
            tipoSoporteChecked[0].checked = true;
        }
    }

    // DATOS DEL EVENTO

    // Nombre del evento:
    let reunionCientifica = document.getElementsByName("reunionCientifica")[0];
    if (bibtexDict.hasOwnProperty("meeting")) {
        reunionCientifica.value = bibtexDict["meeting"];
    } else {
        reunionCientifica.value = bibtexDict["booktitle"];
    }
    // Tipo de evento:
    let tipoReunion = document.getElementsByName("tipoReunion")[0];
    if (bibtexDict.hasOwnProperty("event")) {
        switch (bibtexDict["event"]) {
            case "Conferencia":
                tipoReunion.value = "1";
                break;
            case "Congreso":
                tipoReunion.value = "2";
                break;
            case "Simposio":
                tipoReunion.value = "3";
                break;
            case "Workshop":
                tipoReunion.value = "4";
                break;
            case "Taller":
                tipoReunion.value = "5";
                break;
            case "Jornada":
                tipoReunion.value = "6";
                break;
            case "Otro":
                tipoReunion.value = "7";
                break;
            case "Exposición":
                tipoReunion.value = "8";
                break;
            case "Feria":
                tipoReunion.value = "9";
                break;
            case "Mesa redonda":
                tipoReunion.value = "10";
                break;
            case "Seminario":
                tipoReunion.value = "11";
                break;
            case "Encuentro":
                tipoReunion.value = "12";
                break;
            case "Ronda de negocios":
                tipoReunion.value = "13";
                break;
            default:
                tipoReunion.value = "-1"; // ---------- Seleccionar ----------
        }
    } else {
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
        if (tipoReunion.value == "-1") {
            // ---------- Seleccionar ----------
            tipoReunion.value = "7"; // Otro
        }
    }
    // Alcance geográfico:
    let nacionalCheckbox = document.getElementsByName("alcanceNacional")[0];
    let alcanceInternacional = document.getElementsByName("alcanceInternacional")[0];
    if (bibtexDict.hasOwnProperty("scope")) {
        if (bibtexDict["scope"] === "Nacional, Internacional") {
            nacionalCheckbox.checked = true;
            alcanceInternacional.checked = true;
        } else if (bibtexDict["scope"] === "Nacional") {
            nacionalCheckbox.checked = true;
            alcanceInternacional.checked = false;
        } else if (bibtexDict["scope"] === "Internacional") {
            nacionalCheckbox.checked = false;
            alcanceInternacional.checked = true;
        } else {
            nacionalCheckbox.checked = false;
            alcanceInternacional.checked = false;
        }
    } else {
        alcanceInternacional.checked = true;
    }
    // País del evento:
    let paisEvento = document.getElementsByName("paisEvento")[0];
    let paisEdicion = document.getElementsByName("paisEdicion")[0];
    let options_paisEvento = paisEvento.options;
    for (let i = 0; i < options_paisEvento.length; i++) {
        if (options_paisEvento[i].text === bibtexDict[!bibtexDict.hasOwnProperty("countryEvent") ? "country" : "countryEvent"]) {
            paisEvento.value = options_paisEvento[i].value;
            paisEdicion.value = options_paisEvento[i].value;
            break;
        }
    }
    // Ciudad del evento:
    let lugarReunion = document.getElementsByName("lugarReunion")[0];
    let lugarPublicacion = document.getElementsByName("lugarPublicacion")[0];
    lugarReunion.value = bibtexDict[!bibtexDict.hasOwnProperty("cityEvent") ? "city" : "cityEvent"];
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
            setTimeout(function () {
                autorParticipacionLabel = document.getElementsByName("autorParticipacionLabel");
            }, 500);
        }
        autorParticipacionLabel[i].value = autores[i].trim();
    }
    if (bibtexDict.hasOwnProperty("affiliations")) {
        cargarAfiliaciones(bibtexDict);
    }

    // ÁREAS DEL CONOCIMIENTO Y PALABRAS CLAVE

    // ÁREA DEL CONOCIMIENTO (MÁXIMO TRES)
    if (bibtexDict.hasOwnProperty("knowledgeArea")) {
        let parts = bibtexDict.knowledgeArea.split(" <SEP> ");
        let [text_0, value_0] = parts[0].match(/(.+) \{(\d+)\}/).slice(1);
        let [text_0_0, value_0_0] = parts[1].match(/(.+) \{(\d+)\}/).slice(1);
        let campo_0 = document.getElementsByName("campo_0")[0];
        campo_0.value = value_0;
        campo_0.dispatchEvent(new Event("change"));
        setTimeout(() => {
            let campo_0_0 = document.getElementsByName("campo_0_0")[0];
            campo_0_0.value = value_0_0;
            campo_0_0.dispatchEvent(new Event("change"));
        }, 1000);
    } else {
        let campo_0 = document.getElementsByName("campo_0")[0];
        campo_0.value = "6"; // 1.2 Ciencias de la Computación e Información
        let event = new Event("change");
        campo_0.dispatchEvent(event);
        setTimeout(function () {
            let campo_0_0 = document.getElementsByName("campo_0_0")[0];
            campo_0_0.value = "254"; // 1.2.3 Otras Ciencias de la Computación e Información
        }, 1000);
    }
    // PALABRA CLAVE
    let palabrasClave = bibtexDict["keywords"].split(",");
    let palabraLabel = document.getElementsByName("palabraLabel");
    let palabraNuevo = document.getElementsByName("palabraNuevo")[0];
    for (let i = 0; i < palabrasClave.length; i++) {
        if (i >= palabraLabel.length) {
            palabraNuevo.click();
            setTimeout(function () {
                palabraLabel = document.getElementsByName("palabraLabel");
            }, 500);
        }
        palabraLabel[i].value = palabrasClave[i].trim();
    }

    // RESUMEN (O ABSTRACT)
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    hdnresumen.value = bibtexDict["abstract"];
}

function cargarAfiliaciones(bibtexDict) {
    let afiliaciones = bibtexDict.affiliations.split("<SEP>");

    let afiliacionesPorAutor = {};

    // Recorrer cada afiliación
    afiliaciones.forEach(function (afiliacion) {
        // Utilizamos una expresión regular para separar el nombre del autor, la afiliación y el ID
        let regex = /\{(.+?)\}\s(.+?)\s\{(.+?)\}/;
        let matches = afiliacion.match(regex);

        if (matches) {
            let autor = matches[1].trim();
            let organizacion = matches[2].trim();
            let organizacionId = matches[3].trim();

            // Si el autor no existe aún en el objeto, lo creamos
            if (!afiliacionesPorAutor[autor]) {
                afiliacionesPorAutor[autor] = [];
            }

            // Añadimos la afiliación a la lista del autor
            afiliacionesPorAutor[autor].push({ organizacion, organizacionId });
        }
    });

    // Ahora recorremos los autores en la página para insertar sus respectivas afiliaciones
    let autorParticipacionLabel = document.getElementsByName("autorParticipacionLabel");

    for (let i = 0; i < autorParticipacionLabel.length; i++) {
        let autorActual = autorParticipacionLabel[i].value.trim();

        // Si hay afiliaciones para el autor actual
        if (afiliacionesPorAutor[autorActual]) {
            let autorTable = autorParticipacionLabel[i].closest("table").querySelector("tbody");

            // Insertar cada afiliación de ese autor
            afiliacionesPorAutor[autorActual].forEach(function (afiliacion) {
                let nuevaFila = `
                <tr class="odd">
                <td colspan="2" style="width:500;border-top: 1px solid #888;">
                    <div>${afiliacion.organizacion}</div>
                    <input type="hidden" name="autorOrganizacionLabel" value="${afiliacion.organizacion}">
                    <input type="hidden" name="autorOrganizacionId" value="${afiliacion.organizacionId}">
                    <input type="hidden" name="autorParticipacionOrganizacionId" value="">
                    <input type="hidden" name="autorParticipacionId" value="">
                    <input type="hidden" name="autorisOtraOrganizacion" value="false">
                    <input type="hidden" name="autorPaisId" value="">
                    <input type="hidden" name="autorProvinciaId" value="">
                    <input type="hidden" name="autorRelacionadaId" value="">
                    <input type="hidden" name="autorNivel" value="">
                    <input type="hidden" name="autorRuta" value="${afiliacion.organizacion}">
                    <input type="hidden" name="autorTipoId" value="">
                    <input type="hidden" name="autorAffiliationId" value="">
                </td>
                <td style="width:30;border-top: 1px solid #888;">
                    <input type="button" name="autorOrganizacionBorrar" value="Borrar" class="borrar" align="right">
                </td>
                </tr>`;

                // Insertar la nueva fila después de la fila del autor correspondiente
                autorTable.insertAdjacentHTML("beforeend", nuevaFila);
            });
        }
    }
}

const eventType = {
    Congreso: "Congreso",
    Congress: "Congreso",
    Conferencia: "Conferencia",
    Conference: "Conferencia",
    Simposio: "Simposio",
    Symposium: "Simposio",
    Taller: "Taller",
    Workshop: "Workshop",
    Jornada: "Jornada",
    Exposición: "Exposición",
    Exhibition: "Exposición",
    Seminario: "Seminario",
    Seminar: "Seminario",
    Encuentro: "Encuentro",
    Meeting: "Encuentro",
    // Plurales
    Congresos: "Congreso",
    Congresses: "Congreso",
    Conferencias: "Conferencia",
    Conferences: "Conferencia",
    Simposios: "Simposio",
    Symposiums: "Simposio",
    Talleres: "Taller",
    Workshops: "Workshop",
    Jornadas: "Jornada",
    Exposiciones: "Exposición",
    Exhibitions: "Exposición",
    Seminarios: "Seminario",
    Seminars: "Seminario",
    Encuentros: "Encuentro",
    Meetings: "Encuentro",
};

globalThis.importBibtex = importBibtex;
