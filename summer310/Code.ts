// For CISP 310 Summer 2020

/*
 * This code takes the extensions of certain folder ids as strings and sets them to the called 
 * function. these folder ids are going to vary by professor.  Perhaps we could have new code that
 * requests an input for the URL of a document, then we would filter the URL with the text exceeding
 * the last "/"
 * 
 * The code might look something like this:
 * function getId(url){
 *  return url.match(/[-\w]{25,}/)
 * }
 * this uses regex with strings.  the regex finds anything with latin characters, hypens, and is over 25 characters.
 */

function dailyLogFolderId()
{
  return "1Ov80-oabBfB10ifTpz8P0MRkxw87ktJW"
}

function x1FolderId()
{
  return "1nOAm1HgMkYGh2ZECUTyV-C12ouUUnpPW"
}

function x2FolderId()
{
  return "1mnmERZMOJre8ejSRx2c0yDt19noxdU_-"
}

function fxFolderId()
{
  return '1aKIHZE-5sRstQMG6JgBYUOY7VWKVMgv3'
}

function individualFolderId()
{
  return "1S48UkvYw6eRhUV5xGLLtxt05OtcV7Tkc"
}

function spreadsheetId()
{
  return "1VUHcai7ExKf-RmwXouOjWu45QDw_jOBR17o7yUonirM"
}

/*
 * I haven't found any iterations of "googleDocMimetype" **ASK about it.
 * Document MIME types are used to filter between file types used in Drive and G Suite.
 */

const googleDocMimetype = 'application/vnd.google-apps.document'

/*
 * Generates a student folder within the "Individual Folder ID" folder.
 * Not sure what the 'id' parameter is used for here.
 */

function genFolder(id, name) {
  // id is the student ID, name is the actual name
  var parentFolder = DriveApp.getFolderById(individualFolderId())
  var studentFolder = parentFolder.createFolder(name)
}

/*
 * This is just to test whether the function above worked.
 * Can probably delete.
 */

function testGenFolder()
{
  genFolder('w0006887', 'Auyeung, Tak')
}

/*
 * "1ZNNG3JWbqHyl9x-dOKBhamRDpkXBsX0A" and "1RTeHOcnpyp-HQxtAmSZjxIimQ7yM6Ju2z8JC2-dXeow"
 * are unspecfied files. Will need to ask later what they refer to.
 * the function logs the file MIME type in the console log.
 */
function testMimeType()
{
  var file = DriveApp.getFileById('1ZNNG3JWbqHyl9x-dOKBhamRDpkXBsX0A')
  console.log(file.getMimeType())
  file = DriveApp.getFileById('1RTeHOcnpyp-HQxtAmSZjxIimQ7yM6Ju2z8JC2-dXeow')
  console.log(file.getMimeType())
}

/*
 * .hasNext() is a FileIterator class that returns true if .next() returns an item
 * rather than an exception.  Speaking of which, .next() Gets the next item in the 
 * collection of files or folders. Throws an exception if no items remain.
 *
 * .getBlob() turns data into a blob class--a data interchange for apps script.
 * convertTxt2Doc() takes .PLAIN_TEXT files in the individualFolderId(); iterates
 * through all of them while turning them into a 
 */

function convertTxt2Doc()
{
  var thisFolder = DriveApp.getFolderById(individualFolderId())
  var files = thisFolder.getFilesByType(MimeType.PLAIN_TEXT)
  while (files.hasNext())
  {
    var file = files.next()
    var filename = file.getName()
    var blob = file.getBlob()
    console.log(file.getName())
  }
}

/*
 * document likely refers to a specific document name with its extension
 * wid refers to wid@apps.losrios.edu
 * thisFolder probably refers to the folders listed at the top of the script
 * unfamiliar with "found = found || (wid == e.getEmail()" probably reads like:
 * "found set to found qualified by wid == e.getEmail()" essentially,
 * if wid == e.getEmail(), found will be set to true and false if !=.
 * is unshare a bool?
 *
 * This function takes a document, wid email, a specific folder, and a boolean
 * for whether to unshare or share.
 * Using this information, the function will share the document to the wid as
 * an editor.  Additionally, it will do the opposite if unshare is true.  The
 * Function will check if the wid is within the ".getEditors()" array and 
 * remove the wid as an editor.
 */

function accessControlFile(document, wid, thisFolder, unshare)
{
    console.log(`about to share ${document} with ${wid}`)
    var files = thisFolder.getFilesByName(document)
    while (files.hasNext())
    {
      var file = files.next()
      if (!unshare)
      {
        console.log(`allow ${wid} to access ${document}`)
        file.addEditor(wid)
        
      }
      else
      {
        var editors = file.getEditors()
        var found = false
        editors.forEach(
          function (e)
          {
            found = found || (wid == e.getEmail())
          }
        )
        if (found)
        {
          console.log(`restrict ${wid} from accessing ${document}`)
          file.removeEditor(wid)
        }
      }
    }
}

/*
 * classSize as a constant should probably be a variable if we were to
 * generalize this.
 * 
 * should probably change sheetWidth to an accessible variable.
 * This function creates an array called range that is populated
 * the "students" spreadsheet table size.  
 * ask about the callback
 */

const classSize = 53
function forEachStudent(callback)
{
  const sheetWidth = 8
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId())
  var sheet = spreadsheet.getSheetByName('students')
  var range = sheet.getRange(1,1,classSize,sheetWidth)
  var values = range.getValues()
  for (var i = 0; i < values.length; ++i)
  {
    var wid = `${values[i][0]}@apps.losrios.edu`
    var number = values[i][2]
    callback(wid,number)
  }
}
/*
 * the next three functions are very similar to the one above.  We could probably parameterize
 * this by making some kind of class that includes:
 * sheetwidth, sheetname, classSize, exam
 */
function x1ForEachStudent(callback)
{
  const sheetWidth = 8
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId())
  var sheet = spreadsheet.getSheetByName('x1Schedule')
  var range = sheet.getRange(1,1,classSize,sheetWidth)
  var values = range.getValues()
  for (var i = 0; i < values.length; ++i)
  {
    var wid = `${values[i][0]}`
    var number = values[i][1]
    var timeSlot = values[i][3]
    if (values[i][2])
    {
      callback(wid,number,timeSlot,values[i][4], values[i][5])
    }
  }
}

function x2ForEachStudent(callback)
{
  const sheetWidth = 8
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId())
  var sheet = spreadsheet.getSheetByName('x2Schedule')
  var range = sheet.getRange(1,1,classSize,sheetWidth)
  var values = range.getValues()
  for (var i = 0; i < values.length; ++i)
  {
    var wid = `${values[i][0]}`
    var number = values[i][1]
    var timeSlot = values[i][3]
    if (values[i][2])
    {
      callback(wid,number,timeSlot,values[i][4], values[i][5])
    }
  }
}

function fxForEachStudent(callback)
{
  const sheetWidth = 8
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId())
  var sheet = spreadsheet.getSheetByName('fxSchedule')
  var range = sheet.getRange(1,1,classSize,sheetWidth)
  var values = range.getValues()
  for (var i = 0; i < values.length; ++i)
  {
    var wid = `${values[i][0]}` // creates a string template for wid
    var number = values[i][1]
    var timeSlot = values[i][3]
    if (values[i][2])
    {
      callback(wid,number,timeSlot,values[i][4], values[i][5])
    }
  }
}

/*
 * logs x1ForEachStudent table data into the console log.
 */

function testX1ForEachStudent()
{
  x1ForEachStudent(
    (wid,number,timeSlot,startTime,endTime) =>
    {
    console.log(`${wid},${number},${timeSlot},${startTime.getTime()},${Date.now()}`)
    }
    )
}

/*
 * Not sure what this is for.
 * the "instanceof" operator checks if an object is of a certain class.
 */
function isEmptyString(str)
{
  console.log(str)
  console.log(typeof str)
  console.log(str instanceof String)
  return ((typeof str === "string") || (str instanceof String)) && !str
}

/*
 * Ask about this function.  Should free column be within the brackets?
 * Can't really picture what's going on here.  To my understanding,
 * basically this code counts the number of free columns or where ever
 * nothing is written in a column?
 */

function logNoactivityTime()
{
  var noactivityTime = checkDailyLog()
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId())
  var sheet = spreadsheet.getSheetByName('students')
  var freeColumn
  for (freeColumn = 1; !isEmptyString(sheet.getRange(1,freeColumn,1,1).getValue()); ++freeColumn)
  {
  }
  console.log(`free column at ${freeColumn}`)
  sheet.getRange(1,freeColumn,classSize,1).setValues(noactivityTime)
}

const dailyLog = 'dailyLog'

/*
 * This code populates the daiilyLogFolder with with a dailyLog document for each student.
 * This document says "Daily log for ${wid}."
 * Afterwards, the function sets the name of the file/document to dailyLog-w#######
 */
function createDailyLogs()
{
  var dailyLogFolder = DriveApp.getFolderById(dailyLogFolderId())
  forEachStudent(
      (wid, number) =>
    {
    let filename = `${dailyLog}-${number}`
    
  let files = dailyLogFolder.getFilesByName(filename)
  if (!files.hasNext())
  {
    let content = DocumentApp.create(`Daily log for ${wid}`)
    let file = DriveApp.getFileById(content.getId())
    dailyLogFolder.addFile(file)
    file.setName(filename)
  }
    }
    )
}

/*
 * This function shares each Daily log to the corresponding student.
 * Question 1) why is there if/else statement?  Couldn't we just use while?
 * The function shares "files.next()" to the current wid/student.
 * Wouldn't this mean that each student gets the file after his or hers?
 */
function shareDailyLogs()
{
  var dailyLogFolder = DriveApp.getFolderById(dailyLogFolderId())
  forEachStudent(
      (wid, number) =>
    {
    let filename = `${dailyLog}-${number}`
    
  let files = dailyLogFolder.getFilesByName(filename)
  if (!files.hasNext())
  {
    //this is a good place to insert error handling code
  }
  else
  {
    while (files.hasNext())
    {
      let fileToShare = files.next()
      fileToShare.addEditor(wid)
    }
  }
    }
    )
}

/*
 * Does action 0 allow for a 5 minute headstart on purpose?
 * This code checks if the time is within 5minutes before the start time
 * and the end time.
 * If within the range, the student is an editor.
 * if not within the range, the student is removed as an editor.
 */

function handleX1()
{
  var x1Folder = DriveApp.getFolderById(x1FolderId())
  x1ForEachStudent(
    (wid,number,timeslot,startTime,endTime) =>
    {
    let currentTime = Date.now()
    let action = 0
    if (currentTime >= startTime.getTime()-1000*60*5 && currentTime < endTime.getTime())
    {
      action = 1
    }
    else if (currentTime >= endTime.getTime())
    {
      action = 2
    }
    if (action != 0)
    {
    let filename = `x1-${wid}`
    let files = x1Folder.getFilesByName(filename)
    if (!files.hasNext())
    {
    }
    else
    {
      let wEmail = `${wid}@apps.losrios.edu`
      let fileToHandle = files.next()
      if (action == 1)
      {
       fileToHandle.addEditor(wEmail)
      }
      else if (action == 2)
        {
          let found = false
          let editors = fileToHandle.getEditors()
          editors.forEach(
            e =>
            {
            found = found || (e.getEmail() == wEmail)
            }
            )
          if (found)
          {
          fileToHandle.removeEditor(wEmail)
          }
        }
    }
    }
}
   )     
}

/*
 * this is the same as handleX1, with the difference being,
 * if no action is taking (i.e. action = 0), the console logs
 * the lack of action.
 */

function handleX2()
{
  var x2Folder = DriveApp.getFolderById(x2FolderId())
  x2ForEachStudent(
    (wid,number,timeslot,startTime,endTime) =>
    {
    let currentTime = Date.now()
    let action = 0
    if (currentTime >= startTime.getTime()-1000*60*6 && currentTime < endTime.getTime())
    {
      action = 1
    }
    else if (currentTime >= endTime.getTime())
    {
      action = 2
    }
    if (action != 0)
    {
    let filename = `x2-${wid}`
    let files = x2Folder.getFilesByName(filename)
    if (!files.hasNext())
    {
    }
    else
    {
      let wEmail = `${wid}@apps.losrios.edu`
      let fileToHandle = files.next()
      if (action == 1)
      {
       fileToHandle.addEditor(wEmail)
      }
      else if (action == 2)
        {
          let found = false
          let editors = fileToHandle.getEditors()
          editors.forEach(
            e =>
            {
            found = found || (e.getEmail() == wEmail)
            }
            )
          if (found)
          {
          fileToHandle.removeEditor(wEmail)
          }
        }
    }
    }
    else
    {
      let filename = `x2-${wid}`
      let files = x2Folder.getFilesByName(filename)
      if (!files.hasNext())
      {
        console.log(`this is not good, ${filename} is not found`)
      }
      else
      {
        console.log(`${filename} is found, no action performed`)
      }
    }
}
   )     
}

