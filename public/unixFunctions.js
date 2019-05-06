// Display date time in MM-dd-yyyy h:m:s format
exports.convertUnixToMMDDYYYY = function(unixTimeStamp){
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // Convert timestamp to milliseconds
    let date = new Date(unixTimeStamp*1000);
    let year = date.getFullYear();
    let month = months_arr[date.getMonth()];
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let convertTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convertTime;
   }

//returns the date in 5 May format
exports.convertUnixToDayMonth = function(unixTimeStamp){
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date = new Date(unixTimeStamp*1000);
    let month = months_arr[date.getMonth()];
    let day = date.getDate();
  return day + " " + month;
  }

//returns the time in AM/PM Format in EST
  exports.convertUnixToAMPM = function(unixTimeStamp){
    let date = new Date(unixTimeStamp*1000);
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