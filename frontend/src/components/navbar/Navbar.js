import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ isUserLoggedin, setIsUserLoggedin }) => {

  const navigate = useNavigate()

  //logout function
  const logout = () => { localStorage.clear(); setIsUserLoggedin(false); navigate("../") };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary one-edge-shadow">
      <div className="container-fluid">
        <Link to={`/`} className="navbar-brand" >My Blogs</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={`/`} className="nav-link active" aria-current="page" >Home</Link>
            <div onClick={() => { isUserLoggedin ? navigate("../create-new-blog", { replace: false }) : navigate("../login") }} className={"nav-link "} >Create New Blog</div>
            {isUserLoggedin ?
              <div className="d-flex" role="search">
                <button
                  onClick={() => logout()}
                  className="btn btn-danger mx-1" type="button">Log Out &rarr;</button>
              </div>
              :
              <div className="d-flex" role="search">
                <Link to={`/login`} className="btn btn-primary mx-1" type="button">Login</Link>
                <Link to={`/signup`} className="btn btn-success mx-1" type="button">Sign up</Link>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