/*
 * similar to handleX2, except, upon no action, a final exam is searched for
 * then the console logs the start and end times if that file exists.
 */
function handleFx()
{
  var xFolder = DriveApp.getFolderById(fxFolderId())
  fxForEachStudent(
    (wid,number,timeslot,startTime,endTime) =>
    {
    let currentTime = Date.now()
    let action = 0
    if (currentTime >= startTime.getTime()-1000*60*6 && currentTime < endTime.getTime())
    {
      action = 1
    }
    else if (currentTime >= endTime.getTime())
    {
      action = 2
    }
    if (action != 0)
    {
    let filename = `fx-${wid}`
    let files = xFolder.getFilesByName(filename)
    if (!files.hasNext())
    {
    }
    else
    {
      let wEmail = `${wid}@apps.losrios.edu`
      let fileToHandle = files.next()
      if (action == 1)
      {
       fileToHandle.addEditor(wEmail)
      }
      else if (action == 2)
        {
          let found = false
          let editors = fileToHandle.getEditors()
          editors.forEach(
            e =>
            {
            found = found || (e.getEmail() == wEmail)
            }
            )
          if (found)
          {
          fileToHandle.removeEditor(wEmail)
          }
        }
    }
    }
    else
    {
      let filename = `fx-${wid}`
      let files = xFolder.getFilesByName(filename)
      if (!files.hasNext())
      {
        console.log(`this is not good, ${filename} is not found`)
      }
      else
      {
        let timezone = Session.getScriptTimeZone()
        console.log(`${filename} is found, start time is ${Utilities.formatDate(startTime,timezone,"yyyy-MM-dd HH:mm")}, end time is ${Utilities.formatDate(endTime,timezone,"yyyy-MM-dd HH;mm")}, no action performed`)
      }
    }
}
   )     
}

/*
 * the following two functions take two files--their exam and
 * the exam key--and reshare to the student as a viewer rather 
 * than an editor.  
 */

function postX2() {
  var x2Folder = DriveApp.getFolderById(x2FolderId());
  x2ForEachStudent((wid, number, timeslot, startTime, endTime) => {
    let filename = `x2-${wid}`;
    let files = x2Folder.getFilesByName(filename);
    if (!files.hasNext()) {
    } else {
      let wEmail = `${wid}@apps.losrios.edu`;
      let fileToHandle = files.next();
      fileToHandle.addViewer(wEmail);
    }
    filename = `x2k-${wid}`;
    files = x2Folder.getFilesByName(filename);
    if (!files.hasNext()) {
    } else {
      let wEmail = `${wid}@apps.losrios.edu`;
      let fileToHandle = files.next();
      fileToHandle.addViewer(wEmail);
    }
  });
}

function postFx() {
  var xFolder = DriveApp.getFolderById(fxFolderId());
  fxForEachStudent((wid, number, timeslot, startTime, endTime) => {
    let filename = `fx-${wid}`;
    let files = xFolder.getFilesByName(filename);
    if (!files.hasNext()) {
    } else {
      let wEmail = `${wid}@apps.losrios.edu`;
      let fileToHandle = files.next();
      fileToHandle.addViewer(wEmail);
    }
    filename = `fxk-${wid}`;
    files = xFolder.getFilesByName(filename);
    if (!files.hasNext()) {
    } else {
      let wEmail = `${wid}@apps.losrios.edu`;
      let fileToHandle = files.next();
      fileToHandle.addViewer(wEmail);
    }
  });
}

/*
 * this seems to be out of order.  "checkDailyLog()" is mentioned earlier.
 * this function checks the dailyLog folder for when it was last edited
 * and finds the difference between that time and now. This time is then
 * converted from ms to hours.
 */

