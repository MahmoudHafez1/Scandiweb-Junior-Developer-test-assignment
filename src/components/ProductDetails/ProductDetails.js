import React, { Component } from "react";
import { connect } from "react-redux";

import { addToCart, removeFromCart } from "../../store/actions/cartActions";
import styles from "./ProductDetails.module.css";
import ProductAttributes from "./ProductAttributes";
import { getCurrSymbol } from "../../helpers/currencySymbol";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      price: "",
    };
    this.descriptionRef = React.createRef();
  }

  componentDidMount() {
    const descriptionBox = this.descriptionRef.current;
    descriptionBox.innerHTML = this.props.description;
    const curr = "USD";
    const currSymbol = getCurrSymbol(curr);
    const price = this.props.prices.find((price) => price.currency === curr);
    this.setState({
      price: currSymbol + price.amount,
    });
  }

  removeHandler() {
    this.props.removeCart(1);
  }

  addCartHandler() {
    this.props.addCart({
      prodName: "nike",
      prodPrice: 10,
      prodBrand: "Addidas",
      prodGallery: "aaa",
      prodId: "25",
      prodAttributes: [{ name: "size", value: "S" }],
    });
    this.props.addCart({
      prodName: "nike",
      prodPrice: 10,
      prodBrand: "Addidas",
      prodGallery: "aaa",
      prodId: "25",
      prodAttributes: [{ name: "size", value: "S" }],
    });
  }

  render() {
    console.log(this.props.cart);
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span>{this.props.brand}</span>
          <span>{this.props.name}</span>
        </h2>
        <ProductAttributes attributes={this.props.attributes} />
        <p className={styles.sideTitle}>PRICE:</p>
        <p className={styles.price}>{this.state.price}</p>
        <div
          className={styles.addToCartBtn}
          onClick={this.addCartHandler.bind(this)}
        >
          ADD TO CART
        </div>
        <div
          className={styles.addToCartBtn}
          onClick={this.removeHandler.bind(this)}
        >
          Remove
        </div>

        <div className={styles.descriptionBox} ref={this.descriptionRef}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (cartData) => dispatch(addToCart(cartData)),
    removeCart: (cartId) => dispatch(removeFromCart(cartId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
