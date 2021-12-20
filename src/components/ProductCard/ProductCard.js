import React, { Component } from "react";
import selectPrice from "../../helpers/selectPrice";
import { BsCart2 } from "react-icons/bs";
import { connect } from "react-redux";

import styles from "./ProductCard.module.css";
import withRouter from "../../helpers/withRouter";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      price: {},
    };
  }

  componentDidMount() {
    this.setState({
      price: selectPrice(this.props.prices, this.props.currency),
    });
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
    return (
      <div
        className={`${styles.container} ${
          !this.props.inStock && styles.outStockOverlay
        }`}
      >
        <div className={styles.imageContainer}>
          <img
            onClick={() => this.props.navigate(this.props.id)}
            src={this.props.gallery[0]}
            alt={this.props.name}
            className={styles.image}
          />

          {this.props.inStock ? (
            <div className={styles.cartIcon} onClick={this.props.openProdModal}>
              <BsCart2 size={20} color="#fff" />
            </div>
          ) : (
            <p className={styles.outStockText}>OUT OF STOCK</p>
          )}
        </div>
        <div onClick={() => this.props.navigate(this.props.id)}>
          <h3
            className={styles.title}
          >{`${this.props.brand} ${this.props.name}`}</h3>
          <p className={styles.price}>
            {`${this.state.price.currSymbol}${price}`}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default withRouter(connect(mapStateToProps, null)(ProductCard));
