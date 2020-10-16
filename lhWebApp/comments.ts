//create sign up (email and accessCode) and login(email and accessCode) modules
//User inputs email
//check if user is in "database" (*script properties*)
//Check if email is valid hasNumbers or "arc.losrios.edu"
//if true => generate and send an access code
//user checks email and enters access code into some input
//keep database of valid emails

/*
function resetDataBase(){
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.deleteAllProperties();
}
*/

/*
function viewProperties(){
  var scriptProperties = PropertiesService.getScriptProperties();
  var data = scriptProperties.getProperties();
  for (var key in data) {
     Logger.log("Key: %s, Value: %s", key, data[key]);
  }
}
*/ 