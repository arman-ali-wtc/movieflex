import React, { useState, useCallback } from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { searchMovie } from '../redux/movieSlice';
import { AppDispatch } from '../redux/store';

interface MovieSearchProps {
  setValue: (value: string) => void;
  value: string;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ setValue, value }) => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        dispatch(searchMovie({ query }));
        setValue(query);
        setQuery('');
      }
    }, 1000),
    [dispatch, setValue]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value); 
  };

  return (
    <div className="w-full md:w-2/4 md:order-2">
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default MovieSearch;
