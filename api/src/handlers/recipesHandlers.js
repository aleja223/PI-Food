const { Recipe, Diet } = require("../db");

const {
  apiByName,
  allRecipesDb,
  dbById,
  dbByName,
  allRecipesApi,
  apiById,
} = require("../controllers/recipesControllers");

const recipeById = async (req, res) => {
  const { id } = req.params;

  var recipeName;
  var recipeSteps = [];

  try {
    if (id === "0") {
      throw new Error("ID de receta inválido");
    }

    let recipeFound;

    if (isNaN(id)) {
      recipeFound = await dbById(id);
    } else {
      recipeFound = await apiById(id);

      if (!recipeFound || !recipeFound.id) {
        throw new Error(`No existe una receta de ID ${id}`);
      }

      recipeName = recipeFound.name;
      recipeSteps = recipeFound.steps;

      recipeFound.createdInDb = false;
    }
    if (
      recipeFound.analyzedInstructions &&
      recipeFound.analyzedInstructions.length !== 0
    ) {
      recipeSteps = recipeFound.analyzedInstructions[0].steps.map(
        (singleStep) => {
          return `Step ${singleStep.number}: ${singleStep.step}`;
        }
      );
    }

    const recipe = {
      id: recipeFound.id,
      name: recipeName,
      summary: recipeFound.summary.replace(/<[^>]+>/g, ""),
      steps: recipeSteps,
      diets: recipeFound.diets,
      image: recipeFound.image,
      healthScore: recipeFound.healthScore,
      createdInDb: recipeFound.createdInDb,
    };

    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const recipeByName = async (req, res) => {
  const { name } = req.query;

  try {
    if (name === undefined) {
      const recipesAPI = await allRecipesApi();
      const recipesDB = await allRecipesDb();

      const allRecipes = [...recipesAPI, ...recipesDB];

      res.status(200).json(allRecipes);
    } else {
      const coincidenciasApi = await apiByName(name);
      const coincidenciasDB = await dbByName(name);

      const arrayCoincidencias = [...coincidenciasApi, ...coincidenciasDB];

      if (arrayCoincidencias.length === 0) {
        throw new Error(`No existe la receta ${name}`);
      }

      res.status(200).json(arrayCoincidencias);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const recipePost = async (req, res) => {
  const { name, summary, healthScore, steps, image, diets } = req.body;

  try {
    if (
      !name ||
      !summary ||
      !healthScore ||
      !image ||
      !diets ||
      !Array.isArray(steps)
    ) {
      throw new Error("Faltan datos o algunos no son validos");
    }

    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      steps: steps,
      image,
    });

    const dietPromisesArr = diets.map(async (singleDietName) => {
      const [newDiet] = await Diet.findOrCreate({
        where: { name: singleDietName },
        defaults: { name: singleDietName },
      });

      return newDiet;
    });

    const newDiets = await Promise.all(dietPromisesArr);

    await newRecipe.addDiets(newDiets);

    res.status(200).send("Receta creada");
  } catch (error) {
    console.error("Error en la creación de receta:", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  recipeById,
  recipeByName,
  recipePost,
};
