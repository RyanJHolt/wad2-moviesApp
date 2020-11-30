import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import {MoviesContext } from '../contexts/moviesContext'
import AddToWatchlistButton from '../components/buttons/addToWatchlist'

const UpcomingMovieListPage = () => {
  const context = useContext(MoviesContext);
  const movies = context.upcoming.filter((w) => {
      return !("watchlist" in w);
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

export default UpcomingMovieListPage;