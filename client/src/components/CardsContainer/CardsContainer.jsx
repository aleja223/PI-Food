import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./CardsContainer.css";
import Pagination from "../Pagination/Pagination";

import {
  setFilterByDiet,
  setFilterByOrigin,
  resetFilters,
  getAllRecipes,
  getAllDiets,
} from "../../redux/actions";

function CardsContainer({
  allRecipes,
  filteredRecipes,
  allDiets,
  setFilterByDiet,
  setFilterByOrigin,
  resetFilters,
  getAllRecipes,
  getAllDiets,
}) {
  const [filterByDiet, setFilterByDietState] = useState("");
  const [filterByOrigin, setFilterByOriginState] = useState("");
  const [orderCards, setOrderState] = useState("true");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllRecipes();
    getAllDiets();
  }, [getAllRecipes, getAllDiets]);

  useEffect(() => {
    setFilterByDiet(filterByDiet);
  }, [filterByDiet, setFilterByDiet]);

  useEffect(() => {
    setFilterByOrigin(filterByOrigin);
  }, [filterByOrigin, setFilterByOrigin]);

  const handleFilterByDiet = (event) => {
    setCurrentPage(1);
    const filterValue = event.target.value;
    setFilterByDiet(filterValue);
  };

  const handleFilterByOrigin = (event) => {
    setCurrentPage(1);
    const filterValue = event.target.value;
    setFilterByOrigin(filterValue);
  };

  const handleResetFilters = () => {
    setFilterByDietState("");
    setFilterByOriginState("");
    setOrderState("true");
    resetFilters();
  };

  const handleOrder = () => {
    setOrderState(!orderCards);
  };

  const recipes = [
    ...(filteredRecipes.length === 0 ? allRecipes : filteredRecipes),
  ].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (orderCards === "true") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <div className="CardsContainer">
      <div className="selectContainer">
        <button onClick={handleOrder}>{orderCards ? "A-Z" : "Z-A"}</button>

        <select className="selects" onChange={handleFilterByOrigin}>
          <option value="">All</option>
          <option value="false">API</option>
          <option value="true">DataBase</option>
        </select>

        <select className="selects" onChange={handleFilterByDiet}>
          <option value="">ALL DIETS</option>
          {console.log(allDiets)}

          {allDiets.map((diet) => (
            <option key={diet.name} value={diet.name}>
              {diet.name.toUpperCase()}
            </option>
          ))}
        </select>

        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>

      <div className="cards-organization">
        {
          <Pagination
            recipes={recipes}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allDiets: state.allDiets,
    allRecipes: state.allRecipes,
    filteredRecipes: state.filteredRecipes,
    filterByDiet: state.filterByDiet,
    filterByOrigin: state.filterByOrigin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRecipes: () => dispatch(getAllRecipes()),
    getAllDiets: () => dispatch(getAllDiets()),
    setFilterByDiet: (filterValue) => dispatch(setFilterByDiet(filterValue)),
    setFilterByOrigin: (filterValue) =>
      dispatch(setFilterByOrigin(filterValue)),
    resetFilters: () => dispatch(resetFilters()),
  };
};
const ConnectedCardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer);

export default ConnectedCardsContainer;
