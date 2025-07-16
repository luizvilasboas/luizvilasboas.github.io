import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b-4 border-black dark:border-yellow-300 w-full">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center py-2">
          <div className="font-mono font-bold uppercase text-2xl dark:text-white">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>LF.</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex items-center space-x-4 font-mono uppercase dark:text-white">
              <li><Link to="/#about" className="h-10 flex items-center px-4 hover:bg-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-black">About</Link></li>
              <li><Link to="/#projects" className="h-10 flex items-center px-4 hover:bg-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-black">Projects</Link></li>
              <li><Link to="/#contact" className="h-10 flex items-center px-4 bg-black text-white hover:bg-yellow-300 hover:text-black dark:bg-white dark:text-black dark:hover:bg-yellow-300">Contact</Link></li>
            </ul>
            <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" aria-label="Toggle theme">
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <XIcon className="w-8 h-8 dark:text-white" /> : <MenuIcon className="w-8 h-8 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-b-4 border-black dark:border-yellow-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col items-center font-mono uppercase dark:text-white">
          <li><Link to="/#about" className="block w-full text-center py-4 hover:bg-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-black" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/#projects" className="block w-full text-center py-4 hover:bg-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-black" onClick={() => setIsMenuOpen(false)}>Projects</Link></li>
          <li><Link to="/#contact" className="block w-full text-center py-4 hover:bg-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-black" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
        <div className="flex justify-center py-4">
          <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center border-2 border-black dark:border-white text-black dark:text-white" aria-label="Toggle theme">
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;