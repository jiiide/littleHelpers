function addStudent(data) {
  console.log(data);
}

function getId(url: string){
 console.log(url.match(/[-\w]{25,}/)[0]) 
}

function isAuthorized(email: string){
 var numbers = email.match(/[\d+$]/)
}

isAuthorized