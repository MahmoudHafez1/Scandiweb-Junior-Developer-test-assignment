import React, { Component } from "react";

import styles from "./ProductDetails.module.css";

class ProductPrice extends Component {
  render() {
    const classes = this.props.small
      ? `${styles.price} ${styles.small}`
      : styles.price;

    return (
      <p
        className={classes}
      >{`${this.props.price.currSymbol} ${this.props.price.amount}`}</p>
    );
  }
}

export default ProductPrice;
