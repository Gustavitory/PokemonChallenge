import {
    LOADING,
    POKEMON_ERROR,
    GET_ALL_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMONS_NAME
} from '../actions/const'

const initialState = {
    loading: false,
    pokemons: [],
    pokemon: {doesntExist:true},
    error: ''
}


export const rootReducer =(state=initialState,action)=>{
    switch(action.type){
        case LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case POKEMON_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case GET_ALL_POKEMONS: {
            return {
                ...state,
                pokemons: action.payload,
                loading: false,
                error: ''
            }
        }
        case GET_POKEMON_BY_ID: {
            return {
                ...state,
                pokemon: state.pokemons.filter(p => p.id === action.payload),
            }
        }
        case GET_POKEMONS_NAME:{
            return{
                ...state,
                loading:false,
                pokemon:action.payload,
                error:''
            }
        }
        default: {
            return state
        }
    }
    
}

export default rootReducer;