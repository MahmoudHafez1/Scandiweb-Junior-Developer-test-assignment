import React, { Component } from "react";

import styles from "./ViewProdAttributes.module.css";
import CartAttrBox from "../AttrBox/CartAttrBox";

class ViewProdAttributes extends Component {
  isSelected(attrName, attrValue) {
    const selectedAttr = this.props.selectedAttributes.find(
      (attr) => attr.name === attrName && attr.value === attrValue
    );
    return selectedAttr ? true : false;
  }

  render() {
    const { attributes, small } = this.props;
    return (
      <div className={styles.selectAttrCont}>
        {attributes.map((attr) => (
          <div key={attr.name} className={styles.selectAttrSetCont}>
            <p className={small ? styles.attrLabelSmall : styles.attrLabel}>
              {attr.name}:
            </p>
            <div className={styles.attrValuesCont}>
              {attr.items.map((item) => (
                <CartAttrBox
                  type={attr.type}
                  value={item.value}
                  isSelected={this.isSelected(attr.name, item.value)}
                  small={small}
                  key={item.value}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ViewProdAttributes;
