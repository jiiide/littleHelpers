
function generateC() {
    var pass = "";
    var str = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
    }
    return pass;
}
function inDataBase(emailInput:string) {
    // get a database from the script properties
    var dataBase = PropertiesService.getScriptProperties();
    var data = dataBase.getProperties();
    // what is in the database?
    for (var key in data) {
        Logger.log("Key: %s, Value: %s", key, data[key]);
    }
    // check if email input is an email in the database
    var isMatch = false;
    for (var email in data) {
        if (emailInput == email) {
            isMatch = true;
            Logger.log(emailInput + " was in user database.");
        }
        else {
            Logger.log(emailInput + " was not in user database");
        }
    }
    Logger.log(isMatch);
    return isMatch;
}
function isProfessor(emailInput:string) {
    var dataBase = PropertiesService.getScriptProperties();
    var hasDomain = /@apps.losrios.edu/.test(emailInput); //change to arc.losrios.edu
    var hasNumbers = /\d+/.test(emailInput);
    var accessCode = generateC();
    if (hasDomain && hasNumbers) { //change to !hasNumbers
        //create a user in the database with the email and a generated access code
        dataBase.setProperty(emailInput, accessCode.hashCode());
        Logger.log(emailInput + " is a Professor.");
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
        Logger.log(emailInput + " is not a valid email.");
        return false;
    }
}
function addUser(user:string, accessInput:string, pwInput:string, rePwInput:string) {
    //bring up user with corresponding code
    var dataBase = PropertiesService.getScriptProperties();
    var hashedAccessCode = dataBase.getProperty(user);
    //test code input with actual code
    var hashedAcInput = accessInput.hashCode();
    var acMatch = (hashedAccessCode == hashedAcInput);
    //test if passwords match
    var pwRegex = new RegExp(pwInput);
    var pwMatch = pwRegex.test(rePwInput);
    Logger.log("acMatch : " + acMatch, "pwMatch : " + pwMatch);
    if (acMatch && pwMatch) {
        //set accessCode to new password input
        dataBase.setProperty(user, pwInput.hashCode());
    }
    Logger.log(dataBase.getProperty(user));
    Logger.log(pwInput.hashCode());
    return [acMatch, pwMatch];
}
function sendCode(user:string) {
    //brings up user's code
    var dataBase = PropertiesService.getScriptProperties();
    var accessCode = dataBase.getProperty(user);
    //sends code to user
    MailApp.sendEmail({
        to: user,
        replyTo: "littlehelpers.noreply@gmail.com",
        subject: "Little Helpers User Password", 
        htmlBody: accessCode
    });
    return true;
}
function checkUser(user:string, pwInput:string) {
    //bring up user with corresponding code
    var dataBase = PropertiesService.getScriptProperties();
    var pw = dataBase.getProperty(user);
    //test password input with actual password
    var hashedPwInput = pwInput.hashCode();
    var pwMatch = (pw == hashedPwInput);
    Logger.log(hashedPwInput);
    return pwMatch;
}
//creates a hash code from strings
String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char; //(hash * 2 ** 5)-hash; (<< means left shift)
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

//function to give permission
function grantAccess(){
  //instantiate
  var cache = CacheService.getUserCache();
  var user = Session.getActiveUser().getEmail();
  var value = cache.get(user);
  
  //turn value into an object
  var package = JSON.parse(value);
  // edit object value
  package.access = true;
  //cache package as a string
  cache.put(user, JSON.stringify(package), 30*60);
  Logger.log(JSON.parse(cache.get(user)).access);
}
