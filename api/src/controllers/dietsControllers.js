const { Diet } = require("../db");

const getDiets = async () => {
  let diets = [
    "dairy free",
    "gluten free",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "whole 30",
  ];
  try {
    const dietTypes = await Promise.all(
      diets.map(async (dieta) => {
        return await Diet.findOrCreate({
          where: { name: dieta },
          defaults: {
            name: dieta,
          },
        });
      })
    );
    return dietTypes;
  } catch (error) {
    throw error;
  }
};

module.exports = { getDiets };
