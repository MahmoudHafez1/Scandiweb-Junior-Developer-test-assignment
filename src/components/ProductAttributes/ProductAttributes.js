import React, { Component } from "react";

import styles from "./ProductAttributes.module.css";

class ProductAttributes extends Component {
  state = {
    attributes: this.props.attributes,
  };

  attrBoxStyle(attrName, attrType, attrValue) {
    let classes = [];

    if (attrType === "swatch") {
      classes.push(styles.colorBox);
    } else {
      classes.push(styles.attrBox);
    }

    const attr = this.props.selectedAttributes.find(
      (attr) => attr.name === attrName && attr.value === attrValue
    );
    const isSelected = attr ? true : false;

    if (isSelected) {
      if (attrType === "swatch") {
        classes.push(styles.selectedColorBox);
      } else {
        classes.push(styles.selectedAttrBox);
      }
    }

    return classes.join(" ");
  }

  cartAttrBoxStyle(attrType, isSmall) {
    let classes = [];
    if (attrType !== "swatch") {
      classes = [styles.attrBox, styles.selectedAttrBox];
    } else {
      classes = [styles.colorBox];
    }

    if (isSmall) {
      classes.push(styles.smallBox);
    }

    classes.push(styles.viewOnly);

    return classes.join(" ");
  }

  render() {
    return (
      <div
        className={
          this.props.select ? styles.selectAttrCont : styles.viewAttrCont
        }
      >
        {this.state.attributes.map((attr) => (
          <div
            key={attr.name}
            className={
              this.props.select
                ? styles.selectAttrSetCont
                : styles.viewAttrSetCont
            }
          >
            <p
              className={`${styles.attrLabel} ${
                this.props.small ? styles.attrLabelSmall : null
              }`}
            >
              {attr.name}:
            </p>

            <div className={styles.attrValuesCont}>
              {this.props.select ? (
                attr.items.map((item) => (
                  <div
                    className={this.attrBoxStyle(
                      attr.name,
                      attr.type,
                      item.value
                    )}
                    key={item.value}
                    onClick={this.props.selectAttrHandler.bind(
                      this,
                      attr.name,
                      attr.type,
                      item.value
                    )}
                    style={
                      attr.type === "swatch"
                        ? { backgroundColor: item.value }
                        : {}
                    }
                  >
                    {attr.type === "swatch" ? null : item.value}
                  </div>
                ))
              ) : (
                <div
                  className={this.cartAttrBoxStyle(attr.type, this.props.small)}
                  style={
                    attr.type === "swatch"
                      ? { backgroundColor: attr.value }
                      : {}
                  }
                >
                  {attr.type === "swatch" ? null : attr.value}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
