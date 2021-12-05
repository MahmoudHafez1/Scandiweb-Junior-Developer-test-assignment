import React, { Component } from "react";
import { BsCart2, BsCurrencyDollar } from "react-icons/bs";

import styles from "./Header.module.css";

class Actions extends Component {
  render() {
    return (
      <div className={styles.actionsContainer}>
        <BsCurrencyDollar
          size={20}
          style={{ marginRight: "38" }}
          cursor="pointer"
        />
        <BsCart2 size={20} cursor="pointer" />
      </div>
    );
  }
}

export default Actions;
