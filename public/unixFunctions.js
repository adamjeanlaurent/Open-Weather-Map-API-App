// returns the date from unix time stamp to May-5-2019 18:16:55 format
exports.convertUnixToDate = function(unixtimestamp){
    // Months array
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // Convert timestamp to milliseconds
    let date = new Date(unixtimestamp*1000);
    // Year
    let year = date.getFullYear();
    // Month
    let month = months_arr[date.getMonth()];
    // Day
    let day = date.getDate();
    // Hours
    let hours = date.getHours();
    // Minutes
    let minutes = "0" + date.getMinutes();
    // Seconds
    let seconds = "0" + date.getSeconds();
    // Display date time in MM-dd-yyyy h:m:s format
    let convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convdataTime;
   }

//returns the date in 5 May format
exports.getMonthFromUnix = function(unixtimestamp){
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date = new Date(unixtimestamp*1000);
    let month = months_arr[date.getMonth()];
    let day = date.getDate();
  return day + " " + month;
  }

//returns the time in AM/PM Format in EST
  exports.timeFromUnix = function(unixtimestamp){
    let date = new Date(unixtimestamp*1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if(minutes < 10){
      minutes = "0" + minutes; 
    }
    if(hours > 12){
      return hours - 12 + ":" + minutes + " PM";
    }
    else if (hours === 12){
      return hours + ":" + minutes + " PM";
    }
    else if (hours < 12){
      return hours + ":" + minutes + " AM";
    }
  }