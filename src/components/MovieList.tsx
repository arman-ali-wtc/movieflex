import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import { AppDispatch, RootState } from '../redux/store';
import Pagination from '@mui/material/Pagination';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Movies from './Movies';

const MovieList: React.FC = () => {
  const { category = 'now_playing' } = useParams<{ category?: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { movies, status, error } = useSelector((state: RootState) => state.movies);

  const [lang, setLang] = useState('en-US');
  const [page, setPage] = useState(1);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setLang(newAlignment);
  };

  useEffect(() => {
    dispatch(fetchMovies({ category, page, lang }));
  }, [category, page, lang, dispatch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <div className="movie-list">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="min-w-fit capitalize lg:text-3xl italic font-bold">
          {category.replace('_', ' ')} Movies
        </h1>
        <ToggleButtonGroup color="primary" value={lang}  className="font-sans text-sm lg:text-lg font-medium" exclusive onChange={handleChange} aria-label="Language">
          <ToggleButton value="en-US" style={{padding: '4px 8px', textTransform: 'capitalize'}}>English</ToggleButton>
          <ToggleButton value="en-IN" style={{padding: '4px 8px', textTransform: 'capitalize'}}>Hindi</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Movies movies={movies} status={status} error={error} />
      <div className="flex items-center justify-center pt-8">
        <Pagination page={page} count={movies.totalPage} variant="outlined" color="primary" onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MovieList;
