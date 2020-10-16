function doGet() {
  return HtmlService.createHtmlOutputFromFile('Auth');
}

function newPage(page: string) {
  return HtmlService.createHtmlOutputFromFile(page).getContent()
}

