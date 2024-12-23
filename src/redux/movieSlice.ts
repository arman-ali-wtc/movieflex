import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (category: string) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US`
    );
    return response.data.results;
  }
);

interface MovieState {
  movies: Array<any>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  status: 'idle',
  error: null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export default movieSlice.reducer;
