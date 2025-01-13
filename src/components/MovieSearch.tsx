import React, { useState, useCallback } from 'react';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
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
  const [showAdult, setShowAdult] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = useCallback(
    debounce((query: string, includeAdult: boolean) => {
      if (query.trim()) {
        dispatch(searchMovie({ query, showAdult: includeAdult }));
        setValue(query);
        setQuery('');
        setShowAdult(false);
      }
    }, 1000),
    [dispatch, setValue]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value, showAdult); 
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setShowAdult(checked);
    handleSearch(query, checked);
  };

  return (
    <div className="w-full md:w-2/4 md:order-2 flex items-center gap-4 relative">
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleChange}
      />
      <FormControlLabel
        control={<Checkbox checked={showAdult} onChange={handleCheckboxChange} />}
        label="Include 18+"
        className='absolute right-0'
      />
    </div>
  );
};

export default MovieSearch;
