import React, { Component } from "react";

import styles from "./AttrBox.module.css";

class AttrBox extends Component {
  attrBoxStyle(type) {
    const classes = [];

    if (type === "swatch") {
      classes.push(styles.colorBox);
    } else {
      classes.push(styles.attrBox);
    }

    if (this.props.isSelected) {
      if (type === "swatch") {
        classes.push(styles.selectedColorBox);
      } else {
        classes.push(styles.selectedAttrBox);
      }
    }

    return classes.join(" ");
  }

  colorBoxStyle(type, value) {
    if (type === "swatch")
      return {
        backgroundColor: value,
      };
  }

  render() {
    const { type, value, onClick } = this.props;
    return (
      <div
        className={this.attrBoxStyle(type)}
        onClick={onClick}
        style={this.colorBoxStyle(type, value)}
      >
        {type === "swatch" ? null : value}
      </div>
    );
  }
}

export default AttrBox;
