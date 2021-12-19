import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./ProductCardList.module.css";
import ProductCard from "../ProductCard/ProductCard";

class ProductCardList extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          {this.props.title[0].toUpperCase() + this.props.title.slice(1)}
        </h2>
        <div className={styles.listCont}>
          {this.props.products.map((product) => (
            <Link
              to={`${product.id}`}
              key={product.id}
              style={{
                display: "grid",
                textDecoration: "none",
                cursor: "default",
              }}
            >
              <ProductCard
                gallery={product.gallery}
                brand={product.brand}
                name={product.name}
                prices={product.prices}
                inStock={product.inStock}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductCardList;
