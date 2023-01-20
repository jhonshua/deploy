import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getAllDiets,
  filterDiets,
  orderTitle,
  orderHealthScore,
  cleanRecipes,
} from "../../redux/actions";

import styles from "./Filters.module.css";

export default function Filters({ setOrder }) {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.allDiets);

  // FILTRADOS ----------------------------------------------------

  //genera patch filtrado por dietas
  const handleFilterDiets = (e) => {
    e.preventDefault();
    dispatch(filterDiets(e.target.value));
  };

  // ORDENAMIENTOS ------------------------------------------------
  //por titulo
  const handleOrderTitle = (e) => {
    e.preventDefault();
    dispatch(orderTitle(e.target.value));
    setOrder(e.target.value);
  };

  const handleOrderScore = (e) => {
    e.preventDefault();
    dispatch(orderHealthScore(e.target.value));
    setOrder(e.target.value);
  };

  // LIMPIAR FILTRADOS -------------------------------------------
  const handleClean = (e) => {    //
    e.preventDefault(); //evitar que el navegador se vuelva a cargar/actualizar .
    dispatch(cleanRecipes()); //genera dos dispatch
    dispatch(getAllRecipes()); 
  };

  //---------------------------------------------------------------
  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  // ---------------------------------------------------------------

  return (

    <div className={styles.filters}>
      <button className={styles.reset} onClick={(e) => handleClean(e)}>

        Reload
        
      </button>

      <select className={styles.select} onChange={(e) => handleFilterDiets(e)}>
        <option value="all">Select Diet</option>
        {allDiets?.map((d) => {

          return (


            <option key={d.id} value={d.name}>
              {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
            </option>
          );
        })}
      </select>
      <select className={styles.select} onChange={(e) => handleOrderTitle(e)}>
        <option value="ALL">By Title</option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </select>
      <select className={styles.select} onChange={(e) => handleOrderScore(e)}>
        <option value="ALL">By HealthScore</option>
        <option value="MIN">- HealthScore</option>
        <option value="MAX">+ HealthScore</option>
      </select>
    </div>
  );
}
