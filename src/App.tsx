import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import MovieList from './components/MovieList';
import Header from './components/Header';
import Footer from './components/Footer';

const AppLayout: React.FC = () => (
  <>
    <Header />
    <main className="m-4 lg:m-8 pt-[60px]">
      <Outlet />
    </main>
    <Footer />
  </>
);

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
    ],
  },
];

const router = createBrowserRouter(routes);
const App: React.FC = () => <RouterProvider router={router} />;
export default App;
