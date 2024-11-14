"use client";
import Link from 'next/link';
import '../style/navbar.scss';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbarList">
        <li className="navbarItem">
          <Link href="/" className="navbarLink">Accueil</Link>
        </li>
        <li className="navbarItem">
          <Link href="/cartes" className="navbarLink">Cartes</Link>
        </li>
        <li className="navbarItem">
          <Link href="/sport" className="navbarLink">Sport</Link>
        </li>
        <li className="navbarItem">
          <Link href="/Pro" className="navbarLink">Pro</Link>
        </li>
        <li className="navbarItem">
          <Link href="/Pro" className="navbarLink">Inscription/Connexion</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
