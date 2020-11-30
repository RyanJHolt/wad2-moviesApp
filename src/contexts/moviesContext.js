import React, { useEffect, createContext, useReducer } from "react";
import { getMovies, getUpcomingMovies, getPopularMovies, getTopRated } from "../api/tmdb-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
    switch (action.type) {
        case "add-favorite":
            return {
                movies: state.movies.map((m) =>
                    m.id === action.payload.movie.id ? { ...m, favorite: true } : m
                ),
                popular: state.popular.map((m) =>
                    m.id === action.payload.movie.id ? { ...m, favorite: true } : m
                ),
                toprated: state.toprated.map((m) =>
                    m.id === action.payload.movie.id ? { ...m, favorite: true } : m
                ),
                upcoming: [...state.upcoming],
            };
        case "add-watchlist":
            return {
                upcoming: state.upcoming.map((w) =>
                    w.id === action.payload.movie.id ? { ...w, watchlist: true } : w
                ),
                movies: [...state.movies], popular: [...state.popular], toprated: [...state.toprated],
            };
        case "load":
            return { movies: action.payload.movies, upcoming: [...state.upcoming] , popular: [...state.popular], toprated: [...state.toprated] };
        case "load-upcoming":
            return { upcoming: action.payload.movies, movies: [...state.movies] , popular: [...state.popular], toprated: [...state.toprated]};
        case "load-popular":
            return { popular: action.payload.movies, movies: [...state.movies], upcoming: [...state.upcoming], toprated: [...state.toprated] };
        case "load-toprated":
            return { toprated: action.payload.movies, movies: [...state.movies], upcoming: [...state.upcoming], popular: [...state.popular] };
        case "add-review":
            return {
                movies: state.movies.map((m) =>
                    m.id === action.payload.movie.id
                        ? { ...m, review: action.payload.review }
                        : m
                ),
                upcoming: [...state.upcoming],
            };
        default:
            return state;
    }
};

const MoviesContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [], popular: [], toprated: [] });

    const addToFavorites = (movieId) => {
        const index = state.movies.map((m) => m.id).indexOf(movieId);
        dispatch({ type: "add-favorite", payload: { movie: state.movies[index], popular: state.movies[index],  toprated: state.toprated[index], } });
    };

    const AddToWatchlist = (movieId) => {
        const index = state.upcoming.map((W) => W.id).indexOf(movieId);
        dispatch({ type: "add-watchlist", payload: { movie: state.upcoming[index] } });
    };

    const addReview = (movie, review) => {
        dispatch({ type: "add-review", payload: { movie, review } });
    };

    useEffect(() => {
        getMovies().then((movies) => {
            dispatch({ type: "load", payload: { movies } });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getUpcomingMovies().then((movies) => {
            dispatch({ type: "load-upcoming", payload: { movies } });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getPopularMovies().then((movies) => {
            dispatch({ type: "load-popular", payload: { movies } });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getTopRated().then((movies) => {
            dispatch({ type: "load-toprated", payload: { movies } });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                movies: state.movies,
                upcoming: state.upcoming,
                popular: state.popular,
                toprated: state.toprated,
                addToFavorites: addToFavorites,
                AddToWatchlist: AddToWatchlist,
                addReview: addReview,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;