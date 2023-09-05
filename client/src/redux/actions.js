import {
  SET_ALL_RECIPES,
  SET_ALL_DIETS,
  SET_FILTER_BY_DIET,
  SET_FILTER_BY_ORIGIN,
  RESET_FILTERS,
} from "./action-types";
import axios from "axios";

export const getAllRecipes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      const data = response.data;
      dispatch(setAllRecipes(data));
    } catch (error) {
      throw new Error("Error al obtener las recetas");
    }
  };
};

export const getAllDiets = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/diets");
      const data = response.data;
      dispatch(setAllDiets(data));
    } catch (error) {
      throw new Error("Error al obtener las dietas");
    }
  };
};

export const postRecipe = (recipe) => {
  const endpoint = "http://localhost:3001/recipes";
  return async () => {
    try {
      const { data } = await axios.post(endpoint, recipe);

      if (!data.length) throw Error("No se ha podido crear la receta");
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const setAllRecipes = (recipes) => {
  return {
    type: SET_ALL_RECIPES,
    payload: recipes,
  };
};

export const setAllDiets = (diets) => {
  return {
    type: SET_ALL_DIETS,
    payload: diets,
  };
};

export const setFilterByDiet = (filterValue) => {
  return {
    type: SET_FILTER_BY_DIET,
    payload: filterValue,
  };
};

export const setFilterByOrigin = (filterValue) => {
  return {
    type: SET_FILTER_BY_ORIGIN,
    payload: filterValue,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};
