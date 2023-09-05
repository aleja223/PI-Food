import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getAllDiets } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

import CardsContainer from "../../components/CardsContainer/CardsContainer";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
  }, [dispatch]);

  const handleRecipeSearch = (recipe) => {
    navigate(`/details/${recipe.id}`);
  };

  return (
    <div>
      <CardsContainer
        recipes={allRecipes}
        handleRecipeSearch={handleRecipeSearch}
      />
    </div>
  );
};

export default Home;
