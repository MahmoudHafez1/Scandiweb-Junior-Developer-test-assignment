import React, { Component } from "react";
import { connect } from "react-redux";

import ProductGallery from "../ProductGallery/ProductGallery";
import styles from "./ProductDetails.module.css";
import ProductTitle from "./ProductTitle";
import SelectProdAttributes from "../SelectProdAtrributes/SelectProdAttributes";
import { addToCart } from "../../store/actions";
import selectPrice from "../../helpers/selectPrice";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      price: {},
    };
    this.descriptionRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.overlay) {
      const descriptionBox = this.descriptionRef.current;
      descriptionBox.innerHTML = this.props.description;
    }
    this.setState({
      price: selectPrice(this.props.prices, this.props.currency),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.setState({
        price: selectPrice(this.props.prices, this.props.currency),
      });
    }
  }

  addCartHandler = async (selectedAttributes) => {
    await this.props.addCart({
      prodName: this.props.name,
      prodPrices: this.props.prices,
      prodBrand: this.props.brand,
      prodGallery: this.props.gallery,
      prodId: this.props.id,
      prodAttributes: this.props.attributes,
      selectedAttributes: selectedAttributes,
    });
  };

  render() {
    return (
      <>
        {!this.props.overlay && <ProductGallery gallery={this.props.gallery} />}
        <div className={styles.detailsContainer}>
          <div className={styles.titleCont}>
            <ProductTitle name={this.props.name} brand={this.props.brand} />
          </div>
          <SelectProdAttributes
            attributes={this.props.attributes}
            price={this.state.price}
            addToCart={this.addCartHandler.bind(this)}
          />
          {!this.props.overlay && (
            <div
              className={styles.descriptionBox}
              ref={this.descriptionRef}
            ></div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (cartData) => dispatch(addToCart(cartData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
