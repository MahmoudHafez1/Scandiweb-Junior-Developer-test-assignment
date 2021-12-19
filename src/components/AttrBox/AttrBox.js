import React, { Component } from "react";

import styles from "./AttrBox.module.css";

class AttrBox extends Component {
  attrBoxStyle(type) {
    let classes = [];

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

  colorBoxStyle(value) {
    return {
      backgroundColor: value,
    };
  }

  render() {
    const { type, value } = this.props;
    return (
      <div
        className={this.attrBoxStyle(type)}
        onClick={this.props.onClick}
        style={type === "swatch" ? this.colorBoxStyle(value) : null}
      >
        {type === "swatch" ? null : value}
      </div>
    );
  }
}

export default AttrBox;
