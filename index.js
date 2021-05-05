// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName : arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
    
  };
}

function createEmployeeRecords(arrs){
   return arrs.map(record => {
    return createEmployeeRecord(record)
  })
}

function createTimeInEvent (record, dates){
  let DH = dates.split(" ");
  // console.log(DH[0]);
  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(DH[1] ,10),
    date: DH[0],
  })
  
return record
}


function createTimeOutEvent (record, dates){
  let DH = dates.split(" ");
  // console.log(DH[0]);
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(DH[1] ,10),
    date: DH[0],
  })
  
return record
}

function hoursWorkedOnDate(record, date){
  let IR = record.timeInEvents.find(el =>{
    return el.date === date
  })
  let OR = record.timeOutEvents.find(el =>{
    return el.date === date
  })
  let IH = IR.hour
  let OH = OR.hour
  return ((OH - IH)/100)
}

function wagesEarnedOnDate(record, date){
  let PayOwed = hoursWorkedOnDate(record,date) * record.payPerHour
  return parseInt(PayOwed)
}

function allWagesFor (record){
  let availableDates = record.timeInEvents.map(el=>{return el.date})
  let PayOwedAll = availableDates.reduce((a,c) =>{
  return (a + wagesEarnedOnDate(record,c))
  },0)
  return parseInt(PayOwedAll)
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(record=>{
    return record.firstName === firstName
  })
}

function calculatePayroll(Array){
  return Array.reduce((a,c)=>{
    return a + allWagesFor(c)
  },0)
}