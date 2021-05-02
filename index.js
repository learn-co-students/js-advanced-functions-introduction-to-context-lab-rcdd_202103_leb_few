
let createEmployeeRecord = function(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = function(array){
  return array.map(row => createEmployeeRecord(row))
}

let createTimeInEvent=function(employee,date){
  let a=date.split(" ");
  //a contains the date  inedx 0 and the hour  index1
  employee.timeInEvents.push( {type: "TimeIn",date:a[0],hour:parseInt(a[1],10)});
  return employee;

}

let createTimeOutEvent=function(employee,date){
  let a=date.split(" ");
  //a contains the date  inedx 0 and the hour  index1
  employee.timeOutEvents.push( {type: "TimeOut",date:a[0],hour:parseInt(a[1],10)});
  return employee;

}


let hoursWorkedOnDate=function(employee,date){

let e= employee.timeOutEvents.find(em=>em.date===date)
let f=employee.timeInEvents.find(em=>em.date===date)
return (e.hour-f.hour)/100;

}

let wagesEarnedOnDate=function(employee,date){
  return hoursWorkedOnDate(employee,date)*employee.payPerHour;
}

let allWagesFor=function(employee){
let arr= employee.timeInEvents.map(e=> e.date)
return   arr.reduce((acc,value)=>  acc+wagesEarnedOnDate(employee,value),0);
}

let findEmployeeByFirstName=function(srcArray,firstName){
return srcArray.find(e=> e.firstName===firstName)
}

let calculatePayroll=function(arr){
return   arr.reduce((acc,value)=>  acc+allWagesFor(value),0);
}
