import React, { Component } from "react";

import styles from "./ProductCardList.module.css";
import ProductCard from "../ProductCard/ProductCard";
import ProductModal from "../ProductModal/ProductModal";

class ProductCardList extends Component {
  state = {
    modalProdShow: false,
    modalProdId: null,
  };

  openProdModal(productId) {
    this.setState({
      modalProdShow: true,
      modalProdId: productId,
    });
  }

  closeProdModal() {
    this.setState({ modalProdShow: false });
  }

  render() {
    const { title, products } = this.props;

    return (
      <>
        {this.state.modalProdShow && (
          <ProductModal
            close={this.closeProdModal.bind(this)}
            productId={this.state.modalProdId}
          />
        )}
        <div className={styles.container}>
          <h2 className={styles.title}>
            {title[0].toUpperCase() + title.slice(1)}
          </h2>
          <div className={styles.listCont}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                gallery={product.gallery}
                brand={product.brand}
                name={product.name}
                prices={product.prices}
                inStock={product.inStock}
                openProdModal={this.openProdModal.bind(this, product.id)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ProductCardList;
