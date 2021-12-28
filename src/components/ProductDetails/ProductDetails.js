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
    const { overlay, description, prices, currency } = this.props;
    if (!overlay) {
      const descriptionBox = this.descriptionRef.current;
      descriptionBox.innerHTML = description;
    }
    this.setState({
      price: selectPrice(prices, currency),
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
    const { id, name, prices, brand, gallery, attributes } = this.props;
    await this.props.addToCart({
      prodId: id,
      prodName: name,
      prodPrices: prices,
      prodBrand: brand,
      prodGallery: gallery,
      prodAttributes: attributes,
      selectedAttributes: selectedAttributes,
    });
  };

  render() {
    const { name, brand, gallery, attributes, overlay, inStock } = this.props;

    return (
      <>
        {!overlay && <ProductGallery gallery={gallery} name={name} />}
        <div className={styles.detailsContainer}>
          <div className={styles.titleCont}>
            <ProductTitle name={name} brand={brand} />
          </div>
          <SelectProdAttributes
            attributes={attributes}
            price={this.state.price}
            addToCart={this.addCartHandler.bind(this)}
            outStock={!inStock && !overlay}
          />
          {!overlay && (
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
    addToCart: (cartData) => dispatch(addToCart(cartData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
