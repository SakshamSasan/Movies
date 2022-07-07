import { useState } from "react";
import { Link } from "react-router-dom";
import { add_search_to_movies, fetch_movie } from "./actions";
import classes from './Navbar.module.css'

function NavBar(props) {

  var [searchText,setSearchText] = useState("")


  function handleSearch(e) {
    e.stopPropagation()
    props.dispatch(fetch_movie(searchText))
    
  }

  function handleAddition(e) {
    e.stopPropagation();
    props.dispatch(add_search_to_movies(props.movie.searchResults))
    setSearchText("")
    
  }
    return (
        <>
            
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
        <div className="container-fluid">
          <h1 style={{color:'white'}}>Pixity</h1>
          <div className="navbar-toggler navbarIcon me-1" type="div" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span ><i className="fa-solid fa-bars"></i></span>
          </div>
          <div className="collapse navbar-collapse pt-lg-2 d-lg-flex justify-content-lg-end" id="navbarSupportedContent">
            <ul style={styles.noDisc} className="nav-list left">

              <li className="d-lg-inline-block my-3 my-lg-0 mx-lg-4">
                <div className="d-inline-block" style={{position:"relative"}}>
                  <input className={`${classes.custom} p-1`}
                      placeholder="Search by Title.." 
                      value={searchText}
                      onChange={e=>{setSearchText(e.target.value)}}> 
                  </input>
                  <div className={props.movie.showResult?classes.searchDropdown:classes.searchDropdownInvisible} >
                    {props.movie?<div className="row">
                      <div className="col-4">
                        <div className={classes.searchImage} style={{backgroundImage:`url(${props.movie.searchResults.Poster})`}}>

                        </div>
                      </div>
                      <div className="col-5">
                          <b><i>{props.movie.searchResults.Title}</i></b>
                      </div>
                      <div className="col-3 d-flex justify-content-start align-items-end">
                        <div onClick={handleAddition} className="d-inline-block bg-success rounded py-1 px-2 mb-2" style={{color:'white',cursor:'pointer'}}><i className="fa-solid fa-plus"></i></div>
                      </div>
                    </div>:""}
                  </div>
                </div>
                

                <button onClick={handleSearch} className={`d-inline-block ${classes.customButton} rounded`}><i className="fa-solid fa-magnifying-glass"></i></button>

              </li>

               <li style={styles.colors} className="d-lg-inline-block my-3 my-lg-0 me-lg-3">
                <Link style={styles.noDec}to="/">
                  <i className="fa-solid fa-house"></i>
                  <span className="nav-mod mx-2"><b>Home</b></span>
                </Link>
              </li>
              <li style={{color:'white'}} className="d-lg-inline-block my-3 my-lg-0 mx-lg-4">
                <Link style={styles.noDec} to="/movies/favourites">
                  <i className="fa-solid fa-heart"></i>
                  <span className="nav-mod mx-2"><b>Favourites</b></span>
                </Link>
              </li>
              
              
            </ul>
            
          </div>
        </div>
      </nav>
    
        </>
    )
}
export default NavBar;

// internal styles

var styles = {
    colors:{
        color:'white'
    },
    noDisc:{
        listStyleType:'none'
    },
    noDec:{
      textDecoration:'none',
      color:'white'
    }
}