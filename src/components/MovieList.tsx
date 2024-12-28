import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import { AppDispatch, RootState } from '../redux/store';
import MovieCard from './MovieCard';
import Pagination from '@mui/material/Pagination';

const MovieList: React.FC = () => {
  const { category = 'now_playing' } = useParams<{ category?: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { movies, status, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (category) {
      dispatch(fetchMovies({category, page: 1}));
    }
  }, [category, dispatch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(fetchMovies({ category, page }));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="movie-list">
      <h2 className="capitalize m-4 text-center italic font-bold">{category.replace('_', ' ')} Movies</h2>
      <div className="flex flex-wrap gap-5 justify-center">
        {movies?.results?.length > 0 ? (movies?.results?.map((movie) => (
          <MovieCard
            key={movie.id}
            image={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
            popularity={movie.popularity}
            releasedDate={movie.release_date}
            language={movie.original_language}
          />
        ))) : <h1>No Movies Found</h1>}
      </div>
      <div className='flex items-center justify-center pt-8'>
      <Pagination page={movies.page} count={movies.totalPage} variant="outlined" color="primary" onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MovieList;
