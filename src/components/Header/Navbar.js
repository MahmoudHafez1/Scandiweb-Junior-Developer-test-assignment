import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Colors from "../../constants/Colors";
import styles from "./Header.module.css";
import { runQuery } from "../../adapters/apolloClient";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const res = await runQuery(`query  {
        categories {
          name
        }
      }`);
    if (res.error) {
      alert("something went wrong");
    } else {
      this.setState({
        categories: res.categories,
      });
    }
  };

  activeLinkStyle({ isActive }) {
    if (isActive)
      return {
        fontWeight: 600,
        borderBottom: `2px solid ${Colors.primary}`,
        color: Colors.primary,
      };
  }

  render() {
    return (
      <ul className={styles.navList}>
        {this.state.categories.map((category) => (
          <li key={category.name}>
            <NavLink
              to={`/${category.name}`}
              style={this.activeLinkStyle}
              className={styles.navLink}
            >
              {category.name.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default Navbar;
