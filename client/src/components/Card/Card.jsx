import React from "react";
import styles from "./Card.module.css";
import img from '../../img/receta.jpg';

export default function Card({ image, title, diets }) {  //paso por prop los componentes imagen ,titulo y dietas
  return (
    <div>
      <img className={styles.img} src={image ? image : img} alt="Img not found" />
      <h3 className={styles.h3}>{title}</h3>
      <label className={styles.label}>Diets: </label>
      {diets?.map((d) => (      //mapeo todo los datos que paso por prop y los renderizo
        <p className={styles.p} key={d}>
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </p>
      ))}
    </div>
  );
}
