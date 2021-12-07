import React, { Component } from "react";

import { runQuery } from "../../adapters/apolloClient";
import withRouter from "../../helpers/withRouter";
import styles from "./Product.module.css";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import ProductDetails from "../../components/ProductDetails/ProductDetails";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      brand: "",
      name: "",
      description: "",
      prices: [],
      attributes: [],
      gallery: [],
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
        name,
        brand,
        gallery,
        prices,
        attributes,
        description,
      });
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <div className={styles.container}>
        <ProductGallery gallery={this.state.gallery} />
        <ProductDetails
          brand={this.state.brand}
          name={this.state.name}
          description={this.state.description}
          prices={this.state.prices}
          attributes={this.state.attributes}
        />
      </div>
    );
  }
}

export default withRouter(Product);
