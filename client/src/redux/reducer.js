import {
  SET_FILTER_BY_DIET,
  SET_FILTER_BY_ORIGIN,
  SET_ALL_DIETS,
  SET_ALL_RECIPES,
  RESET_FILTERS,
} from "./action-types";

const initialState = {
  allDiets: [],
  allRecipes: [],
  filteredRecipes: [],
  filterByDiet: "",
  filterByOrigin: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_RECIPES:
      return { ...state, allRecipes: action.payload };

    case SET_ALL_DIETS:
      return { ...state, allDiets: action.payload };

    case SET_FILTER_BY_DIET:
      const filterValueByDiet = action.payload;
      let filteredByDiet;

      if (state.filteredRecipes.length === 0) {
        filteredByDiet = state.allRecipes.filter((recipe) => {
          const dietFilterPass =
            !filterValueByDiet || recipe.diets?.includes(filterValueByDiet);
          const originFilterPass =
            !state.filterByOrigin ||
            recipe.createdInDb.toString() === state.filterByOrigin;
          return dietFilterPass && originFilterPass;
        });
      } else {
        filteredByDiet = state.filteredRecipes.filter((recipe) => {
          const dietFilterPass =
            !filterValueByDiet || recipe.diets?.includes(filterValueByDiet);
          const originFilterPass =
            !state.filterByOrigin ||
            recipe.createdInDb.toString() === state.filterByOrigin;
          return dietFilterPass && originFilterPass;
        });
      }

      return {
        ...state,
        filteredRecipes: filteredByDiet,
        filterByDiet: filterValueByDiet,
      };

    case SET_FILTER_BY_ORIGIN:
      const filterValueByOrigin = action.payload;
      let filteredByOrigin;
      if (state.filteredRecipes.length === 0) {
        filteredByOrigin = state.allRecipes.filter((recipe) => {
          const dietFilterPass =
            !state.filterByDiet || recipe.diets?.includes(state.filterByDiet);
          const originFilterPass =
            !filterValueByOrigin ||
            recipe.createdInDb?.toString() === filterValueByOrigin.toString();
          return dietFilterPass && originFilterPass;
        });
      } else {
        filteredByOrigin = state.filteredRecipes.filter((recipe) => {
          const dietFilterPass =
            !state.filterByDiet || recipe.diets?.includes(state.filterByDiet);
          const originFilterPass =
            !filterValueByOrigin ||
            recipe.createdInDb?.toString() === filterValueByOrigin.toString();
          return dietFilterPass && originFilterPass;
        });
      }
      console.log(filteredByOrigin);

      return {
        ...state,
        filteredRecipes: filteredByOrigin,
        filterByOrigin: filterValueByOrigin,
      };

    case RESET_FILTERS:
      return {
        ...state,
        filteredRecipes: state.allRecipes,
        filterByDiet: "",
        filterByOrigin: "",
      };

    default:
      return state;
  }
};

export default reducer;
