function createImportButton() {
    let importButton = document.createElement("input");
    importButton.type = "button";
    importButton.name = "btnImport";
    importButton.value = "Importar JSON";
    importButton.className = "CformBoton";
    importButton.style.backgroundColor = "#ffd000";
    importButton.style.position = "absolute";
    importButton.style.top = "1";
    importButton.style.right = "5";
    importButton.onclick = loadFile;
    return importButton;
}

function importConicet(conicetDict) {
    // DATOS BÁSICOS

    // Tipo de trabajo:
    let tipoTrabajo = document.getElementsByName("tipoTrabajo")[0];
    tipoTrabajo.value = conicetDict["tipoTrabajo"];
    // Título de trabajo:
    let produccion = document.getElementsByName("produccion")[0];
    produccion.value = conicetDict["produccion"];
    // Idioma:
    let idioma = document.getElementsByName("idioma")[0];
    idioma.value = conicetDict["idioma"];
    // Tipo de publicación: y Título de la/el revista/libro:
    let tipoPublicacion = document.getElementsByName("tipoPublicacion")[0];
    tipoPublicacion.value = conicetDict["tipoPublicacion"];
    let tituloPublicacion = document.getElementsByName("tituloPublicacion")[0];
    tituloPublicacion.value = conicetDict["tituloPublicacion"];
    // ISSN/ISBN:
    let issnIsbn = document.getElementsByName("issnIsbn")[0];
    issnIsbn.value = conicetDict["issnIsbn"];
    // País de edición:
    let paisEdicion = document.getElementsByName("paisEdicion")[0];
    paisEdicion.value = conicetDict["paisEdicion"];
    // Ciudad de la editorial:
    let lugarPublicacion = document.getElementsByName("lugarPublicacion")[0];
    lugarPublicacion.value = conicetDict["lugarPublicacion"];
    // Editorial:
    let editorial = document.getElementsByName("editorial")[0];
    editorial.value = conicetDict["editorial"];
    // Año de publicación:
    let anioPublica = document.getElementsByName("anioPublica")[0];
    anioPublica.value = conicetDict["anioPublica"];
    // SOPORTE Y/O MEDIO DE DIFUSIÓN (URL)
    let tipoSoporteChecked0 = document.getElementsByName("tipoSoporteChecked")[0];
    tipoSoporteChecked0.checked = conicetDict["tipoSoporteChecked0"];
    let tipoSoporteChecked1 = document.getElementsByName("tipoSoporteChecked")[1];
    tipoSoporteChecked1.checked = conicetDict["tipoSoporteChecked1"];
    let web = document.getElementsByName("web")[0];
    web.value = conicetDict["web"];

    // DATOS DEL EVENTO

    // Nombre del evento:
    let reunionCientifica = document.getElementsByName("reunionCientifica")[0];
    reunionCientifica.value = conicetDict["reunionCientifica"];
    // Tipo de evento:
    let tipoReunion = document.getElementsByName("tipoReunion")[0];
    tipoReunion.value = conicetDict["tipoReunion"];
    // Alcance geográfico:
    let alcanceNacional = document.getElementsByName("alcanceNacional")[0];
    alcanceNacional.checked = conicetDict["alcanceNacional"];
    let alcanceInternacional = document.getElementsByName("alcanceInternacional")[0];
    alcanceInternacional.checked = conicetDict["alcanceInternacional"];
    // País del evento:
    let paisEvento = document.getElementsByName("paisEvento")[0];
    paisEvento.value = conicetDict["paisEvento"];
    // Ciudad del evento:
    let lugarReunion = document.getElementsByName("lugarReunion")[0];
    lugarReunion.value = conicetDict["lugarReunion"];
    // Fecha del evento:
    let fechaReunion = document.getElementsByName("fechaReunion")[0];
    fechaReunion.value = conicetDict["fechaReunion"];
    // Institución organizadora:
    let institucionOrganizadora = document.getElementsByName("institucionOrganizadora")[0];
    institucionOrganizadora.value = conicetDict["institucionOrganizadora"];

    // AUTORES

    let autores = conicetDict["autorTable"].split(" <SEP> ");
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
    cargarAfiliaciones(conicetDict);

    // ÁREAS DEL CONOCIMIENTO Y PALABRAS CLAVE

    // ÁREA DEL CONOCIMIENTO (MÁXIMO TRES)
    let parts = conicetDict.disciplinarTable.split(" <SEP> ");
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
    // PALABRA CLAVE
    let palabrasClave = conicetDict["palabraTable"].split("<SEP>");
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
    hdnresumen.value = conicetDict["hdnresumen"];
}

function loadFile() {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "file_input";
    fileInput.accept = ".json"; // Aceptar solo archivos JSON
    fileInput.style.display = "none"; // Hacerlo invisible

    // Agregar el evento para manejar el archivo cargado
    fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                try {
                    // Parsear el contenido del archivo como JSON
                    conicetDict = JSON.parse(event.target.result);
                    console.log(conicetDict);
                    importConicet(conicetDict);
                } catch (error) {
                    console.error("Error al parsear el JSON:", error);
                }
            };

            reader.readAsText(file); // Leer el archivo como texto
        }
    });

    // Simular clic en el input de tipo file
    fileInput.click();
}

function cargarAfiliaciones(conicetDict) {
    let afiliaciones = conicetDict.oganizacionTable.split("<SEP>");

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

globalThis.createImportButton = createImportButton;
