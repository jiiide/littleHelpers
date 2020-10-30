function doGet() {
  
  //upon opening the web page check if user exists:
  var cache = CacheService.getUserCache();
  var user = Session.getActiveUser().getEmail();
  var value = cache.get(user);
  
  //value is null only if user DNE in cache services
  if(value === null || JSON.parse(cache.get(user)).access == false){
    
    //instantiate user in cache services with restricted permissions
    var permissions ={
    "access": false,
    };
    cache.put(user,JSON.stringify(permissions), 30*60); //key, value, expiration date in seconds
    Logger.log(`${user} is unauthorized`);
    Logger.log(JSON.parse(cache.get(user)).access);
    //open authorization page for uninstantiated users
    
    return HtmlService.createHtmlOutputFromFile('Auth');
  }
  else if(JSON.parse(cache.get(user)).access == true){
    Logger.log(`${user} is authorized`);
    return HtmlService.createHtmlOutputFromFile('Index');
  }
}

function newPage(page) {
  return HtmlService.createHtmlOutputFromFile(page).getContent()
}
