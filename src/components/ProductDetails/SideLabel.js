import React, { Component } from "react";

import styles from "./ProductDetails.module.css";

class SideLabel extends Component {
  render() {
    return <label className={styles.sideLabel}>{this.props.text}</label>;
  }
}

export default SideLabel;
