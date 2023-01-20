import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory } from "react-router-dom";
import { postRecipe, getAllDiets, cleanRecipes, getAllRecipes } from "../../redux/actions";
import validate from "./validate/validate";
import swal from "sweetalert";
import Footer from '../Footer/Footer'
import NavBar2 from './NavBar2/NavBar2'

import styles from "./CreateRecipe.module.css";

export default function CreateRecipe() {

  const dispatch = useDispatch();
  const history = useHistory(); //hook  ... 
  const allRecipes = useSelector((state) => state.allRecipes);
  const allDiets = useSelector((state) => state.allDiets);
  const [errors, setErrors] = useState({});

  // ESTADOS LOCALES ---------------------------------------------------------------------
  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "",
    diets: [],
  });

  // HANDLES ----------------------------------------------------------------------------

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  // SELECCIONAR DIETA:

  const handleCheckDiet = (e) => {
    if (e.target.checked && !input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    } else if (!e.target.checked) {
      setInput({
        ...input,
        diets: input.diets.filter((d) => d !== e.target.value),
      });
    }
  };

  // REVISIÓN DEL FORMULARIO -------------------------al generar el evento submit

  const handleSubmit = (e) => {

    e.preventDefault();      // evitr se recarge la pagina al oprimir el boton del formulario

    if (Object.keys(errors).length !== 0) {
      swal("Oops", "Complete the form!", "error");     //si la lonitud de los caracteres es menor de 0 sale el mensaje complete el formulario
    } else if (!input.title.length) { // si el titulo esta vacio 
      swal("The title is required");
    } else if (!input.diets.length) { //si la longitud de dieta es cero enviara el mesj selecione una dieta
      swal("Select at least one diet");
    } else if (
      allRecipes.find(
        (r) => r.title.toLowerCase() === input.title.toLowerCase()
      )
    ) {
      swal("Incorrect", `The ${input.title} already exists`, "error");//si titulo de la receta exite enviara el msj que ya existe la receta
    } else {
      dispatch(postRecipe(input));  //si todo esta correcto envia post con los datos
      
      swal("Success", "¡Your recipe is created!", "success");
      
      setInput({         
        title: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: [],
      });


      history.push("/home");
      dispatch(cleanRecipes());
      dispatch(getAllRecipes());
    }
  };

  useEffect(() => {
    dispatch(getAllDiets());
    dispatch(getAllRecipes());
  }, [dispatch]);

  //--------------------------------------------------------------------------------------
  return (
    <div className={styles.create}>

      <NavBar2/>
 <div className={styles.titulo}> Create Recipe</div> 
      <div className={styles.container}>

       
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>

          <div className={styles.header}>

            <label className={styles.label}> Title: </label>

            <input
              type="text"
              name="title"
              placeholder="Title"
              autoComplete="off"
              value={input.title}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            ></input>

            {errors.title && <p className={styles.p}>{errors.title}</p>}

            <label className={styles.label}>Summary: </label>

            <textarea
              type="text"
              name="summary"
              maxLength="1000"
              placeholder="Summary of your recipe"
              rows="10"
              autoComplete="off"
              value={input.summary}
              onChange={(e) => handleChange(e)}
              className={styles.textarea}
            ></textarea>

            {errors.summary && <p className={styles.p}>{errors.summary}</p>}
            <label className={styles.label}>Steps: </label>
            <textarea
              type="text"
              name="steps"
              placeholder="Steps of your recipe"
              autoComplete="off"
              value={input.instructions}
              onChange={(e) => handleChange(e)}
              className={styles.textarea}
            ></textarea>
            {errors.steps && <p className={styles.p}>{errors.steps}</p>}
            <label className={styles.label}>Health Score: </label>
            <input
              type="number"
              min="0"
              max="100"
              name="healthScore"
              placeholder="1"
              value={input.healthScore}
              onChange={(e) => handleChange(e)}
              className={styles.input2}
            ></input>
            {errors.healthScore && (
              <p className={styles.p}>{errors.healthScore}</p>
            )}
            <br />
            <label className={styles.label}>Image: </label>
            <input
              type="url"
              name="image"
              placeholder="Enter the url"
              autoComplete="off"
              value={input.image}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            ></input>
            {errors.image && <p className={styles.p}>{errors.image}</p>}
            <button className={styles.b}>¡Create my recipe!</button>
          </div>
          <div className={styles.diets}>

            <label className={styles.labelD}> Select the Diets: </label>
            <br />
                  <br />
            {allDiets?.map((d) => {
              return (
                <ul key={d.id}>

                  <div>


                  <div>

                    {d.name.charAt(0).toUpperCase() + d.name.slice(1)}

                  
                  </div>

                 

                  <input
                    type="checkbox"
                    name={d.name}
                    value={d.name}
                    onChange={(e) => handleCheckDiet(e)}
                    className={styles.names}
                  /> 

               



                  </div>

                 
                 
                  

                </ul>
              );
            })}
          </div>
        </form>
      </div>
    

            <Footer/>

    </div>
  );
}
