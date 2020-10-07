function addStudent(data) {
  console.log(data);
}

function getId(url: string){
 console.log(url.match(/[-\w]{25,}/)[0]);
}

function isProfessor(email: string) {
  var hasDomain = /@arc.losrios.edu/.test(email);
  var hasNumbers = /\d+/.test(email);
  if(hasDomain && !hasNumbers){
      console.log(`${email} is a Professor.`)
  }
  else{
      console.log(`${email} is not a valid email.`)
  }
}
//still needs to email a code; also needs a popup that blocks
//webApp usage