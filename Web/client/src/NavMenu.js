import React from "react";
import { Link, NavLink } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';


export default function NavMenu(){
    return(
    <>
    <div className="row" >


    <nav className=" navbar navbar-expand-lg navbar-light bg-dark">
    <div className="col-sm-2">
    <NavLink className="navbar-brand" to="#"><img src="" name=""></img></NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>

    <div className="col-sm-3 " >
    <form className="form-inline">
        <input className="form-control" type="search" placeholder="Search" name="search_field"></input>
    </form>
    </div>
   
  <div className=" col-sm 3 collapse navbar-collapse "style={{ paddingLeft:100 ,paddingRight:100 }} id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
       <NavLink className="nav-link text-color"to="/">Explore </NavLink>
      </li>
      <li className="nav-item">
       <NavLink className="nav-link" to="/create">Create</NavLink>
      </li>
      <li className="nav-item">
       <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="nav-item dropdown">
       <NavLink className="nav-link dropdown-toggle dropbtn" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </NavLink>
        <div className="dropdown-menu dropdown-content " aria-labelledby="navbarDropdownMenuLink">
         <NavLink className="" to="#">Action</NavLink>
         <NavLink className="" to="#">Another action</NavLink>
         <NavLink className="" to="#">Something </NavLink>
        </div>
      </li>
    </ul>
  </div>
  <div className="col-sm-1" >
    <button className="btn btn btn-ultra-voilet btn-rounded" >create</button>
  </div>
  <div className="col-sm-3">
    <i className="fas fa-band-aid"></i>
    <i className="fas fa-band-aid"></i>
    <i className="fas fa-band-aid"></i>
  </div>
</nav>





      <div className="col-sm-2">
     


      </div>

      <div className="col-sm-3">

      </div>

      <div className="col-sm-3">

      </div>
      <div className="col-sm-3">

      </div>

    </div>


    </>
    )




}