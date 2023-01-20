import React from 'react';
import comida from '../../../img/comida.png'
import { Link } from "react-router-dom";
import styles from "./NavBar2.module.css";

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
    <Link to={'/Home'}>
      <button className={styles.button}>Home</button>
    </Link>

  </header>
  );
}
