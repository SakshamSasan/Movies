
import { remove_favourites } from "./actions";
import classes from './Favourites.module.css'


function Favourites(props) {


    function handleClick(movie) {

        props.dispatch(remove_favourites(movie))
        
    }

    return (
        <div className="containter my-5">
            {console.log(props,'fav la')}
            <h1 className="text-center">Favourites</h1>
            <div className="row my-5 py-4 px-2 d-flex justify-content-center">
                {props.fav.length?
                props.fav.map((movie,index)=>
                    <div className="col-12 col-lg-8 bg-white p-2 py-4" key={index}>
                        <div className="row">
                            <div className="col-1 d-flex align-items-center justify-content-center">
                                {index+1}.
                            </div>
                            <div className="col-3">
                                <div className={classes.profilePic} style={{backgroundImage:`url(${movie.Poster})`}}></div>
                            </div>
                            <div className="col-3 d-flex align-items-center">
                                <b><i>{movie.Title}</i></b>
                            </div>
                            
                            <div className="col-3 offset-1 offset-md-0 d-flex justify-content-end">
                                <div className="d-flex align-items-center"><span className="border border-danger p-2 rounded remove-btn" onClick={handleClick.bind(null,movie)}>Remove</span></div>
                            </div>
                        </div>
                    </div>
                )
                :<div className="col-12 d-flex justify-content-center"><i>No Favourites selected</i></div>}
            </div>

        </div>
    )


}
export default Favourites;