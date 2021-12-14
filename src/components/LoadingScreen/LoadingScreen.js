import React, { Component } from "react";

import styles from "./LoadingScreen.module.css";

class LoadingScreen extends Component {
  render() {
    return (
      <div className={styles.loading}>
        <div>.</div>
        <div>.</div>
        <div>.</div>
      </div>
    );
  }
}

export default LoadingScreen;
