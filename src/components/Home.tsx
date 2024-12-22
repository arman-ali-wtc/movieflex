import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import { AppDispatch, RootState } from '../redux/store';
import MovieCard from '../components/MovieCard';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, status, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Movie App</h1>
      </header>

      <main className="p-8">
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'failed' ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie: any) => (
              <MovieCard
                key={movie.id}
                image={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Movie App</p>
      </footer>
    </div>
  );
};

export default Home;
