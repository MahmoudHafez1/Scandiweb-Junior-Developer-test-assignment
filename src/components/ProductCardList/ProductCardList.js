import React, { Component } from "react";

import styles from "./ProductCardList.module.css";
import ProductCard from "../ProductCard/ProductCard";

class ProductCardList extends Component {
  render() {
    const { title, products } = this.props;

    return (
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
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductCardList;
