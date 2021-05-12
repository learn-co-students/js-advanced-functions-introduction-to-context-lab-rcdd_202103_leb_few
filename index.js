// Your code here
function createEmployeeRecord(array){
  let obj = {
    'firstName': array[0],
    'familyName': array[1],
    'title': array[2],
    'payPerHour': array[3],
    'timeInEvents': [],
    'timeOutEvents': []
  }
  return obj;
}

function createEmployeeRecords(array){
  let result = array.map(function(arr){
    return createEmployeeRecord(arr);
  })
  return result;
}

function createTimeInEvent(employee, date){
  let dateArr = date.split(" ");
  let obj = {
    'type': "TimeIn",
    'hour': parseInt(dateArr[1]),
    'date': dateArr[0],
  }
  employee.timeInEvents.push(obj);
  return employee;
}

function createTimeOutEvent(employee, date){
  let dateArr = date.split(" ");
  let obj = {
    'type': "TimeOut",
    'hour': parseInt(dateArr[1]),
    'date': dateArr[0],
  }
  employee.timeOutEvents.push(obj);
  return employee;
}

function hoursWorkedOnDate(employee, date){
  let dateInObj = employee.timeInEvents.find(function(obj){
    return obj.date === date;
  });
  let dateOutObj = employee.timeOutEvents.find(function(obj){
    return obj.date === date;
  });
  let time = dateOutObj.hour - dateInObj.hour;
  return time/100;
}

function wagesEarnedOnDate(employee, date){
  let hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

function allWagesFor(employee){
  let result = employee.timeInEvents.reduce(function(accumulator, current){
    return accumulator + wagesEarnedOnDate(employee, current.date);
  }, 0);
  return result;
}

function findEmployeeByFirstName(employees, firstName){
  let result = employees.find(function(employee){
    return employee.firstName === firstName;
  })
  return result;
}

function calculatePayroll(employees){
  let result = employees.reduce(function(accumulator, current){
    return accumulator + allWagesFor(current);
  }, 0);
  return result;
}
