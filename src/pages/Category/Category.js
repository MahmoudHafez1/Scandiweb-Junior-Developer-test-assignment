import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";

import styles from "./Category.module.css";
import { runQuery } from "../../adapters/apolloClient";
import ProductCard from "../../components/ProductCard/ProductCard";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  fetchProducts = async () => {
    const res = await runQuery(`
       query {
            category(input:{title:"${this.props.params.category}"}){
                products {
                    id
                    brand
                    name
                    inStock
                    gallery
                    prices {
                      currency
                      amount
                    }
                  }
            }
        }
    `);
    if (res.error) {
      alert("something went wrong");
    } else {
      this.setState({ products: res.category.products });
    }
  };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.category != this.props.params.category) {
      this.fetchProducts();
    }
  }

  render() {
    const category = this.props.params.category;
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          {category[0].toUpperCase() + category.slice(1)}
        </h2>

        <div className={styles.productListCont}>
          {this.state.products.map((product, index) => (
            <ProductCard
              key={product.id}
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

export default withRouter(Category);
