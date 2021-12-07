import React, { Component } from "react";

import styles from "./ProductDetails.module.css";

class ProductAttributes extends Component {
  state = {
    attributes: this.props.attributes,
  };

  render() {
    return (
      <div className={styles.attributesCont}>
        {this.state.attributes.map((attr) => (
          <div key={attr.name} className={styles.attrSetCont}>
            <p className={styles.sideTitle}>{attr.name}:</p>
            <div className={styles.attrValuesCont}>
              {attr.items.map((item) => (
                <div className={styles.attrValueBox} key={item.value}>
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
