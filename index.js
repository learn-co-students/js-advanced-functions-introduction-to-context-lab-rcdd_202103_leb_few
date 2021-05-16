function createEmployeeRecord (row) {
   return {
     firstName: row[0],
     familyName: row[1],
     title: row[2],
     payPerHour: row[3],
     timeInEvents: [],
     timeOutEvents: []
   }
}

 function createEmployeeRecords(data) {
   return data.map(row => createEmployeeRecord(row))
 }

 function createTimeInEvent(obj, fullDate) {
   let [date, hour] = fullDate.split(' ')
   obj.timeInEvents.push({
     type: "TimeIn",
     date,
     hour: parseInt(hour)
   })
   return obj;
 }

function createTimeOutEvent(obj, fullDate) {
  let [date, hour] = fullDate.split(' ')
  obj.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour)
  })
  return obj
}

function hoursWorkedOnDate(obj, date) {
  let timeIn = obj.timeInEvents.find(e => e.date === date);
  let timeOut = obj.timeOutEvents.find(e => e.date === date);
  return ( timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(obj, date) {
  let payM = hoursWorkedOnDate(obj, date) * obj.payPerHour;
  return parseInt(payM);
}

function allWagesFor(obj) {
  let getDate = obj.timeInEvents.map(e => e.date);
  let getPay = getDate.reduce((acc, cur) => { return acc + wagesEarnedOnDate(obj, cur)}, 0)
  return getPay;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(e => e.firstName === firstName)
}

function calculatePayroll(arr) {
  return arr.reduce((acc, cur) => {
    return acc + allWagesFor(cur)
  }, 0)
}
