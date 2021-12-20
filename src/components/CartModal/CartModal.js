import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CartModal.module.css";
import CartItem from "../CartItem/CartItem";
import { getCurrSymbol } from "../../helpers/selectPrice";

class CartModal extends Component {
  calcTotalPrice() {
    let price = 0;
    this.props.cart.forEach((item) => {
      price +=
        item.prodPrices.find(
          (prodPrice) => prodPrice.currency === this.props.currency
        ).amount * item.amount;
    });
    return Math.round(price * 100) / 100;
  }

  render() {
    if (this.props.cart.length === 0) {
      return <div className={styles.emptyBag}>Bag is Empty</div>;
    }

    return (
      <div className={styles.container}>
        <p className={styles.title}>
          <span>{`My Bag, `}</span>
          {`${this.props.cart.length} items`}
        </p>
        <div className={styles.cartItemsCont}>
          {this.props.cart.map((cartItem) => (
            <CartItem
              key={cartItem._id}
              {...cartItem}
              prodGallery={cartItem.prodGallery}
              small
            />
          ))}
        </div>
        <div className={styles.totalContainer}>
          <p>Total</p>
          <p>{`${getCurrSymbol(
            this.props.currency
          )} ${this.calcTotalPrice()}`}</p>
        </div>
        <div className={styles.actionContainer}>
          <Link to={"/cart"} className={styles.viewBagLink}>
            <div className={styles.viewBag} onClick={this.props.close}>
              VIEW BAG
            </div>
          </Link>
          <div className={styles.checkout}>CHECKOUT</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps)(CartModal);
