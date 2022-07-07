import { combineReducers } from "redux"
import { ADD_MOVIES, ADD_SEARCH_RESULT, ADD_SEARCH_TO_MOVIES,REMOVE_DROPDOWN } from "../actions"
import { ADD_FAVOURITES } from "../actions"
import { REMOVE_FAVOURITES } from "../actions"

var initialMovieState={
    list:[],
    favourites:[]
}
export function add_movies(state=initialMovieState,action) {
    
    switch(action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list:action.movies
            }
        case ADD_FAVOURITES:
            return {
                ...state,
                favourites:[action.movie,...state.favourites]
            }
        case REMOVE_FAVOURITES:
            var newArr = state.favourites.filter((item)=>item!=action.movie)
            return {
                ...state,
                favourites:newArr
            }
        case ADD_SEARCH_TO_MOVIES:
            return {
                ...state,
                list:[action.movie,...state.list]
            }
        default:
            return state
    }
}
const initialSearch = {
    showResult:false,
    searchResults:{}
}
export function search_movies(state=initialSearch,action) {

    switch(action.type) {

        case ADD_SEARCH_RESULT:
            return {
                ...state,
                showResult:true,
                searchResults:action.movie
            }
        case ADD_SEARCH_TO_MOVIES:
            return {
                ...state,
                showResult:false,
                searchResults:{}
            }
        case REMOVE_DROPDOWN:
            return {
                ...state,
                showResult:false,
                searchResults:{}
            }
        default:
            return state
    }
}

var initialState={
    movies:initialMovieState,
    search:initialSearch
}

//Custom way of combining Reducers: works in some scenarios that combineReducer can't handle

// export default function rootReducer(state=initialMovieState,action) {
//     return {
//         movies: add_movies(state.movies,action),
//         search: search_movies(state.search,action)
//     }
// }

 var rootReducer = combineReducers({
    movies:add_movies,
    search: search_movies
})
export default rootReducer;