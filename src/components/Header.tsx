import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../assets/images/logo.png';
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="flex justify-between items-center px-8 py-4 bg-gray-950 text-white fixed top-0 w-full z-10 shadow-lg shadow-slate-500/50">
        <NavLink to="/" className="text-2xl -my-2">
        <img src={Logo} alt='Logo' width={60} />
        </NavLink>
        <div className='flex gap-4 items-center'>
        <div className='lg:hidden'>
        {!location?.pathname?.includes('search') && (<NavLink to="/search">
                <SearchIcon />
        </NavLink>)}
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        </div>
       
        <nav className="hidden lg:flex gap-4">
          {!location?.pathname?.includes('search') && (<NavLink to="/search">
            <SearchIcon />
          </NavLink>)}

          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/popular"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-500 font-bold'
                    : 'text-white hover:text-green-400'
                }
              >
                Popular Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/upcoming"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-500 font-bold'
                    : 'text-white hover:text-green-400'
                }
              >
                Upcoming Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/now_playing"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-500 font-bold'
                    : 'text-white hover:text-green-400'
                }
              >
                Now Playing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/top_rated"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-500 font-bold'
                    : 'text-white hover:text-green-400'
                }
              >
                Top Rated Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {isMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-end top-[60px] h-fit"
            onClick={closeMenu}
          >
            <div
              className="bg-gray-900 text-white w-full p-4 rounded-t-lg z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="space-y-4 text-center">
                <li>
                  <NavLink
                    to="/popular"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-green-500 font-bold'
                        : 'text-white hover:text-green-400'
                    }
                  >
                    Popular Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/upcoming"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-green-500 font-bold'
                        : 'text-white hover:text-green-400'
                    }
                  >
                    Upcoming Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/top_rated"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-green-500 font-bold'
                        : 'text-white hover:text-green-400'
                    }
                  >
                    Top Rated Movies
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>,
          document.body // Render the menu at the end of the <body>
        )}
    </>
  );
};

export default Header;
