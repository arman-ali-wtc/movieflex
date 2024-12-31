import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import MovieList from './components/MovieList';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MovieDetails } from './components/MovieDetails';
import SearchList from './components/SearchList';

const AppLayout: React.FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='bg-gray-900'>
        <Header />
        <main className="m-4 lg:m-8 pt-[60px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )

}
  

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MovieList />,
      },
      {
        path: "/:category",
        element: <MovieList />,
      },
      {
        path:"/movie/:id",
        element: <MovieDetails />
      },
      {
        path:"/search",
        element: <SearchList />
      }
    ],
  },
];

const router = createBrowserRouter(routes);
const App: React.FC = () => <RouterProvider router={router} />;
export default App;
