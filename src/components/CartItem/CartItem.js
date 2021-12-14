import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./CartItem.module.css";
import prodAttrStyles from "../ProductAttributes/ProductAttributes.module.css";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import { incrementCartItem, removeFromCart } from "../../store/actions";
import selectPrice from "../../helpers/selectPrice";
import ProductTitle from "../ProductDetails/ProductTitle";
import ProductPrice from "../ProductDetails/ProductPrice";

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
    const { _id, prodName, prodBrand, prodGallery, prodAttributes, amount } =
      this.props;

    const cartTotalPrice = {
      amount: Math.round(this.state.price.amount * amount * 100) / 100,
      currSymbol: this.state.price.currSymbol,
    };

    let attrBoxStyle = prodAttrStyles.attrBox;

    if (this.props.small) {
      attrBoxStyle = `${prodAttrStyles.attrBox} ${prodAttrStyles.smallBox}`;
    }

    return (
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <ProductTitle
            name={prodName}
            brand={prodBrand}
            small={this.props.small}
          />
          <ProductPrice price={cartTotalPrice} small={this.props.small} />
          <ProductAttributes
            attributes={prodAttributes}
            small={this.props.small}
          />
        </div>
        <div className={styles.amountImgCont}>
          <div className={styles.amountCont}>
            <div
              className={attrBoxStyle}
              style={{ margin: 0 }}
              onClick={this.props.incrItem.bind(this, _id)}
            >
              +
            </div>
            <p>{amount}</p>
            <div
              className={attrBoxStyle}
              style={{ margin: 0 }}
              onClick={this.props.decrItem.bind(this, _id)}
            >
              -
            </div>
          </div>
          <div className={styles.imgCont}>
            <img src={prodGallery[this.state.imageIndex]} alt={prodName} />
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
