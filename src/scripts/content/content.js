// https://stackoverflow.com/a/58137279
// https://stackoverflow.com/a/62455030

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

chrome.storage.sync.get({ exportWithCustomFields: false }, (items) => {
    const exportWithCustomFields = items.exportWithCustomFields;
    if (exportWithCustomFields) {
        console.log("Exportando con campos personalizados.");
    } else {
        console.log("Exportando sin campos personalizados.");
    }
    globalThis.exportWithCustomFields = exportWithCustomFields;
});

const monthNumbers = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
};
