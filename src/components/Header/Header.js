import React, { Component } from "react";

import Navbar from "./Navbar";
import styles from "./Header.module.css";
import Actions from "./Actions";

class Header extends Component {
  render() {
    return (
      <div className={styles.headerContainer}>
        <Navbar />
        <Actions />
      </div>
    );
  }
}

export default Header;
