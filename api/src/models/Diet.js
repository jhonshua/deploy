const { DataTypes } = require('sequelize'); //Sequelize proporciona una gran cantidad de tipos de datos integrados . Para acceder a un tipo de datos incorporado, debe importar DataTypes. https://sequelize.org/docs/v7/other-topics/other-data-types/
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diet', {    //sequelize.define(modelName, attributes, options) https://sequelize.org/docs/v6/core-concepts/model-basics/
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};