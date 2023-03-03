const Sequelize = require("sequelize");
const database = require("./db");

const Apartment = database.define("apartment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number_rooms: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  rent_value: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  tenant_id: {
    type: Sequelize.INTEGER,
    // O apartamento pode não ter um inquilino
    allowNull: true,
    references: { model: "tenants", key: "id" },
  },
  building_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: "buildings", key: "id" },
  },
});

module.exports = Apartment;
