function createEmployeeRecord(array){
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(aOfArray){

  return aOfArray.map(function(array){
    return createEmployeeRecord(array)
  })
}


function createTimeInEvent(obj, dateStamp){
   
    let [date, hour] = dateStamp.split(" ")
    obj.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    })
    return obj
  }


function createTimeOutEvent(obj, dateStamp){
   
      let [date, hour] = dateStamp.split(" ")
  
      obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
      })
      return obj

}

function hoursWorkedOnDate(obj, soughtDate){
 
  let inEvent = obj.timeInEvents.find(function(e){
    return e.date === soughtDate
  })
  let outEvent = obj.timeOutEvents.find(function(e){
    return e.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour)/100

}

function wagesEarnedOnDate(obj, soughtDate){
  let hours = hoursWorkedOnDate(obj, soughtDate)
  return (obj.payPerHour * hours)
}

function allWagesFor(obj){
  
  let total = 0
  for (let i = 0; i < obj.timeInEvents.length; i++){
    total += wagesEarnedOnDate(obj, obj.timeInEvents[i].date)
  }
  return total
}

function findEmployeeByFirstName(srcArray, string){
  return srcArray.find(function(record){
    return record.firstName === string
  })
}



  let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

// }
