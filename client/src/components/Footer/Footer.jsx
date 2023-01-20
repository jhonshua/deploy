import React from 'react';
import styles from "./Footer.module.css";
import  facebook from "./img/facebook.png"
import gorjeo from "./img/gorjeo .png"
import instagram from "./img/instagram.png"
import linkedin from "./img/linkedin.png"
import henry from "./img/henry.jpg"

const Footer = () => {
  return (
   <footer className={styles.footer}>


 <div className={styles.contenedor}>

  <ul>
  <a href="https://www.facebook.com/julio.llinas"><img className={styles.img} src= {facebook} alt="Logo not found" /></a>
  <a href="https://twitter.com/LlinasJulio"><img className={styles.img} src={gorjeo} alt="Logo not found" /></a>
  <a href="https://www.instagram.com/clanp/"><img className={styles.img} src={instagram} alt="Logo not found" /></a>
  <a href="https://www.linkedin.com/in/julio-cesar-llinas-ba65a6127/"><img className={styles.img} src={linkedin} alt="Logo not found" /></a>
  <a href="https://www.soyhenry.com/"><img className={styles.img} src={henry} alt="Logo not found"  /></a>
</ul>

<hr />

<h6>@ Realizado por Julio Cesar Llinas 2022.</h6>
 </div>





   </footer>
  )
}

export default Footer