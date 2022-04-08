const fs = require('fs');


/**
* Write the user command to the file defined by url. 
* @param url - URL of the file to be written to.
* @param command - user comamnd.
*/
function writeCommand(url, command){
  
  let ts = Date.now();
  
  let date_ob = new Date(ts);
  let year = date_ob.getFullYear();
  let month = (date_ob.getMonth() + 1)/10 >= 1.0 ? date_ob.getMonth()+1 : "0"+(date_ob.getMonth()+1);
  let date = date_ob.getDate()/10 >= 1.0 ? date_ob.getDate() : "0"+date_ob.getDate();
  let hour = date_ob.getHours()/10 >=1.0 ? date_ob.getHours() : "0"+date_ob.getHours();
  let minute = date_ob.getMinutes()/10 >= 1.0 ? date_ob.getMinutes() : "0"+date_ob.getMinutes();
  let second = date_ob.getSeconds()/10 >= 1.0 ? date_ob.getSeconds() : "0"+date_ob.getSeconds();
  let millisecond = date_ob.getMilliseconds();
  
  let currentTimestamp = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second + "." + millisecond + " UTC";
  let content = currentTimestamp + " " + command + "\n";
  
  fs.appendFile(url, content, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}


module.exports = writeCommand;

