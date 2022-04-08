/**
* Warehouse class represents each warehouse object within 
* the Product Inventory System.
*/
class Warehouse{
  
  /**
  * Constructor setting inital data of warehouse number and stock limit.
  * @param warehouseNumber - ID of the warehouse.
  * @param stock_limit - stock limit of the warehouse.
  */
  constructor(warehouseNumber, stock_limit){
    this.warehouseNumber = warehouseNumber;
    this.stock_limit = stock_limit;
    this.stockCount = 0;
    this.productList = [];
  }

  /**
  * Return the warehouse ID.
  * @return warehouseNumber.
  */
  getNumber(){
    return this.warehouseNumber;
  }

  /**
  * Return the product list of the warehouse.
  * @return product list.
  */
  getProductList(){
    return this.productList;

  }
  
  /**
  * Return the stock limit of the warehouse.
  * @return stock limit.
  */
  getStockLimit(){
    return this.stock_limit;
  }
  
  /**
  * Return the total stock count of the warehouse.
  * @return stock count of the warehouse.
  */
  getStockCount(){
    return this.stockCount;
  }
  
  /**
  * Add the product and its count to the warehouse. If the product already exists in the product list, 
  * then only increase the stock count.
  * @param p - either a product class object or an index representing its index in the product list.
  * @param qty - quantity of the product.
  * @param opt - if 1, then add the product, if 2, then increment the product stock count.
  */
  addProductCount(p, qty, opt){
    if(opt == 1){
      if(this.stockCount + qty <= this.stock_limit){
        p.addQty(qty);
        this.productList.push(p);
        this.stockCount += qty;
      }else{
        let toAddQty = this.stock_limit - this.stockCount;
        
        if(toAddQty > 0){
          p.addQty(toAddQty);
          this.productList.push(p);
          this.stockCount += toAddQty;
        }
      }
    }else if(opt == 2){
      if(this.stockCount + qty <= this.stock_limit){
        this.productList[p].addQty(qty);
        this.stockCount += qty;
      }else{
        let toAddQty = this.stock_limit - this.stockCount;
        
        if(toAddQty > 0){
          this.productList[p].addQty(toAddQty);
          this.stockCount += toAddQty;
        }
      }
    }
  }
  
  /**
  * Decrease the product count in the warehouse.
  * @param productIndex - index of the product in the warehouse product list.
  * @param qty - quantity of the product.
  */
  removeProductCount(productIndex, qty){
    if(this.productList[productIndex].getQty() - qty < 0){
      this.productList[productIndex].addQty((-1)*this.productList[productIndex].getQty());
      this.stockCount += this.productList[productIndex].getQty();
    }else if(this.productList[productIndex].getQty() - qty > 0){
      this.productList[productIndex].addQty((-1)*qty);
      this.stockCount += qty;
    }
  }
}

module.exports = Warehouse;


