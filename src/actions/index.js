
export var ADD_MOVIES='ADD_MOVIES';
export var ADD_FAVOURITES='ADD_FAVOURITES';
export var REMOVE_FAVOURITES='REMOVE_FAVOURITES';
export var ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
export var ADD_SEARCH_TO_MOVIES='ADD_SEARCH_TO_MOVIES';
export var REMOVE_DROPDOWN='REMOVE_DROPDOWN'

export function add_movies(data) {
    return {
        type:ADD_MOVIES,
        movies:data
    }
}

export function add_favourites(data) {
    return {
        type:ADD_FAVOURITES,
        movie:data
    }
}

export function remove_favourites(data) {
    return {
        type:REMOVE_FAVOURITES,
        movie:data
    }
}

export function add_search_result(movie) {
    return {
        type:ADD_SEARCH_RESULT,
        movie
    }
}

export function add_search_to_movies(movie) {
    return {
        type:ADD_SEARCH_TO_MOVIES,
        movie
    }
}

export function remove_dropdown() {
    return {
        type:REMOVE_DROPDOWN,
    }
}

//async action creator

export function fetch_movie(searchText) {
    const url = `http://www.omdbapi.com/?t=${searchText}&apikey=8da05739`

    return  async function (dispatch ) {
        var response = await fetch(url)
        var data = await response.json()

        dispatch(add_search_result(data))
        //dispatch an action to add to store
    }
    
    
}