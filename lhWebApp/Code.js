function doGet(e) {
  if(e.parameters.v == "Index"){
    return HtmlService.createTemplateFromFile("Index").evaluate();
  }
  else{
    return HtmlService.createTemplateFromFile("Auth").evaluate();
  }

}

