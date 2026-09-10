import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLanding = location.pathname === '/';

  useEffect(() => {
    if (!isLanding) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLanding]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className={`site-header ${isLanding && !scrolled ? 'site-header-landing' : ''}`}>
      <Link to={user ? '/browse' : '/'} className="brand" onClick={closeMenu}>N</Link>
      <Link to={user ? '/browse' : '/'} className="brand-word" onClick={closeMenu}>NETFLIX<span>+</span></Link>
      {user && <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/browse" onClick={closeMenu}>Home</Link><Link to="/movies" onClick={closeMenu}>Movies</Link><Link to="/shows" onClick={closeMenu}>TV Shows</Link><Link to="/my-list" onClick={closeMenu}>My List</Link><Link to="/subscription" onClick={closeMenu}>Plans</Link>
      </nav>}
      <div className="header-actions">
        {user ? <>
          {showSearch ? <SearchBar autoFocus onSearch={(q) => { setShowSearch(false); navigate(`/search?q=${encodeURIComponent(q)}`); }} onBlur={() => setShowSearch(false)} /> : <button className="icon-button" onClick={() => setShowSearch(true)} aria-label="Search">⌕</button>}
          <Link className="profile-pill" to="/profile">{(user.name || 'U').slice(0, 1).toUpperCase()}</Link>
          <button className="logout-button" onClick={logout}>Log out</button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
        </> : <Link className="header-signin" to="/login">Sign in</Link>}
      </div>
    </header>
  );
}
