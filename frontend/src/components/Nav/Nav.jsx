import {React, useState, useEffect} from 'react'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import localStorageUtils from "../../utils/localStorageUtils";

const Nav = ({Toggle}) => {
    const [username, setUsername] = useState("Username");

    useEffect(() => {
      const user = localStorageUtils.getLocalStorageUser();
      if (user && user.first_name && user.last_name) {
        setUsername(`${user.first_name} ${user.last_name}`);
      }
    }, []);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {username}
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <a className="dropdown-item" href="#">
                Profile
              </a>
              <a className="dropdown-item" href="#">
                Settings
              </a>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav