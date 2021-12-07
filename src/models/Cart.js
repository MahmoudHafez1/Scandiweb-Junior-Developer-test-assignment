class Cart {
  constructor(
    amount,
    prodId,
    prodBrand,
    prodName,
    prodPrice,
    prodImage,
    prodAttributes
  ) {
    this._id = ++Cart.count;
    this.amount = amount;
    this.prodId = prodId;
    this.prodBrand = prodBrand;
    this.prodName = prodName;
    this.prodPrice = prodPrice;
    this.prodImage = prodImage;
    this.prodAttributes = prodAttributes;
  }
  static count = 0;
}

export default Cart;
