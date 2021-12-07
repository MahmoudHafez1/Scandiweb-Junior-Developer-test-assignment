import React, { Component } from "react";

import styles from "./ProductGallery.module.css";

class ProductGallery extends Component {
  state = {
    gallery: this.props.gallery,
    selectedImage: this.props.gallery[0],
  };

  sideImgClickHandler(index) {
    this.setState((state) => {
      return {
        selectedImage: state.gallery[index],
      };
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sideImgContainer}>
          {this.state.gallery.map((image, index) => (
            <img
              src={image}
              key={image}
              alt={`${this.props.id} img`}
              onClick={this.sideImgClickHandler.bind(this, index)}
            />
          ))}
        </div>
        <div className={styles.imgPrevContainer}>
          <img src={this.state.selectedImage} alt={`${this.props.id} img`} />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
