import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { UpMoviesContext } from '../contexts/moviesContext'
import AddToWatchlistButton from '../components/buttons/addToWatchlist'

const MovieListPage = () => {
  const context = useContext(UpMoviesContext);
  const movies = context.movies.filter((m) => {  // New
    return !("favorite" in m);
  });

  return (
      <PageTemplate
          title="No. Movies"
          movies={movies}  /* Changed */
          action={(movie) => {
            return <AddToWatchlistButton movie={movie} />;
          }}
      />
  );
};

export default MovieListPage;