import React, { Component } from "react";

import styles from "./Modal.module.css";

class Modal extends Component {
  render() {
    return (
      <>
        {this.props.overlay && (
          <div className={styles.overlay} onClick={this.props.close}></div>
        )}
        <div className={styles.container}>{this.props.children}</div>
      </>
    );
  }
}

export default Modal;
