import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import { AppDispatch, RootState } from '../redux/store';
import MovieCard from './MovieCard';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const MovieList: React.FC = () => {
  const { category = 'now_playing' } = useParams<{ category?: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { movies, status, error } = useSelector((state: RootState) => state.movies);

  const [lang, setLang] = useState('en-US');
  const [page, setPage] = useState(1);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setLang(newAlignment)
  } 

  useEffect(() => {
    dispatch(fetchMovies({ category, page, lang }));
  }, [category, page, lang, dispatch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  };
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

  return (
    <div className="movie-list">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="capitalize text-3xl italic font-bold">{category.replace('_', ' ')} Movies</h1>
        <ToggleButtonGroup
          color="primary"
          value={lang}
          exclusive
          onChange={handleChange}
          aria-label="Language"
        >
          <ToggleButton value="en-US">English</ToggleButton>
          <ToggleButton value="en-IN">Hindi</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-wrap gap-5 justify-between">
        {movies?.results?.length > 0 ? (movies?.results?.map((movie) => (
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
        ))) : <h1>No Movies Found</h1>}
      </div>
      <div className='flex items-center justify-center pt-8'>
        <Pagination  page={page} count={movies.totalPage} variant="outlined" color="primary" onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MovieList;
