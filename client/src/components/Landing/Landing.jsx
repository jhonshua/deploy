import React from "react";
import { Link } from "react-router-dom";
import videoBg from './y2mate.com - Video de Producto Gastronómico_1080p.mp4';
import styles from "./Landing.module.css";




export default function Landing() {
  return (
    <div className={styles.main}>

      <video src={videoBg} autoPlay loop muted />

    <div className={styles.content}>

     <h1 className={styles.h1}>¡ Welcome !</h1><br/>
     
    <Link to="/home">
    <button className={styles.button}>Go Home</button>
    </Link>


    </div>

  
  
</div>
  );
}



/*

Fuente del video : https://www.youtube.com/watch?v=ZRQeBKTbzYk 

La landing Page debe tener alguna imagen de fondo
representativa al proyecto


Una landing page, o página de aterrizaje, es una página web diseñada específicamente para convertir visitantes en leads.

https://www.40defiebre.com/que-es/landing-page 

https://www.youtube.com/watch?v=LSRNmhLS76o&t=364s (guia como pooner video fondo)


Nota: la idea es mejorar la esperiencia de usario que la landing page sea una introduccion al contenido

*/