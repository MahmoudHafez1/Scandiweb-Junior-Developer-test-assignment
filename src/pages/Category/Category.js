import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";

import { runQuery } from "../../adapters/apolloClient";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ProductCardList from "../../components/ProductCardList/ProductCardList";

class Category extends Component {
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
      this.setState({ products: res.category.products, loading: false });
    }
  };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.category !== this.props.params.category) {
      this.fetchProducts();
    }
  }

  render() {
    if (this.state.loading) return <LoadingScreen />;
    const category = this.props.params.category;
    return <ProductCardList products={this.state.products} title={category} />;
  }
}

export default withRouter(Category);
