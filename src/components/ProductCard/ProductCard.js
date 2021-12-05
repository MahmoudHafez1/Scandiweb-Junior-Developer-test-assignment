import React, { Component } from "react";
import { getCurrSymbol } from "../../helpers/currencySymbol";
import { BsCart2 } from "react-icons/bs";

import styles from "./ProductCard.module.css";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      price: "",
    };
  }

  viewSelectedCurrency() {
    const price = this.props.prices.find((price) => price.currency === "USD");
    const currSymbol = getCurrSymbol(price.currency);
    this.setState({
      price: `${currSymbol}${price.amount}`,
    });
  }

  componentDidMount() {
    this.viewSelectedCurrency();
  }

  render() {
    return (
      <div
        className={`${styles.container} ${
          !this.props.inStock && styles.outStockOverlay
        }`}
      >
        <div className={styles.imageContainer}>
          <img src={this.props.gallery[0]} className={styles.image} />

          {this.props.inStock ? (
            <div className={styles.cartIcon}>
              <BsCart2 size={20} color="#fff" />
            </div>
          ) : (
            <p className={styles.outStockText}>OUT OF STOCK</p>
          )}
        </div>
        <h3
          className={styles.title}
        >{`${this.props.brand} ${this.props.name}`}</h3>
        <p className={styles.price}>{this.state.price}</p>
      </div>
    );
  }
}

export default ProductCard;
