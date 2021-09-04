import { createStore } from 'redux'

const favoritesLS = JSON.parse(localStorage.getItem('favorites'))


function addRemoveFavorites(state = {
    favorites: favoritesLS || []
}, action) {
    if(action.type === 'favorites/check'){
        return state
    }
    if(action.type === 'favorites/add-remove'){
        if(state.favorites.includes(action.city)){
            const index = state.favorites.indexOf(action.city)
            state.favorites.splice(index, 1)
        } else{
            state.favorites.push(action.city)
        }
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
        return state
    }
}

let store = createStore(addRemoveFavorites)

store.dispatch({type: 'favorites/check'})

export default store
