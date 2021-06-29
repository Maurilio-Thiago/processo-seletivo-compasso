import React from 'react';
import { goToMain } from '../../routes/coordinator';
import { useHistory } from 'react-router-dom';

const NavBar = () => {

  const history = useHistory()

  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container">
        <button onClick={() => goToMain(history)} type="button" className="btn btn-link">GitHub Finder</button>
      </div>
    </nav>
  )
}

export default NavBar;