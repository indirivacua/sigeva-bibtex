chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "updatePage") {
        globalThis.importBibtex(request.bibtexDict);
    }
});

let guardarButton = document.querySelector('input[value="Modificar"]');
if (guardarButton) {
    exportButton = globalThis.createExportButton();
    guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
}
