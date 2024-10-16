if (window.location.href.includes("bcoProduccionListaPublicacionCongreso")) {
    let datosBasicosTd = document.querySelector('td.CformRowHeader[colspan="10"]');
    if (datosBasicosTd) {
        let importButton = globalThis.createImportButton();
        datosBasicosTd.style.position = "relative"; // Necesario para la superposición
        datosBasicosTd.appendChild(importButton);
    }

    let guardarButton = document.querySelector('input[value="Modificar"]');
    if (guardarButton) {
        exportButton = globalThis.createExportButton();
        guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
        guardarButton.insertAdjacentHTML("afterend", " &nbsp; ");
    }
}
