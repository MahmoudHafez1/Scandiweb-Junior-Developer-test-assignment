import React, { Component } from "react";

import styles from "./Modal.module.css";

class Modal extends Component {
  render() {
    const { overlay, close, children } = this.props;
    return (
      <>
        {overlay && <div className={styles.overlay} onClick={close}></div>}
        <div className={styles.container}>{children}</div>
      </>
    );
  }
}

export default Modal;
