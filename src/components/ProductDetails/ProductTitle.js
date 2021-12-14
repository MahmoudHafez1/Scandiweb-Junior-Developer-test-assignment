import React, { Component } from "react";

import styles from "./ProductDetails.module.css";

class ProductTitle extends Component {
  render() {
    const classes = this.props.small
      ? `${styles.title} ${styles.small}`
      : styles.title;

    return (
      <h2 className={classes}>
        <span>{this.props.brand}</span>
        <span>{this.props.name}</span>
      </h2>
    );
  }
}

export default ProductTitle;
