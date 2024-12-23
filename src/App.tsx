// App.tsx
import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import MovieList from './components/MovieList';
import Header from './components/Header'
import Footer from './components/Footer';
import Home from './components/Home';

const AppLayout: React.FC = () => {
  return <>
    <Header />
    <Outlet />
    <Footer />
  </>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path:"/",
        element: <Home />
      },
      {
        path: "/:category",
        element: <MovieList />,
      },
    ]
  },
 
]);

const App: React.FC = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
