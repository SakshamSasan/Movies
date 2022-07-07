import { useContext,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { connect, StoreContext } from ".";
import { add_movies, remove_dropdown } from "./actions";
import {data} from './data'
import Favourites from "./Favourites";
import Home from "./Home";
import NavBar from "./Navbar";


function App(props) {
  
  var store=useContext(StoreContext)
  

  useEffect(()=>{
    store.dispatch(add_movies(data))
  },[])

  return (
    <div className="App" onClick={()=>{props.dispatch(remove_dropdown())}}>

      <NavBar dispatch={props.dispatch} movie={props.search}/>
      <Routes>
        <Route exact path = '/' element={<Home />}>
        </Route>
        <Route exact path = '/movies/favourites' element={<Favourites dispatch={props.dispatch} fav={props.movies.favourites}/>}>
        </Route>
      </Routes>
    </div>
  );
}



function mapStateToProps(state){

  return {
    movies: state.movies,
    search: state.search
  }
}
const connectedComponent = connect(mapStateToProps)(App)

export default connectedComponent;
