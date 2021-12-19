import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./CartItem.module.css";
import { incrementCartItem, removeFromCart } from "../../store/actions";
import selectPrice from "../../helpers/selectPrice";
import ProductTitle from "../ProductDetails/ProductTitle";
import ProductPrice from "../ProductDetails/ProductPrice";
import ViewProdAttributes from "../ViewProdAttributes/ViewProdAttributes";

class CartItem extends Component {
  state = {
    imageIndex: 0,
    price: {},
  };

  componentDidMount() {
    this.setState({
      price: selectPrice(this.props.prodPrices, this.props.currency),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.setState({
        price: selectPrice(this.props.prodPrices, this.props.currency),
      });
    }
  }

  nextImgHandler() {
    if (this.state.imageIndex < this.props.prodGallery.length - 1)
      this.setState((state) => ({
        imageIndex: state.imageIndex + 1,
      }));
  }

  prevImageHandler() {
    if (this.state.imageIndex > 0)
      this.setState((state) => ({
        imageIndex: state.imageIndex - 1,
      }));
  }

  render() {
    const {
      _id,
      prodName,
      prodBrand,
      prodGallery,
      prodAttributes,
      selectedAttributes,
      amount,
      small,
    } = this.props;

    const cartTotalPrice = {
      amount: Math.round(this.state.price.amount * amount * 100) / 100,
      currSymbol: this.state.price.currSymbol,
    };

    return (
      <div className={styles.container}>
        <div className={styles.prodDetailsCont}>
          <ProductTitle name={prodName} brand={prodBrand} small={small} />
          <div className={small ? null : styles.priceCont}>
            <ProductPrice price={cartTotalPrice} small={small} />
          </div>

          <ViewProdAttributes
            attributes={prodAttributes}
            selectedAttributes={selectedAttributes}
            small={small}
          />
        </div>
        <div className={styles.amountImgCont}>
          <div className={styles.amountCont}>
            <div
              className={`${styles.plusMinusBox} ${
                small ? styles.smallBox : null
              }`}
              onClick={this.props.incrItem.bind(this, _id)}
            >
              +
            </div>
            <p>{amount}</p>
            <div
              className={`${styles.plusMinusBox} ${
                small ? styles.smallBox : null
              }`}
              onClick={this.props.decrItem.bind(this, _id)}
            >
              -
            </div>
          </div>
          <div
            className={this.props.small ? styles.imgContSmall : styles.imgCont}
          >
            <img
              src={prodGallery[this.state.imageIndex]}
              alt={prodName}
              className={styles.selectedImg}
            />
            <div className={styles.arrowsCont}>
              <div
                className={styles.arrowBox}
                onClick={this.prevImageHandler.bind(this)}
              >
                &lt;
              </div>
              <div
                className={styles.arrowBox}
                onClick={this.nextImgHandler.bind(this)}
              >
                &gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

const mapDispatchToProps = (dispatch) => ({
  incrItem: (itemId) => dispatch(incrementCartItem(itemId)),
  decrItem: (itemId) => dispatch(removeFromCart(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
