import React, { Component } from "react";

import Navbar from "./Navbar";
import styles from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <div className={styles.headerContainer}>
        <Navbar />
      </div>
    );
  }
}

export default Header;
