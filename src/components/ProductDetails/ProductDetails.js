import React, { Component } from "react";
import { connect } from "react-redux";

import ProductGallery from "../ProductGallery/ProductGallery";
import { addToCart, removeFromCart } from "../../store/actions";
import styles from "./ProductDetails.module.css";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import selectPrice from "../../helpers/selectPrice";
import ProductTitle from "./ProductTitle";
import SideLabel from "./SideLabel";
import ProductPrice from "./ProductPrice";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      price: {},
      selectedAttributes: [],
    };
    this.descriptionRef = React.createRef();
  }

  componentDidMount() {
    const descriptionBox = this.descriptionRef.current;
    descriptionBox.innerHTML = this.props.description;
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

  removeHandler() {
    this.props.removeCart(1);
  }

  addCartHandler = async () => {
    if (this.state.selectedAttributes.length !== this.props.attributes.length) {
      alert("please select attributes");
      return;
    }

    await this.props.addCart({
      prodName: this.props.name,
      prodPrices: this.props.prices,
      prodBrand: this.props.brand,
      prodGallery: this.props.gallery,
      prodId: this.props.id,
      prodAttributes: this.state.selectedAttributes,
    });

    this.setState({ selectedAttributes: [] });
  };

  selectAttrHandler(attrName, attrType, attrValue) {
    const attrIndex = this.state.selectedAttributes.findIndex(
      (attr) => attr.name === attrName
    );
    if (attrIndex === -1) {
      this.setState((state) => ({
        selectedAttributes: [
          ...state.selectedAttributes,
          { name: attrName, type: attrType, value: attrValue },
        ],
      }));
    } else {
      const newSelectedAttributes = [...this.state.selectedAttributes];
      newSelectedAttributes[attrIndex].value = attrValue;
      this.setState({ selectedAttributes: newSelectedAttributes });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <ProductGallery gallery={this.props.gallery} />
        <div className={styles.detailsContainer}>
          <ProductTitle name={this.props.name} brand={this.props.brand} />
          <ProductAttributes
            attributes={this.props.attributes}
            selectAttrHandler={this.selectAttrHandler.bind(this)}
            selectedAttributes={this.state.selectedAttributes}
            select
          />
          <SideLabel text="PRICE:" />
          <ProductPrice price={this.state.price} />
          <div
            className={styles.addToCartBtn}
            onClick={this.addCartHandler.bind(this)}
          >
            ADD TO CART
          </div>
          <div
            className={styles.descriptionBox}
            ref={this.descriptionRef}
          ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (cartData) => dispatch(addToCart(cartData)),
    removeCart: (cartId) => dispatch(removeFromCart(cartId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
