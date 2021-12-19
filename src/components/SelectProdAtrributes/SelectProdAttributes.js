import React, { Component } from "react";

import styles from "./SelectProdAttributes.module.css";
import AttrBox from "../AttrBox/AttrBox";

class SelectProdAttributes extends Component {
  isSelected(attrName, attrValue) {
    const selectedAttr = this.props.selectedAttributes.find(
      (attr) => attr.name === attrName && attr.value === attrValue
    );
    return selectedAttr ? true : false;
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
                  onClick={() => {
                    this.props.selectAttrHandler(
                      attr.name,
                      attr.type,
                      item.value
                    );
                  }}
                  type={attr.type}
                  value={item.value}
                  isSelected={this.isSelected(attr.name, item.value)}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default SelectProdAttributes;
