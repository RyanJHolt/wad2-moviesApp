import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import {MoviesContext } from '../contexts/moviesContext'
import AddToFavoriteButton from "../components/buttons/addToFavorites";

const TopRatedMovieListPage = () => {
  const context = useContext(MoviesContext);
  const movies = context.toprated;

  return (
      <PageTemplate
          title="No. Movies"
          movies={movies}  /* Changed */
          action={(movie) => {
            return <AddToFavoriteButton movie={movie} />;
          }}
      />
  );
};

export default TopRatedMovieListPage;