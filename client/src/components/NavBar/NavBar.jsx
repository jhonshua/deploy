import React from 'react';
import comida from '../../img/comida.png'
import { Link } from "react-router-dom";
import SearchBar from './SearchBar/SearchBar';
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <header className={styles.header}>
    <img
      className={styles.imge}
      id="logo"
      src={comida}
      alt="Logo not found"
     
    />
    <div className={styles.titulo}>Food App</div>
    <Link to={'/create'}>
      <button className={styles.button}>Create recipe</button>
    </Link>
  <SearchBar/>
  </header>
  );
}
