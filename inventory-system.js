const Product = require('./product.js');
const Warehouse = require('./warehouse.js');
const writeCommand = require('./write-command.js');
const os = require('os');
const url = os.type() == "Windows_NT"? ".\\commandlog.txt" : "./commandlog.txt";

const STOCKLIMIT = Number.MAX_VALUE;

/**
* Product Inventory System class represents the inventory system 
containing products and warehouses.
*/
class InventorySystem{

  /**
  * Constructor setting arrays for products and warehouses.
  */
  constructor(){
    this.generalProductCatalog = [];
    this.warehouseList = [];

  }

  /**
  * Add the product to the product catalog. Display error if the product already exists in the catalog.
  * @param productName - Name of the product.
  * @param sku - sku ID.
  */
  addProduct(productName, sku){
    let isValidSKU = true;
    for(let i = 0; i < this.generalProductCatalog.length; i++){
      if(this.generalProductCatalog[i].getSku() == sku){
        isValidSKU = false;
        break;
      }
    }

    if(isValidSKU == false){
      let error = "ERROR ADDING PRODUCT PRODUCT with SKU " + sku + " ALREADY EXISTS";
      writeCommand(url, error);
      console.log(error);
    }else{
      let p = new Product(productName, sku);
      this.generalProductCatalog.push(p);
    }

  }


  /**
  * Add the warehouse to the warehouse list and set its stock limit. If the warehouse already exists, 
  * then display the error message.
  * @param warehouseNumber - ID of the warehouse.
  * @param stock_limit - stock limit of the warehouse.
  */
  addWarerhouse(warehouseNumber, stock_limit=STOCKLIMIT){
    let isValidNumber = true;
    
    for(let i = 0; i < this.warehouseList.length; i++){
      if(this.warehouseList[i].getNumber() == warehouseNumber){
        isValidNumber = false;
        break;
      }
    }
    
    if(isValidNumber == false){
      let error = "ERROR ADDING WAREHOUSE WAREHOUSE with NUMBER " + warehouseNumber + " ALREADY EXISTS";
      writeCommand(url, error);
      console.log(error);
    }else{
      let w = new Warehouse(warehouseNumber, stock_limit, []);
      this.warehouseList.push(w);
    }
  }

  /**
  * Return true if the product sku is a valid sku, that is, it is in the product catalog. 
  * Otherwise, return false.
  * @param sku - ID of the product.
  * @return true if sku is in product catalog, false otherwise. In addition, if true, also return the index of 
  *         the product in the catalog.
  */
  isValidSKU(sku){

    for(let i = 0; i < this.generalProductCatalog.length; i++){
      if(this.generalProductCatalog[i].getSku() == sku){
        return [true, i];
      }
    }
    
    return [false, -1];
  }
  
  /**
  * Return true if the warehouse number is a valid number, that is, it is in the warehouse list. 
  * Otherwise, return false.
  * @param warehouseNumber - ID of the warehouse.
  * @return true if sku is in warehouse list, false otherwise. In addition, if true, also return the index of 
  *         the warehouse in the list.
  */
  isValidNumber(warehouseNumber){
    
    for(let i = 0; i < this.warehouseList.length; i++){
      if(this.warehouseList[i].getNumber() == warehouseNumber){
        return [true, i];
      }
    }
    
    return [false, -1];
  }
  
