const Product = require('./product.js');
const Warehouse = require('./warehouse.js');
const InventorySystem = require('./inventory-system.js');
const writeCommand = require('./write-command.js');
const readline = require("readline");
const os = require('os');
const url = os.type() == "Windows_NT"? ".\\commandlog.txt" : "./commandlog.txt";

/**
* Read the user commands and write the commands and errors if any to the command log definted by url.
*/
const rl = readline.createInterface({
  input: process.stdin
});

var userInput = 0;
var sum = 0;

const runCommand = async () => {
  
  let inv = new InventorySystem();
  
  while (userInput !== -1) {
    var answer = await new Promise((resolve) => {
      rl.question(
        "",
        resolve
      );
    });
    
    var userCommand = [];
    
    // Determine the right number of quotes used in the program.
    if((answer.match(new RegExp("\"", "g")) || []).length == 2 || (answer.match(new RegExp("'", "g")) || []).length == 2){
      let item = answer.substring(answer.indexOf("\"")+1, answer.lastIndexOf("\""));
      let firstPart = answer.substring(0, answer.indexOf("\"")).trim();
      let secondPart = answer.substring(answer.lastIndexOf("\"")+1).trim();

      userCommand = userCommand.concat(firstPart.split(" "));
      userCommand.push(item);
      userCommand = userCommand.concat(secondPart.split(" "));
    }else if((answer.match(new RegExp("\"", "g")) || []).length == 0 || (answer.match(new RegExp("'", "g")) || []).length == 0){
      userCommand = answer.split(" ");
    }else{
      answer = "ERROR INCORRECT COMMAND. PLEASE INPUT AGAIN.";
      console.log(answer);
      writeCommand(url, answer);
      continue;
    }
    
    // Determine if each command has the correct number and type in the arguments.
    // If yes, then perform the function. Otherwise, record the error and display it in the terminal.
    if(userCommand.length == 3 && userCommand[0] == "ADD" && userCommand[1] == "WAREHOUSE"){
      if(!isNaN(userCommand[2]) && Number(userCommand[2]) >= 0){
        inv.addWarerhouse(Number(userCommand[2]));
      }else{
        answer = "ERROR WAREHOUSE NUMBER IS NOT VALID.";
        console.log(answer);
      }
    }else if(userCommand.length == 4 && userCommand[0] == "ADD" && userCommand[1] == "WAREHOUSE"){
      if(!isNaN(userCommand[2]) && Number(userCommand[2]) >= 0){
        
        if(!isNaN(userCommand[3]) && Number(userCommand[3]) >= 0){
          inv.addWarerhouse(Number(userCommand[2]), Number(userCommand[3]));
        }else{
          answer = "ERROR WAREHOUSE STOCK LIMIT IS NOT VALID.";
          console.log(answer);
        }
      }else{
        answer = "ERROR WAREHOUSE NUMBER IS NOT VALID.";
        console.log(answer);
      }
      
    }else if(userCommand.length == 2 && userCommand[0] == "LIST" && userCommand[1] == "WAREHOUSES"){
      inv.listWarehouses();
    }else if(userCommand.length == 4 && userCommand[0] == "ADD" && userCommand[1] == "PRODUCT"){
      inv.addProduct(userCommand[2], userCommand[3]);
    }else if(userCommand.length == 2 && userCommand[0] == "LIST" && userCommand[1] == "PRODUCTS"){
      inv.listProducts();
    }else if(userCommand.length == 4 && userCommand[0] == "STOCK"){
      if(!isNaN(userCommand[2]) && Number(userCommand[2]) >= 0){
        if(!isNaN(userCommand[3]) && Number(userCommand[3]) >= 0){
          inv.stock(userCommand[1], Number(userCommand[2]), Number(userCommand[3]));
        }else{
          answer = "ERROR STOCK STOCK QTY IS NOT VALID."
          console.log(answer);
        }
      }else{
        answer = "ERROR STOCK WAREHOUSE# IS NOT VALID.";
        console.log(answer);
      }
    }else if(userCommand.length == 3 && userCommand[0] == "LIST" && userCommand[1] == "WAREHOUSE"){
      if(!isNaN(userCommand[2]) && Number(userCommand[2]) >= 0){
        inv.listWarehouse(Number(userCommand[2]));
      }else{
        answer = "ERROR LIST WAREHOUSE WAREHOUSE# IS NOT VALID.";
        console.log(answer);
      }
    }else if(userCommand.length == 4 && userCommand[0] == "UNSTOCK"){
      if(!isNaN(userCommand[2]) && Number(userCommand[2]) >= 0){
        if(!isNaN(userCommand[3]) && Number(userCommand[3]) >= 0){
          inv.unstock(userCommand[1], Number(userCommand[2]), Number(userCommand[3]));
        }else{
          answer = "ERROR UNSTOCK STOCK QTY IS NOT VALID.";
          console.log(answer);
        }
      }else{
        answer = "ERROR UNSTOCK WAREHOUSE# IS NOT VALID.";
        console.log(answer);
      }
      
    }else{
      answer = "ERROR INCORRECT COMMAND. PLEASE INPUT AGAIN.";
      console.log(answer);
    }
    
    writeCommand(url, answer);
  }
  
  rl.close();
};

runCommand();

