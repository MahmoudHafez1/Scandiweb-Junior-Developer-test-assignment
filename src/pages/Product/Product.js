import React, { Component } from "react";

import styles from "./Product.module.css";
import { runQuery } from "../../adapters/apolloClient";
import withRouter from "../../helpers/withRouter";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      productDetails: {
        brand: "",
        name: "",
        description: "",
        prices: [],
        attributes: [],
        gallery: [],
      },
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  fetchProductDetails = async () => {
    const res = await runQuery(`
         {
             product(id: "${this.props.params.productId}") {
                 gallery
                 brand
                 name
                 description
                 prices {
                    currency
                    amount
                  }
                  attributes {
                    name
                    type
                    items {
                      value
                      displayValue
                    }
                  }
             }
         }
      `);

    if (res.error) alert("something went wrong");
    else {
      const { name, brand, gallery, description, prices, attributes } =
        res.product;

      this.setState({
        productDetails: {
          id: this.props.params.productId,
          name,
          brand,
          gallery,
          prices,
          attributes,
          description,
        },
        loading: false,
      });
    }
  };

  render() {
    if (this.state.loading) return <LoadingScreen />;

    return (
      <div className={styles.container}>
        <ProductDetails {...this.state.productDetails} />
      </div>
    );
  }
}

export default withRouter(Product);
