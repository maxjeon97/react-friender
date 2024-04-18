import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import userContext from "../user/userContext";


/** Navigation bar component for Jobly.
 *
 * Props:
 * - logout(): parent function
 *
 * State: none
 *
 * App -> NavBar
 */

function NavBar({ logout }) {
  const { user } = useContext(userContext);

  /** Returns JSX markup for NavBar when there exists a logged in user */
  function generateLoggedInNavBar() {
    return (
      <ul className="ms-auto navbar-nav">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/find-friends">FindFriends</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/matches">Matches</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </li>
        <li className="nav-item me-4">
          <Link className="nav-link"
            to="/"
            onClick={logout}>{`Logout (${user.username})`}</Link>
        </li>
      </ul>
    );
  }

  /** Returns JSX markup for NavBar when there exists a logged in user */
  function generateAnonNavBar() {
    return (
      <ul className="ms-auto navbar-nav">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="NavBar navbar navbar-light sticky-top navbar-expand-md">
      <div className="container-fluid">
        <Link
          className="navbar-brand ms-2"
          to="/">Friender
          <img
          className="NavBar-logo"
          src="/logos/FrienderLogo.png"
          alt="Friender-logo" />
        </Link>
        {user
          ? generateLoggedInNavBar()
          : generateAnonNavBar()}
      </div>
    </nav>
  );
}

export default NavBar;