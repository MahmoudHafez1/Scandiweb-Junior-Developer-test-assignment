import React, { Component } from "react";

import styles from "./ProductModal.module.css";
import { runQuery } from "../../adapters/apolloClient";
import ProductDetails from "../ProductDetails/ProductDetails";

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
      this.setState({
        product: res.product,
      });
    }
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    return (
      <>
        <div className={styles.overlay} onClick={this.props.close}></div>
        <div className={styles.prodModal}>
          {this.state.product && (
            <ProductDetails {...this.state.product} overlay />
          )}
        </div>
      </>
    );
  }
}

export default AttrModal;
