import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./ProductModal.module.css";
import { runQuery } from "../../adapters/apolloClient";
import ProductDetails from "../ProductDetails/ProductDetails";
import { addToCart } from "../../store/actions";

class AttrModal extends Component {
  state = {
    product: null,
  };

  fetchProduct = async () => {
    const res = await runQuery(`query {
    product (id:"${this.props.productId}") {
      brand
      name
      gallery
      prices {
        currency
        amount
      }
      attributes {
        name
        type
        items {
          value
        }
      }
    }
  }`);
    if (res.error) {
      alert("something went wrong");
    } else {
      if (res.product.attributes.length === 0) {
        const { id, name, brand, prices, gallery } = res.product;
        this.props.addToCart({
          prodId: id,
          prodName: name,
          prodPrices: prices,
          prodBrand: brand,
          prodGallery: gallery,
          prodAttributes: [],
          selectedAttributes: [],
        });
        this.props.close();
      } else {
        this.setState({
          product: res.product,
        });
      }
    }
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    if (!this.state.product) return null;
    return (
      <>
        <div className={styles.overlay} onClick={this.props.close}></div>
        <div className={styles.prodModal}>
          <ProductDetails {...this.state.product} overlay />
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (cartData) => dispatch(addToCart(cartData)),
});

export default connect(null, mapDispatchToProps)(AttrModal);
