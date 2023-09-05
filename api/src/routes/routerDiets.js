const { Router } = require("express");
const { dietsDb } = require("../handlers/dietsHandlers");

const routerDiets = Router();

routerDiets.get("/", dietsDb);

module.exports = routerDiets;
