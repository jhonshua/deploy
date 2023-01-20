import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/actions";

import "./Pagination.css";

export default function Pagination() {

  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes);
  const recipesPerPage = useSelector((state) => state.recipesPerPage);
  const currentPage = useSelector((state) => state.currentPage);

  const pageNumbers = [];

  const allRecipes = recipes.length;
  
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChangePage = (e) => {
    dispatch(changePage(e.target.value));
  };

  return (
    <div className="contenedorPagination" >
      <ul className="ul">
      {pageNumbers && currentPage > 1 ? <button className="page_button" value='Prev' onClick={handleChangePage}>
        {"<"}
      </button> : null}
      {pageNumbers?.map(number => (
                    <button key={number} className={currentPage === number ? "current" : "page_button"} value={number} onClick={handleChangePage}>{number}</button>
                ))}
      {pageNumbers && currentPage < pageNumbers.length ? <button className="page_button" value='Next' onClick={handleChangePage}>
      {">"}
      </button> : null}
      </ul>
    </div>
  );
}
