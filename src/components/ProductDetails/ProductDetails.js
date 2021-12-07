import React, { Component } from "react";

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

  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span>{this.props.brand}</span>
          <span>{this.props.name}</span>
        </h2>
        <ProductAttributes attributes={this.props.attributes} />
        <p className={styles.sideTitle}>PRICE:</p>
        <p className={styles.price}>{this.state.price}</p>
        <div className={styles.addToCartBtn}>ADD TO CART</div>
        <div className={styles.descriptionBox} ref={this.descriptionRef}></div>
      </div>
    );
  }
}

export default ProductDetails;
