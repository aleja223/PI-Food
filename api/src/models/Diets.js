const { DataTypes, Sequelize } = require("sequelize");

module.exports = (Sequelize) => {
  Sequelize.define(
    "Diet",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
