import React, { Component } from "react";

import styles from "./ProductDetails.module.css";

class ProductPrice extends Component {
  render() {
    const { price, small } = this.props;

    const classes = small ? `${styles.price} ${styles.small}` : styles.price;

    return <p className={classes}>{`${price.currSymbol} ${price.amount}`}</p>;
  }
}

export default ProductPrice;
