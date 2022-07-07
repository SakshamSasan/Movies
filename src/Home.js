
import { connect } from ".";
import { add_favourites, remove_favourites } from './actions';
import classes from './Home.module.css'

function Home(props) {

    function handleClick(movie) {
       
        if(props.movies) {
            if(props.movies.favourites.includes(movie)) {
                props.dispatch(remove_favourites(movie))
            }
            else{
                props.dispatch(add_favourites(movie))
            }
           
        }
    }
    
    return (
        
        <>
            
            <div className="container my-5">
                <h1 className="text-center mb-5">Home</h1>
                
                <div className="row d-flex justify-content-center py-5">
                    {props.movies.list?props.movies.list.map((movie,index)=>
                    // <MovieCard data={movie} favourited={props.favourites} dispatch={props.dispatch} key={index} />
                        <div className="col-12 col-lg-8 p-2 pe-4 bg-white shadow rounded my-3" key={index}>
                            {console.log(props.movies.favourites)}
                            <div className="row">
                                <div className="col-3 rounded" >
                                    <div className={classes.profilePic} style={{backgroundImage:`url(${movie.Poster})`}}></div>
                                </div>
                                <div className='col-9'>
                                    <div className='d-flex justify-content-between'>
                                        <div><h3 className="d-inline-block mb-3">{movie.Title}</h3></div>
                                        <div onClick={handleClick.bind(null,movie)}>{props.movies.favourites.includes(movie)?<i style={{color:'red'}} className="fa-solid fa-heart"></i>:<i className="fa-regular fa-heart"></i>}</div>
                                    </div>
                                    <p className="mb-5"><i style={{color:'gray'}}>{movie.Plot}</i></p>
                                    <b className="d-inline-block" style={{color:'green'}}>IMdB:&nbsp;</b>
                                    <i style={{color:'rgba(237,200,69,1)'}} className="fa-solid fa-star"></i>
                                    <b>&nbsp;{movie.Ratings[0].Value}</b>

                                </div>
                            </div>
                        </div>
                    ):<h1 className='text-center'><i>Loading....</i></h1>}
                </div>
            </div>
        </>
    )
}
function mapStateToProps(state){

    return {
      movies: state.movies,
    }
  }
const connectedComponent = connect(mapStateToProps)(Home)
  
export default connectedComponent;
  
