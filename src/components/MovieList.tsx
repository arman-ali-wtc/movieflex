import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import { AppDispatch, RootState } from '../redux/store';
import MovieCard from './MovieCard';

const MovieList: React.FC = () => {
  const { category = 'popular' } = useParams<{ category?: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { movies, status, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (category) {
      dispatch(fetchMovies(category));
    }
  }, [category, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="movie-list">
      <h2 className="capitalize m-4 text-center italic font-bold">{category.replace('_', ' ')} Movies</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            image={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
