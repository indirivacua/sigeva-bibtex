chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "updatePage") {
      bibtexDict = request.bibtexDict

      // DATOS BÁSICOS

      // Tipo de trabajo:
      let tipoTrabajoSelect = document.getElementsByName("tipoTrabajo")[0];
      switch (bibtexDict["type"]) {
        case "article":
        case "inproceedings":
        case "incollection":
          tipoTrabajoSelect.value = "1";  // Artículo Completo
          break;
        case "misc":
          tipoTrabajoSelect.value = "4";  // Otro
          break;
        default:
          tipoTrabajoSelect.value = "-1";  // ---------- Seleccionar ----------
      }
      // Título de trabajo:
      let tituloTrabajo = document.getElementsByName("produccion")[0];
      tituloTrabajo.value = bibtexDict["title"]
      // Idioma:
      //https://developer.chrome.com/docs/extensions/reference/api/i18n#method-detectLanguage
      //https://stackoverflow.com/a/60028059/11975664
      let idioma = document.getElementsByName("idioma")[0];
      chrome.i18n.detectLanguage(bibtexDict["title"], function(result) {
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
      // País de edición:
      // INCHEQUEABLE
      // Ciudad de la editorial:
      // INCHEQUEABLE
      // Editorial:
      let editorial = document.getElementsByName("editorial")[0];
      editorial.value = bibtexDict["publisher"];
      // Año de publicación:
      let anioPublica = document.getElementsByName("anioPublica")[0];
      anioPublica.value = bibtexDict["year"];
      // SOPORTE Y/O MEDIO DE DIFUSIÓN (URL)
      let checkboxes = document.getElementsByName("tipoSoporteChecked");
      let web = document.getElementsByName("web")[0];
      if (bibtexDict.hasOwnProperty("url")) {
        checkboxes[1].checked = true;
        web.value = bibtexDict["url"];
      } else {
        checkboxes[0].checked = true;
      }
    }

    // DATOS DEL EVENTO

    // Nombre del evento:
    let reunionCientifica = document.getElementsByName("reunionCientifica")[0];
    reunionCientifica.value = bibtexDict["booktitle"];
    // Tipo de evento:
    // INCHEQUEABLE
    // Alcance geográfico:
    // INCHEQUEABLE
    // Ciudad del evento:
    // Fecha del evento:
    let fechaReunion = document.getElementsByName("fechaReunion")[0];
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
    let monthNumber = monthNumbers[bibtexDict["month"]];
    fechaReunion.value = monthNumber + "/" + bibtexDict["year"];
    // Institución organizadora:
    let institucionOrganizadora = document.getElementsByName("institucionOrganizadora")[0];
    institucionOrganizadora.value = bibtexDict["organization"];

    // AUTORES

    let autores = bibtexDict['author'].split(' and ');
    let casillasAutor = document.getElementsByName('autorParticipacionLabel');
    let botonAutorNuevo = document.getElementsByName('autorNuevo')[0];
    for (let i = 0; i < autores.length; i++) {
      if (i >= casillasAutor.length) {
        botonAutorNuevo.click();
        setTimeout(function() {
          casillasAutor = document.getElementsByName('autorParticipacionLabel');
        }, 500);
      }
      casillasAutor[i].value = autores[i].trim();
    }

    // ÁREAS DEL CONOCIMIENTO Y PALABRAS CLAVE

    // ÁREA DEL CONOCIMIENTO (MÁXIMO TRES) -- NO FUNCIONA
    let campo0Select = document.getElementsByName('campo_0')[0];
    campo0Select.value = '6';  // '1.2 Ciencias de la Computación e Información'
    setTimeout(function() {
      let campo00Select = document.getElementsByName('campo_0_0')[0];
      campo00Select.value = '254';  // '1.2.3 Otras Ciencias de la Computación e Información'
    }, 1000);
    //PALABRA CLAVE
    let palabrasClave = bibtexDict['keywords'].split(',');
    let casillasPalabra = document.getElementsByName('palabraLabel');
    let botonPalabraNuevo = document.getElementsByName('palabraNuevo')[0];
    for (let i = 0; i < palabrasClave.length; i++) {
      if (i >= casillasPalabra.length) {
        botonPalabraNuevo.click();
        setTimeout(function() {
          casillasPalabra = document.getElementsByName('palabraLabel');
        }, 500);
      }
      casillasPalabra[i].value = palabrasClave[i].trim();
    }
  }
);

/*
@article{example2023,
  title={An Example Article: A Study on AI and Machine Learning},
  author={Doe, John and Smith, Jane and P{\'e}rez, Juan and Fulanito, Meganito and Margarita, Flores},
  journal={The Journal of AI Research},
  volume={100},
  number={1},
  pages={1--20},
  year={2023},
  issn={1234-5678},
  doi={https://doi.org/10.1016/j.example.2023.01.001},
  url={https://www.example.com/science/article/pii/S1234567816300973},
  publisher={Elsevier},
  organization={Elsevier},
  booktitle={International Conference on Artificial Intelligence},
  keywords={Artificial Intelligence, Machine Learning, Deep Learning, Data Mining, Business Intelligence},
  month={January},
  note={Open source software available from https://github.com/example/ai-software}
}
*/