  /**
  * Add the stock of the product to the warehouse. Both sku and warehouse number must be valid in order to add. 
  * In addition, check the stock limit. If the limit is exceeded, add whatever can be added to the warehouse.
  * Display error message if either sku or warehouse number is invalid.
  * @param sku - ID of the product.
  * @param warehouseNumber - ID of the warehouse.
  * @param qty - quantity of the product.
  */
  stock(sku, warehouseNumber, qty){
    let idSku = this.isValidSKU(sku);
    let idNumber = this.isValidNumber(warehouseNumber);
    
    if(idSku[0] == true && idNumber[0] == true){

      let inWarehouseIndex = -1;
      
      for(let i = 0; i < this.warehouseList[idNumber[1]].getProductList().length; i++){
        if(this.warehouseList[idNumber[1]].getProductList()[i].getSku() == sku){
          inWarehouseIndex = i;
          break;
        }
      }
      
      if(inWarehouseIndex == -1){
        this.warehouseList[idNumber[1]].addProductCount(this.generalProductCatalog[idSku[1]], qty, 1);
      }else{
        this.warehouseList[idNumber[1]].addProductCount(inWarehouseIndex, qty, 2);
      }
      
      
    }else if(idSku[0]== false){
      let error = "ERROR STOCK SKU " + sku + " DOES NOT EXIST IN PRODUCT CATALOG";
      writeCommand(url, error);
      console.log(error);
    }else if(idNumber[0] == false){
      let error = "ERROR STOCK WAREHOUSE# " + warehouseNumber + " DOES NOT EXIST";
      writeCommand(url, error);
      console.log(error);
    }
  }

  /**
  * Decrease the stock of the product of the warehouse. Both sku and warehouse number must be valid in order to decrease. 
  * In addition, check the stock count. If there is not enough stock to decrease, then decrease the stock count to 0.
  * Display error message if either sku or warehouse number is invalid.
  * @param sku - ID of the product.
  * @param warehouseNumber - ID of the warehouse.
  * @param qty - quantity of the product.
  */
  unstock(sku, warehouseNumber, qty){
    let idSku = this.isValidSKU(sku);
    let idNumber = this.isValidNumber(warehouseNumber);
    
    if(idSku[0] == true && idNumber[0] == true){
      
      let inWarehouseIndex = -1;
      
      for(let i = 0; i < this.warehouseList[idNumber[1]].getProductList().length; i++){
        if(this.warehouseList[idNumber[1]].getProductList()[i].getSku() == sku){
          inWarehouseIndex = i;
          break;
        }
      }
      
      if(inWarehouseIndex == -1){
        let error = "ERROR UNSTOCK SKU " + sku + " DOES NOT EXIST WAREHOUSE#" + warehouseNumber;
        writeCommand(url, error);
        console.log(error);
      }else{
        this.warehouseList[idNumber[1]].removeProductCount(inWarehouseIndex, qty);
      }
      
      
    }else if(idSku[0]== false){
      let error = "ERROR UNSTOCK SKU " + sku + " DOES NOT EXIST IN PRODUCT CATALOG";
      writeCommand(url, error);
      console.log(error);
    }else if(idNumber[0] == false){
      let error = "ERROR UNSTOCK WAREHOUSE# " + warehouseNumber + " DOES NOT EXIST";
      writeCommand(url, error);
      console.log(error);
    }
  }

  /**
  * Display each product's information.
  * 
  */
  listProducts(){
    this.generalProductCatalog.forEach(p => console.log(p.getProductName() + " " + p.getSku()));
  }

  /**
  * Display each warehouse's information.
  * 
  */
  listWarehouses(){
    console.log("WAREHOUSES");
    for(let i = 0; i < this.warehouseList.length; i++){
      console.log(this.warehouseList[i].getNumber());
    }
  }

  /**
  * Display a specific warehouse's information.
  * @param warehouseNumber - ID of the warehouse.
  */
  listWarehouse(warehouseNumber){
    let index = -1;
    for(let i = 0; i < this.warehouseList.length; i++){
      if(this.warehouseList[i].getNumber() == warehouseNumber){
        index = i;
        break;
      }
    }

    if(index == -1){
      let error = "ERROR LIST WAREHOUSE WAREHOUSE with " + warehouseNumber + " DOES NOT EXIST";
      writeCommand(url, error);
      console.log(error);
    }else{
      console.log("ITEM NAME\t\t\t\t\t\t\t\tITEM_SKU\t\t\t\t\t\t\t\t\tQTY");
      for(let i = 0; i < this.warehouseList[index].getProductList().length; i++){
        this.warehouseList[index].getProductList()[i].printProduct();
      }
    }
  }
}

module.exports = InventorySystem;
