import React, { Component } from "react";

import styles from "./SelectProdAttributes.module.css";
import AttrBox from "../AttrBox/AttrBox";
import SideLabel from "../ProductDetails/SideLabel";
import ProductPrice from "../ProductDetails/ProductPrice";

class SelectProdAttributes extends Component {
  state = {
    selectedAttributes: [],
    allAttrSelected: false,
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

  isSelected(attrName, attrValue) {
    const selectedAttr = this.state.selectedAttributes.find(
      (attr) => attr.name === attrName && attr.value === attrValue
    );
    return selectedAttr ? true : false;
  }

  addToCartHandler() {
    this.props.addToCart(this.state.selectedAttributes);
    this.setState({ selectedAttributes: [] });
  }

  componentDidMount() {
    this.checkSelectedAttr();
  }

  componentDidUpdate(_, prevState) {
    if (
      this.state.selectedAttributes.length !==
      prevState.selectedAttributes.length
    ) {
      this.checkSelectedAttr();
    }
  }

  checkSelectedAttr() {
    this.setState((state) => ({
      allAttrSelected:
        this.props.attributes.length === state.selectedAttributes.length,
    }));
  }

  render() {
    return (
      <>
        {this.props.attributes.map((attr) => (
          <div key={attr.name} className={styles.selectAttrSetCont}>
            <p className={styles.attrLabel}>{attr.name}:</p>
            <div className={styles.attrValuesCont}>
              {attr.items.map((item) => (
                <AttrBox
                  onClick={this.selectAttrHandler.bind(
                    this,
                    attr.name,
                    attr.type,
                    item.value
                  )}
                  type={attr.type}
                  value={item.value}
                  isSelected={this.isSelected(attr.name, item.value)}
                  key={item.value}
                />
              ))}
            </div>
          </div>
        ))}
        <div className={styles.priceCont}>
          <SideLabel text="PRICE:" />
          <ProductPrice price={this.props.price} />
        </div>

        {this.state.allAttrSelected ? (
          <div
            className={styles.addToCartBtn}
            onClick={this.addToCartHandler.bind(this)}
          >
            ADD TO CART
          </div>
        ) : (
          <div className={`${styles.addToCartBtn} ${styles.disable}`}>
            ADD TO CART
          </div>
        )}
      </>
    );
  }
}

export default SelectProdAttributes;
