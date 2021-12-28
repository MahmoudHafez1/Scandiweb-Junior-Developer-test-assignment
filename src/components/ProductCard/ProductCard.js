import React, { Component } from "react";
import selectPrice from "../../helpers/selectPrice";
import { BsCart2 } from "react-icons/bs";
import { connect } from "react-redux";

import styles from "./ProductCard.module.css";
import withRouter from "../../helpers/withRouter";
import ProductModal from "../ProductModal/ProductModal";

class ProductCard extends Component {
  state = {
    price: selectPrice(this.props.prices, this.props.currency),
    modalShow: false,
  };

  openModal(e) {
    e.stopPropagation();
    this.setState({ modalShow: true });
  }

  closeModal() {
    this.setState({ modalShow: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.setState({
        price: selectPrice(this.props.prices, this.props.currency),
      });
    }
  }

  render() {
    const price = Math.round(this.state.price.amount * 100) / 100;
    const { id, name, brand, gallery, inStock, navigate } = this.props;
    return (
      <>
        {this.state.modalShow && (
          <ProductModal close={this.closeModal.bind(this)} productId={id} />
        )}
        <div
          className={`${styles.container} ${
            !inStock && styles.outStockOverlay
          }`}
          onClick={() => navigate(id)}
        >
          <div className={styles.imageContainer}>
            <img src={gallery[0]} alt={name} className={styles.image} />

            {inStock ? (
              <div
                className={styles.cartIcon}
                onClick={this.openModal.bind(this)}
              >
                <BsCart2 size={15} color="#fff" />
              </div>
            ) : (
              <p className={styles.outStockText}>OUT OF STOCK</p>
            )}
          </div>
          <h3 className={styles.title}>{`${brand} ${name}`}</h3>
          <p className={styles.price}>
            {`${this.state.price.currSymbol}${price}`}
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default withRouter(connect(mapStateToProps, null)(ProductCard));
