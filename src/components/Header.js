import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/vote">Vote</NavLink>
    </nav>
  </div>
);

export default Header;