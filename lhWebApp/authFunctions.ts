// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)
function generateC() {
    var pass: string = "";
    var str: string = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
    }
    return pass;
}


function inDataBase(emailInput: string) {
  // get a database from the script properties
  var dataBase = PropertiesService.getScriptProperties();
  var data = dataBase.getProperties();
  
  // what is in the database?
  for (var key in data) {
  Logger.log("Key: %s, Value: %s", key, data[key]);
  }
  
  // check if email input is an email in the database
  var isMatch: boolean = false;
  for (var pair in data){
    if (emailInput == pair){ 
      isMatch = true;
      Logger.log(`${emailInput} was in user database.`)
    }
    else{
      Logger.log(`${emailInput} was not in user database`)
    }
  }
  Logger.log(isMatch);
  return isMatch;
}


function isProfessor(emailInput: string) {

    var dataBase = PropertiesService.getScriptProperties();
    var hasDomain: boolean = /@apps.losrios.edu/.test(emailInput); //change to arc.losrios.edu
    var hasNumbers: boolean = /\d+/.test(emailInput);
    var accessCode: string = generateC();
  
    if (hasDomain && hasNumbers) { //change to !hasNumbers
      
        //create a user in the database with the email and a generated access code
        dataBase.setProperty(emailInput, accessCode)
        console.log(emailInput + " is a Professor.");
      
        //send access code to the user
        MailApp.sendEmail({
            to: emailInput,
            replyTo: "littlehelpers.noreply@gmail.com",
            subject: "Little Helpers Access Code",
            htmlBody: accessCode
        });
        return true;
    }
    else {
        console.log(emailInput + " is not a valid email.");
        return false;
    }
}


function addUser(user: string, accessInput: string, pwInput: string, rePwInput: string){
    //bring up user with corresponding code
    var dataBase = PropertiesService.getScriptProperties();
    var accessCode: string = dataBase.getProperty(user);
    
    //test code input with actual code
    var acRegex = new RegExp(accessCode);
    var acMatch: boolean = acRegex.test(accessInput);
    
    //test if passwords match
    var pwRegex = new RegExp(pwInput);
    var pwMatch: boolean = pwRegex.test(rePwInput);
    
    if (acMatch && pwMatch){
      //set accessCode to new password input
      dataBase.setProperty(user, pwInput);
    }
    return [acMatch, pwMatch];
}

function sendCode(user){
  //brings up user's code
  var dataBase = PropertiesService.getScriptProperties();
  var accessCode: string = dataBase.getProperty(user);
  //sends code to user
  MailApp.sendEmail({
     to: user,
     replyTo: "littlehelpers.noreply@gmail.com",
     subject: "Little Helpers User Password",
     htmlBody: accessCode
  });
  return true;
}

function checkUser(user: string, pwInput: string){
  //bring up user with corresponding code
  var dataBase = PropertiesService.getScriptProperties();
  var pw: string = dataBase.getProperty(user);
  
  //test password input with actual password
  var pwRegex = new RegExp(pw);
  var pwMatch: boolean = pwRegex.test(pwInput);
  
  return pwMatch;
}
