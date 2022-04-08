/**
* Product class represents each product object within 
* the Product Inventory System.
*/
class Product{

  /**
  * Constructor setting inital data of product name, sku and quantity.
  * @param productName - Name of the product.
  * @param sku - sku ID.
  * @param qty - quantity of the product.
  */
  constructor(productName, sku, qty = 0){
    this.productName = productName;
    this.sku = sku;
    this.qty = qty;
  }

  /**
  * Display the product information.
  *
  */
  printProduct(){
    let item = this.productName + "\t\t\t\t" + this.sku + "\t\t\t\t" + this.qty;
    console.log(item);
  }

  /**
  * Return the sku id.
  * @return sku.
  */
  getSku(){
    return this.sku;
  }
  
  /**
  * Return the product name.
  * @return product name.
  */
  getProductName(){
    return this.productName;
  }
  
  /**
  * Return the quantity of the product.
  * @return quantity of the product.
  */
  getQty(){
    return this.qty;
  }
  
  /**
  * Add the new quantity to the product.
  * 
  */
  addQty(newQty){
    this.qty += newQty;
  }
}

module.exports = Product;
