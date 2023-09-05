const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
