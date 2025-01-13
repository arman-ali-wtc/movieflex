import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovieDetailsAndVideos = createAsyncThunk(
  'movies/fetchMovieDetailsAndVideos',
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const [movieResponse, videoResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`)
      ]);

      return {
        movie: movieResponse.data,
        videos: videoResponse.data.results.length > 0 ? videoResponse.data : null
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (
    { category, page, lang }: { category?: string; page: number; lang: string },
    { getState, rejectWithValue }
  ) => {
    const state: any = getState();
    const cacheKey = category || 'discover';
    const cachedMovies = state.movies[cacheKey]?.[page];
    const apiKey = process.env.REACT_APP_API_KEY;

    if (cachedMovies) {
      return cachedMovies;
    }

    try {
      const url = category
        ? `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&with_original_language=${lang}&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${lang}&page=${page}`;

      const response = await axios.get(url);
      return { category: category || 'discover', page: response.data.page, data: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const fetchAdultMovies = createAsyncThunk(
  'movies/fetchAdultMovies',
  async (
    { page, lang }: { page: number; lang: string },
    { rejectWithValue }
  ) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${lang}&page=${page}&include_adult=true&certification_country=US&certification=NC-17`;
      const response = await axios.get(url);
      return { page: response.data.page, data: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const searchMovie = createAsyncThunk(
  'movies/searchMovie',
  async ({ query, showAdult }: { query: string, showAdult: boolean }, { rejectWithValue }) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&include_adult=${showAdult}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

interface MovieState {
  movies: MovieObject;
  selectedMovie: any | null;
  selectedVideo: any | null;
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
  selectedMovie: null,
  selectedVideo: null,
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
        };
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchAdultMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdultMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = {
          page: action.payload.page,
          results: action.payload.data.results,
          totalPage: action.payload.data.total_pages,
          totalResults: action.payload.data.total_results
        };
      })
      .addCase(fetchAdultMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchMovieDetailsAndVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetailsAndVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload.movie;
        state.selectedVideo = action.payload.videos;
      })
      .addCase(fetchMovieDetailsAndVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(searchMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = {
          page: action.payload.page,
          results: action.payload.results,
          totalPage: action.payload.total_pages,
          totalResults: action.payload.total_results
        };
      })
      .addCase(searchMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export default movieSlice.reducer;
