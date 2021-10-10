// import { con } from 'redux'
import { createStore } from '@reduxjs/toolkit'

const favoritesLS = JSON.parse(localStorage.getItem('favorites') || '')


function addRemoveFavorites(
    state: {favorites: string[]} = {
        favorites: favoritesLS || []
    },
    action: {type: string, city?: string}) {
    if(action.type === 'favorites/check'){
        return state
    }
    if(action.type === 'favorites/add-remove'){
        if(action.city){
            if(state.favorites.includes(action.city)){
                const index = state.favorites.indexOf(action.city)
                state.favorites.splice(index, 1)
            } else{
                state.favorites.push(action.city)
            }
        }

        localStorage.setItem('favorites', JSON.stringify(state.favorites));
        return state
    }
}


// let store = configureStore({
//     reducer: {
//         addRemoveFavorites
//     }
//     не разобрался, тут нет типа с getState
// })

// @ts-ignore
let store = createStore(addRemoveFavorites)

store.dispatch({type: 'favorites/check'})

export default store
