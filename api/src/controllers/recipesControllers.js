const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

const allRecipesApi = async () => {
  try {
    const apiRequest = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );

    const apiData = apiRequest.data.results;

    const recipes = apiData.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title.toLowerCase(),
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions
          .map((instruction) => {
            return instruction.steps.map((singleStep) => {
              return `Step ${singleStep.number}: ${singleStep.step}`;
            });
          })
          .flat(),
        image: recipe.image,
        diets: recipe.diets || [],
        createdInDb: false,
      };
    });

    return recipes;
  } catch (error) {
    throw new Error(error.message);
  }
};

const apiById = async (id) => {
  try {
    const foundRecipe = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    if (!foundRecipe.data) {
      throw new Error(`No se encontró la receta con el ID ${id}`);
    }

    return foundRecipe.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const apiByName = async (name) => {
  try {
    const everyApiRecipe = await allRecipesApi();
    if (!everyApiRecipe) throw new Error("error en la API");

    const coincidencias = [];

    everyApiRecipe.forEach((recipe) => {
      if (recipe.name.includes(name.toLowerCase())) {
        coincidencias.push(recipe);
      }
    });

    return coincidencias;
  } catch (error) {
    throw new Error(error.message);
  }
};

const allRecipesDb = async () => {
  try {
    const apiRecipes = await allRecipesApi();

    if (!apiRecipes || apiRecipes.length === 0) {
      return [];
    }

    const uniqueDiets = new Set();
    apiRecipes.forEach((recipe) => {
      if (recipe.diets && recipe.diets.length > 0) {
        recipe.diets.forEach((diet) => {
          uniqueDiets.add(diet);
        });
      }
    });

    const dietsToCreate = Array.from(uniqueDiets);
    await Promise.all(
      dietsToCreate.map(async (dietName) => {
        await Diet.findOrCreate({
          where: { name: dietName },
          defaults: { name: dietName },
        });
      })
    );

    const recipesFromDb = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
      },
    });

    const recipesWithDiets = recipesFromDb.map((recipe) => ({
      id: recipe.dataValues.id,
      name: recipe.dataValues.name,
      summary: recipe.dataValues.summary,
      healthScore: recipe.dataValues.healthScore,
      image: recipe.dataValues.image,
      steps: recipe.dataValues.steps,
      createdInDb: true,
      diets: recipe.dataValues.diets
        ? recipe.dataValues.diets.map((diet) => diet.name)
        : [],
    }));

    return recipesWithDiets;
  } catch (error) {
    throw new Error(error.message);
  }
};

const dbById = async (id) => {
  try {
    const recipe = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
      },
    });

    if (!recipe) {
      throw new Error(`No existe receta de ID ${id}`);
    }

    const { name, summary, healthScore, steps, image, createdInDb, diets } =
      recipe.dataValues;

    const dietsArray = diets ? diets.map((diet) => diet.name) : [];

    const result = {
      id,
      name,
      summary,
      healthScore,
      steps,
      image,
      createdInDb,
      diets: dietsArray,
    };

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const dbByName = async (name) => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: {
        model: Diet,
        attributes: ["name"],
      },
    });

    return recipes;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  allRecipesApi,
  apiById,
  apiByName,
  allRecipesDb,
  dbById,
  dbByName,
};
