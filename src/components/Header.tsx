// components/Header.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul className="flex space-x-4">
        <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/popular"
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              Popular Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              Upcoming Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/top_rated"
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
              }
            >
              Top Rated Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
