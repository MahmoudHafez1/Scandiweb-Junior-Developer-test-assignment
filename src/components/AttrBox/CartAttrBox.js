import React, { Component } from "react";

import styles from "./AttrBox.module.css";

class CartAttrBox extends Component {
  attrBoxStyle(type) {
    const classes = [];

    if (type === "swatch") {
      classes.push(styles.colorBox);
    } else {
      if (this.props.small) classes.push(styles.attrBox, styles.disabledBox);
      else classes.push(styles.attrBox);
    }

    if (this.props.isSelected) {
      if (type === "swatch") {
        classes.push(styles.selectedColorBox);
      } else {
        if (this.props.small) classes.pop();
        else classes.push(styles.selectedAttrBox);
      }
    }

    if (this.props.small) classes.push(styles.smallBox);

    classes.push(styles.viewOnly);

    return classes.join(" ");
  }

  colorBoxStyle(type, value) {
    if (type === "swatch")
      return {
        backgroundColor: value,
      };
  }

  render() {
    const { type, value } = this.props;
    return (
      <div
        className={this.attrBoxStyle(type)}
        style={this.colorBoxStyle(type, value)}
      >
        {type === "swatch" ? null : value}
      </div>
    );
  }
}

export default CartAttrBox;
