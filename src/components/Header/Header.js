import React, { Component } from "react";

import Navbar from "./Navbar";
import styles from "./Header.module.css";
import Actions from "./Actions";

class Header extends Component {
  render() {
    return (
      <div className={styles.headerContainer}>
        <Navbar />
        <img src="/logo1.png" className={styles.logo} />
        <img src="/logo2.png" className={styles.logo} />
        <Actions />
      </div>
    );
  }
}

export default Header;
