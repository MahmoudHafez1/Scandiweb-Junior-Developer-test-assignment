import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Cart.module.css";
import CartItem from "../../components/CartItem/CartItem";

class Cart extends Component {
  /*
  shouldComponentUpdate(nextProps) {
    if (this.props.cart[0].amount === nextProps.cart[0].amount) return false;
  }
*/
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Cart</h2>
        {this.props.cart.map((cartItem) => (
          <CartItem
            key={cartItem._id}
            {...cartItem}
            prodGallery={cartItem.prodGallery}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, null)(Cart);
