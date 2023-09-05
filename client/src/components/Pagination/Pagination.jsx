import Card from "../Card/Card";
import "./Pagination.css";

const Pagination = ({ recipes, currentPage, setCurrentPage }) => {
  const totalRecipes = recipes.length;

  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalRecipes / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderItemsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalRecipes);

    if (totalRecipes === 0) {
      return null;
    }

    return recipes
      .slice(startIndex, endIndex)
      .map((recipe) => (
        <Card
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          image={recipe.image}
          healthScore={recipe.healthScore}
          diets={recipe.diets}
        />
      ));
  };

  const renderPagination = () => {
    const paginationButtons = [];
    const maxButtons = 5;

    let startPage;
    let endPage;

    if (currentPage <= maxButtons - 2) {
      startPage = 1;
      endPage = Math.min(maxButtons, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - maxButtons + 1, 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    if (startPage !== 1) {
      paginationButtons.push(
        <button
          className="numeracion"
          key={1}
          onClick={() => handlePageChange(1)}>
          1
        </button>
      );

      if (startPage > 2) {
        paginationButtons.push(
          <span className="puntitos" key="start-dots">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`numeracion ${currentPage === i ? "active" : ""}`}>
          {i}
        </button>
      );
    }

    if (endPage !== totalPages) {
      if (endPage < totalPages - 1) {
        paginationButtons.push(
          <span className="puntitos" key="end-dots">
            ...
          </span>
        );
      }
      paginationButtons.push(
        <button
          key={totalPages}
          className="numeracion"
          onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }
    return paginationButtons;
  };

  return (
    <div className="render">
      {totalRecipes > 0 && (
        <div className="items-container">{renderItemsForCurrentPage()}</div>
      )}
      <div className="pagination">
        <button
          className="button-pagination prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          {"<"}
        </button>
        {renderPagination()}
        <button
          className="button-pagination next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
