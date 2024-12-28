import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ category, page }: { category: string; page: number }, { getState, rejectWithValue }) => {
    const state: any = getState();
    const cachedMovies = state.movies[category]?.[page];
    if (cachedMovies) {
      return cachedMovies;
    }
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=${page}`
      );
      return { category, page: response.data.page, data: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

interface MovieState {
  movies: MovieObject;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface MovieObject {
  page: number;
  results: Array<any>;
  totalPage: number;
  totalResults: number;
}

const initialState: MovieState = {
  movies: {
    page: 0,
    results: [],
    totalPage: 0,
    totalResults: 0
  },
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
        state.movies = {
          page: action.payload.page,
          results: action.payload.data.results,
          totalPage: action.payload.data.total_pages,
          totalResults: action.payload.data.total_results
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export default movieSlice.reducer;
