const { Router } = require("express");

const routerRecipes = Router();
const {
  recipeById,
  recipeByName,
  recipePost,
} = require("../handlers/recipesHandlers");

routerRecipes.get("/:id", recipeById);
routerRecipes.get("/", recipeByName);
routerRecipes.post("/", recipePost);

module.exports = routerRecipes;
