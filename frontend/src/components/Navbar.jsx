import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import AvaterImg from "../assets/commentor.png";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';

const navLists = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about-us' },
    { name: 'Projects', path: '/projects' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const [logoutUser] = useLogoutUserMutation();
  
    const handleLogout = async () => {
      try {
        await logoutUser().unwrap();
        dispatch(logout());
      } catch (err) {
        console.error("Failed to logout:", err);
      }
    };

    return (
        <header className='bg-white py-6 border'>
          <nav className='container mx-auto flex justify-between px-5'>
            {/* Updated Navbar Logo */}
            <div className='flex items-center self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-gray-800 dark:text-white'>
              <Link to="/" className='flex items-center'>
                <span className='px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white'>
                  Mern's
                </span>
                <span className='ml-2 text-gray-900 dark:text-gray-300'>Blog</span>
              </Link>
            </div>
            <ul className='sm:flex hidden items-center gap-8'>
              {navLists.map((list, index) => (
                <li key={index}>
                  <NavLink to={list.path}
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                  >{list.name}</NavLink>
                </li>
              ))}
              {user && user?.role === 'user' ? (
                <li className='flex gap-3 items-center'>
                  <img src={AvaterImg} alt="" className='size-8' />
                  <button onClick={handleLogout} className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>Logout</button>
                </li>
              ) : (
                // Updated Login Button
                <li>
                  <Link to="/login">
                    <button
                      className='relative w-32 py-2 text-black rounded-lg border border-purple-500 overflow-hidden group'
                      style={{
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <span
                        className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        style={{ zIndex: 1 }}
                      ></span>
                      <span
                        className='relative z-10 group-hover:text-white transition-colors duration-300'
                        style={{ transition: 'color 0.3s ease' }}
                      >
                        Login
                      </span>
                    </button>
                  </Link>
                </li>
              )}
              {user && user?.role === 'admin' && (
                <li className='flex gap-3 items-center'>
                  <img src={AvaterImg} alt="" className='size-8' />
                  <Link to="/dashboard"><button className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>Dashboard</button></Link>
                </li>
              )}
            </ul>
  
            <div className='flex items-center sm:hidden'>
              <button
                onClick={toggleMenu}
                className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900'>
                {isMenuOpen ? <IoClose className='size-6' /> : <IoMenuSharp className='size-6' />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
              {navLists.map((list, index) => (
                <li key={index} className='mt-5 px-4'>
                  <NavLink to={list.path}
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >{list.name}</NavLink>
                </li>
              ))}
              {user ? (
                <>
                  <img src={AvaterImg} alt="" className='size-8' />
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <li className='px-4 mt-5'>
                  <Link to="/login">
                    <button
                      className='relative w-32 py-2 text-black rounded-lg border border-purple-500 overflow-hidden group'
                      style={{
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <span
                        className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        style={{ zIndex: 1 }}
                      ></span>
                      <span
                        className='relative z-10 group-hover:text-white transition-colors duration-300'
                        style={{ transition: 'color 0.3s ease' }}
                      >
                        Login
                      </span>
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </header>
    );
};

export default Navbar;