import React, { Component } from "react";

import styles from "./ProductDetails.module.css";

class ProductTitle extends Component {
  render() {
    const { name, brand, small } = this.props;

    const classes = small ? `${styles.title} ${styles.small}` : styles.title;

    return (
      <h2 className={classes}>
        <span>{brand}</span>
        <span>{name}</span>
      </h2>
    );
  }
}

export default ProductTitle;
