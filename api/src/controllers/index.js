const axios = require('axios');// importamos axios 
const { Recipe, Diet } = require('../db.js');


/*Axios es un cliente HTTP basado en promesasnode.js para el navegador. 
Es isomorfo (= puede ejecutarse en el navegador y nodejs con la misma base de código). 
En el lado del servidor usa el httpmódulo nativo node.js, mientras que en el cliente (navegador)
 usa XMLHttpRequests. */


 
// GET API INFO : ------------------------------------------------------fuente : https://axios-http.com/
const getApiInfo = async () => {
    try {
        let info = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5') // nos conectamos a nuestra api  pedimos la info de las 100 primeras paginas

        let recipes = info.data.results.map(r => {
            return {
                id: r.id,
                title: r.title, 
                image: r.image,
                summary: r.summary,
                healthScore: r.healthScore,
                diets: r.diets,
                steps: (r.analyzedInstructions[0] && r.analyzedInstructions[0].steps ? r.analyzedInstructions[0].steps.map(e => e.step).join("| ") : 'No hay pasos')
            }
        });
        return recipes;

    } catch (error) {
        console.log('ERROR EN getApiInfo/controllers', error);  // si tenemos un error en api lo manejamos con un mensaje por consola
    }
};

// GET DB INFO -------------------------------------------------------
const getDBInfo = async () => {
    try {
        const dbInfo = await Recipe.findAll({   // traemos la info cargada en nuestra base datos
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
        var dato = JSON.parse(JSON.stringify(dbInfo, null, 2));
        dato.forEach((e) => (e.diets = e.diets.map((d) => d.name)));
        return dato;

    } catch (error) {               // cualquier error al traer la informacion lo manejamos con un mensaje por consola
        console.log('ERROR EN getDBInfo/controllers', error);
    }
};

// GET TOTAL INFO (API + DB) -----------------------------------------
const getTotalInfo = async () => {
    try {
        const apiInfo = await getApiInfo();  // espera retorne la imfo de la api
        const dbInfo = await getDBInfo();    //espera reorne la info de la base datos food
        return [...apiInfo, ...dbInfo];   //retorna tada la info 

    } catch (error) {
        console.log('ERROR EN getTotalInfo/controllers', error);   //si tengo un error sea trayendo la info de api o de mi base datos lo mnejamos cpasando un mensaje por consola
    }
};

// GET ALL DIETS 
const getAllDiets = async () => {
    try {
        // si ya está cargada mi db no hago nada
        const preDiets = await Diet.findAll();
        if (preDiets.length) {   //si esxiste las retornamos y si no las creamos.
            return preDiets;
        }

        const typesDiets = [
            "gluten free",
            "dairy free",
            "ketogenic",
            "lacto ovo vegetarian",
            "vegan",
            "pescatarian",
            "paleolithic",
            "primal",
            "fodmap friendly",
            "whole 30",
        ];

        typesDiets.forEach(diet => {
            Diet.findOrCreate({
                where: { name: diet }
            });
        });

        let diets = await Diet.findAll();       //como es asiconcrona esperamos ejecute y luego retornamos todas las dietas
        return diets;

    } catch (error) {                 // si tenemos un error enviamos a consola un mensaje
        console.log('ERROR EN getAllDiets/controllers', error);
    }
};

//----------------------------------------------------------------------
module.exports = { getApiInfo, getDBInfo, getTotalInfo, getAllDiets }
