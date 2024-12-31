import React from 'react';
import MovieCard from './MovieCard';
import Skeleton from '@mui/material/Skeleton';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    popularity: number;
    release_date: string;
    original_language: string;
}

interface Movies {
    movies: {
        results: Movie[];
    };
    status: string;
    error: string | null;
}

const Movies: React.FC<Movies> = ({ movies, status, error }) => {

    if (status === 'loading') {
        return (
            <div className='flex flex-wrap gap-6 justify-center'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} variant="rounded" animation="wave" width={340} height={340} />
                ))}
            </div>
        );
    }

    if (status === 'failed') return <div>Error: {error}</div>;

    if (movies?.results.length === 0) {
        return (
            <div className="flex flex-wrap gap-5 justify-between">
                <h1>No Movies Found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-5 justify-between">
            {movies.results.map((movie) => (
                <MovieCard
                    key={movie.id}
                    image={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    popularity={movie.popularity}
                    releasedDate={movie.release_date}
                    language={movie.original_language}
                    movieId={movie.id}
                />
            ))}
        </div>
    );
};

export default Movies;
