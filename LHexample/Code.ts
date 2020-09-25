function emailResults() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet()  
  //declaration of block scoped variables; spreadsheet now refers to spreadsheet this function is called on
  let sheet = spreadsheet.getSheetByName("fxScoring") 
  /*
    sheet only refers to final exam scores; this could probably be parameterized
    something like this:
    function emailResults(test) { 
    ...
    let sheet = spreadsheet.getSheetByName(test)
    ...
  */
  let range = sheet.getRange(1,1,28,10) // getRange describes the table coordinates; could use "A1:J28" instead, will probably have to parameterize for UI
  let questions = []
  range.getMergedRanges().forEach(
      mr =>
    {
      let startColumn = mr.getColumn()
      let endColumn = mr.getLastColumn()
    questions.push({ mergedRange: mr})
    }
    )

  // now prepare results for each student
    let studentRange = sheet.getRange("A3:A28")
    for (let row = 3; row <= 29; ++row)
      {
        // each row only has one column
        let studentId = range.getCell(row,1).getValue().toString().padStart(7,0) 
        /* 
          adds a zero to the front of the string until its 7 characters long for a wID
          this accounts for student IDs that start with a 0.  Google Sheets removes preliminary 0s.
          ex) 0123456 would be 123456 in sheets.  
        */
        let emailAddress = `w${studentId}@apps.losrios.edu`
        let report = ""
        report += "<h1>Final Assessment scoring report</h1>\n" // heading
        report += "<ul>\n" //unordered list
        questions.forEach(
          q =>
          {
          report += `<li>${q.mergedRange.getDisplayValue()} <ul>\n`
            for (let column = q.mergedRange.getColumn(); column <= q.mergedRange.getLastColumn(); ++column)
            {
              report += `<li>${range.getCell(2,column).getDisplayValue()}: ${range.getCell(row,column).getDisplayValue()}</li>`
              
            }
          report += "</ul></li>\n"//unordered list with list item; so displayed in bullet points
          }
        )
        report += "</ul>\n"
        console.log(report)
        MailApp.sendEmail(
          {
            to: emailAddress,
            replyTo: "w0006887@apps.losrios.edu",
            subject: "CISP310 Su20 Final Assessment scoring report", 
            cc: "w0006887@apps.losrios.edu",
            htmlBody: report
        /*
          Lines 35-59 creates email addresses out of the array of studentId created in line 29.
          Then, email reports are constructed using array values obtained from questions in line 14.
        */          
          }
        )
      }    
}

function emailTimeslot() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getSheetByName("x2Schedule")
  let range = sheet.getRange(1,1,53,6)
  // now prepare results for each student
    let studentRange = sheet.getRange("A3:A29")
    for (let row = 1; row <= 53; ++row)
      {
        // each row only has one column
        let studentId = range.getCell(row,1).getValue().toString().padStart(7,0)
        let emailAddress = `${studentId}@apps.losrios.edu`
        let report = ""
        report += "<h1>Exam 2 schedule</h1>\n" // heading
        report += "<ul>\n"
        report += `<li>Starts at ${range.getCell(row,5).getDisplayValue()}</li>\n`
        report += `<li>Ends at ${range.getCell(row,6).getDisplayValue()}</li>\n`
        report += "</ul>\n"
        console.log(report)
        if (1)
        {
        MailApp.sendEmail(
          {
            to: emailAddress,
            replyTo: "w0006887@apps.losrios.edu",
            subject: "CISP310 Su20 Exam 2 schedule",
            cc: "w0006887@apps.losrios.edu",
            htmlBody: report
          }
        )
        }
      }
    
}