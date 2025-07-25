import { useState } from 'react';
import Navbar from './Navbar';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-20 bg-gradient-to-b from-zinc-900 to-transparent">
      <div className="relative flex items-center justify-between w-full h-full px-4 mx-auto max-w-screen-2xl md:px-6">

        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/images/logo.svg"
              width={40}
              height={40}
              alt="Muniraju BR"
            />
              <h1 className="text-2xl text-white md:text-2xl">Muniraju BR</h1>
          </a>
      </div>

        <div className="flex items-center gap-4 md:gap-8">
          <button
            className="menu-btn md:hidden"
            onClick={() => setNavOpen(prev => !prev)}
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-rounded">
              {navOpen ? 'close' : 'menu'}
            </span>
          </button>

          <Navbar navOpen={navOpen} />
        </div>

        <a href="/#contact" className="hidden md:inline-flex btn btn-secondary">
          Contact Me
        </a>
      </div>
    </header>
  );
};

export default Header;
