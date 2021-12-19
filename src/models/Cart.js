class Cart {
  constructor(
    amount,
    prodId,
    prodBrand,
    prodName,
    prodPrices,
    prodGallery,
    prodAttributes,
    selectedAttributes
  ) {
    this._id = ++Cart.count;
    this.amount = amount;
    this.prodId = prodId;
    this.prodBrand = prodBrand;
    this.prodName = prodName;
    this.prodPrices = prodPrices;
    this.prodGallery = prodGallery;
    this.prodAttributes = prodAttributes;
    this.selectedAttributes = selectedAttributes;
  }
  static count = 0;
}

export default Cart;
