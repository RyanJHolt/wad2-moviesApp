import React, {useContext} from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddReviewButton from '../components/buttons/addReview'
import {MoviesContext} from '../contexts/moviesContext'

const WatchlistMoviesPage = props => {
    const context = useContext(MoviesContext);
    const watchlists = context.upcoming.filter( w => w.watchlist )
    return (
        <MovieListPageTemplate
            movies={watchlists}
            title={"Watchlist"}
            action={movie => <AddReviewButton movie={movie} />}
        />
    );
};

export default WatchlistMoviesPage;