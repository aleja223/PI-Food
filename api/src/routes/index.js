const { Router } = require("express");
const routerRecipes = require("./routerRecipes");
const routerDiets = require("./routerDiets");

const router = Router();

router.use("/recipes", routerRecipes);
router.use("/diets", routerDiets);

module.exports = router;