function checkDailyLog()
{
    var dailyLogFolder = DriveApp.getFolderById(dailyLogFolderId())
    var noactivityTime = []
  forEachStudent(
      (wid, number) =>
    {
    let filename = `${dailyLog}-${number}`
    
  let files = dailyLogFolder.getFilesByName(filename)
  if (!files.hasNext())
  {
    //if this is true, then there is no file in the folder
  }
  else
  {
    while (files.hasNext())
    {
      let fileToCheck = files.next()
      let doc = DocumentApp.openById(fileToCheck.getId())
      let lastUpdateTime = fileToCheck.getLastUpdated()
      console.log(fileToCheck.getName())
      console.log((Date.now() - lastUpdateTime)/(60*60*1000))
      noactivityTime.push([(Date.now() - lastUpdateTime)/(60*60*1000)])
    }
  }
    }
    )
    return noactivityTime
}

/*
 * Populats an array valled values with the values from the data in the "students" spreadsheet.
 * uses the values data to run through a for loop that iterates through the data to either shares
 * or unshares the associated document as a viewer or editor.
 * editNotView is a boolean.
 */

function shareDocument(prefix, editNotView, unshare = false)
{
  const classSize = 51
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId())
  var sheet = spreadsheet.getSheetByName('students')
  var range = sheet.getRange(1,1,classSize,4)
  var values = range.getValues()
  var thisFolder = DriveApp.getFolderById(individualFolderId())
  for (var i = 0; i < values.length; ++i)
  {
    var wid = `w${values[i][0]}@apps.losrios.edu`
    var document = `${prefix}-${values[i][2]}`
    var files = thisFolder.getFilesByName(document)
    while (files.hasNext())
    {
      var file = files.next()
      if (!unshare)
      {
        if (editNotView)
        {
          file.addEditor(wid)
        }
        else
        {
          file.addViewer(wid)
        }
        console.log(`about to share ${document} with ${wid}`)
      }
      else
      {
        var users = editNotView ? file.getEditors() : file.getViewers()
        var found = false
        users.forEach(
          function (e)
          {
            found = found || (wid == e.getEmail()) //using found = found || (bool) ensures that once found is true, it stays true.
          }
        )
        if (found)
        {
          console.log(`about to unshare ${document} with ${wid}`)
          if (editNotView)
          {
            file.removeEditor(wid)
          }
          else
          {
            file.removeViewer(wid)
          }
        }
      }
    }
  }
}

/*
 * Just checks whether a document is past a due date
 */

function checkTime(unshare = false)
{
  var spreadsheet = SpreadsheetApp.openById('1oQ_GMFIGME6gn8r-X3k5gn-etjTepaBDLep8-zf6cUk')
  var sheet = spreadsheet.getSheetByName('students')
  var range = sheet.getRange(1,1,65,4)
  var values = range.getValues()
  var thisFolder = DriveApp.getFolderById(individualFolderId())
  for (var i = 0; i < values.length; ++i)
  {
    var wid = `w${values[i][0]}@apps.losrios.edu`
    var document = `exam-${values[i][2]}`
    console.log(`about to share ${document} with ${wid}`)
    var rightNow = new Date()
    if (rightNow.getTime() >= values[i][3])
    {
      console.log('past due')
    }
    else
    {
      console.log('not past due')
    }
  }
}

function ushareStage1Edit()
{
  shareDocument('stage-1',true,true)
}

function unshareStage2Edit()
{
  shareDocument('stage-2',true,true)
}

function unshareStage3Edit()
{
  shareDocument('stage-3',true,true)
}

function unshareStage4Edit()
{
  shareDocument('stage-4',true,true)
}

function unshareFxEdit()
{
  shareDocument('fx',true,true)
}

function shareFxkView()
{
  shareDocument('fxk',false, false)
}


function unshareDocument(prefix)
{
  shareDocument(prefix,true,true)
}

/*
 * this script apparently takes a string, and uses
 * regular expressions to match it with some pattern or flag
 * then it counts the number of matches with the string and
 * the given pattern and flags
 */

function countMatch(str, pattern, flags)
{
  let result = str.match(new RegExp(pattern, flags))
  if (Array.isArray(result))
  {
    return result.length
  }
  else
  {
    return 0
  }
}

function testCountMatch()
{
  let x = 0
  x = countMatch("adfasdfa","a","g")
  console.log(x)
}

