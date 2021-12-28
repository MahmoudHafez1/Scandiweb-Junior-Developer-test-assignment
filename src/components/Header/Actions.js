import React, { Component } from "react";
import { BsCart2 } from "react-icons/bs";

import { connect } from "react-redux";
import Modal from "../UI/Modal";
import styles from "./Header.module.css";
import { runQuery } from "../../adapters/apolloClient";
import { getCurrSymbol } from "../../helpers/selectPrice";
import { updateCurrency } from "../../store/actions";
import CartModal from "../CartModal/CartModal";

class Actions extends Component {
  state = {
    currListShow: false,
    cartShow: false,
    currencyList: [],
    selectedCurrency: "$",
  };

  showCurrListToggle() {
    this.setState((state) => ({
      cartShow: false,
      currListShow: !state.currListShow,
    }));
  }

  showCartToggle() {
    this.setState((state) => ({
      currListShow: false,
      cartShow: !state.cartShow,
    }));
  }

  componentDidMount() {
    this.fetchCurrencyList();
  }

  fetchCurrencyList = async () => {
    const res = await runQuery(`{
      currencies
    }`);
    if (res.error) {
      alert("something went wrong");
    } else {
      const currencyList = [];
      res.currencies.forEach((curr) => {
        currencyList.push({ name: curr, symbol: getCurrSymbol(curr) });
      });
      this.setState({ currencyList });
    }
  };

  currencyClickHandler(curr) {
    this.props.updateCurrency(curr.name);
    this.setState({ selectedCurrency: curr.symbol });
  }

  render() {
    const { cart } = this.props;

    return (
      <div className={styles.actionsContainer}>
        <div
          className={styles.showCurrAction}
          onClick={this.showCurrListToggle.bind(this)}
        >
          <div className={styles.currency}>{this.state.selectedCurrency}</div>

          {this.state.currListShow ? (
            <div className={styles.upArrow}>
              <span>&#8963;</span>
            </div>
          ) : (
            <div className={styles.downArrow}>
              <span>&#8964;</span>
            </div>
          )}
        </div>
        <div
          className={styles.cartAction}
          onClick={this.showCartToggle.bind(this)}
        >
          <div>
            <BsCart2 size={20} />
          </div>
          {cart.length > 0 ? (
            <div className={styles.cartNotf}>{cart.length}</div>
          ) : null}
        </div>

        {this.state.currListShow && (
          <Modal>
            <div
              className={styles.currListCont}
              onClick={this.showCurrListToggle.bind(this)}
            >
              {this.state.currencyList.map((curr) => (
                <div
                  key={curr.name}
                  onClick={this.currencyClickHandler.bind(this, curr)}
                >
                  {`${curr.symbol} ${curr.name}`}
                </div>
              ))}
            </div>
          </Modal>
        )}
        {this.state.cartShow && (
          <Modal close={this.showCartToggle.bind(this)} overlay>
            <CartModal cart={cart} close={this.showCartToggle.bind(this)} />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrency: (currency) => dispatch(updateCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
