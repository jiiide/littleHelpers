function doGet() {
  return HtmlService.createHtmlOutputFromFile('Auth');
}

function newPage(page) {
  return HtmlService.createHtmlOutputFromFile(page).getContent()
}

