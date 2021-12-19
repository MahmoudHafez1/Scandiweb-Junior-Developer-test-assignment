import React, { Component } from "react";

import { runQuery } from "../../adapters/apolloClient";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ProductCardList from "../../components/ProductCardList/ProductCardList";

class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
  }

  fetchProducts = async () => {
    const res = await runQuery(`
       query {
        categories {
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
      const products = [];
      res.categories.forEach((category) => {
        products.push(...category.products);
      });
      this.setState({ products: products, loading: false });
    }
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    if (this.state.loading) return <LoadingScreen />;
    return <ProductCardList products={this.state.products} title="All" />;
  }
}

export default AllProducts;
