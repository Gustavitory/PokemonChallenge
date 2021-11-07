import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, LOADING,GET_POKEMONS_NAME } from './const';
import axios from 'axios';



//funciones de utilidad
const getPokemonsAPI = async (max, min) => {
    try {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${max}&offset=${min}`)
        const promises = poke.data.results.map((it) => axios.get(it.url))
        const pokemons = await Promise.all(promises).then(values => {
            return values.map((pk) => (
                {
                    id: pk.data.id,
                    name: pk.data.name,
                    height: pk.data.height,
                    weight: pk.data.weight,
                    abilities: pk.data.abilities,
                    hp: pk.data.stats[0].base_stat,
                    attack: pk.data.stats[1].base_stat,
                    defense: pk.data.stats[2].base_stat,
                    speed: pk.data.stats[5].base_stat,
                    image: pk.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                    imageBack: pk.data.sprites.versions["generation-v"]["black-white"].animated.back_default,
                    imageFrontDefault: pk.data.sprites.front_default,
                    imageBackDefault: pk.data.sprites.back_default,
                    imageFrontShiny: pk.data.sprites.versions["generation-v"]["black-white"].animated.front_shiny,
                    imageBackShiny:pk.data.sprites.versions["generation-v"]["black-white"].animated.back_shiny,
                    types: pk.data.types.map((t) => {
                        return {
                            name: t.type.name
                        }
                    })
                }
            ))
        })
        return pokemons
    } catch (e) {
        console.log('Error', e.message)
    }
}
// const getPokemonsName = async (name) => {
//     try {
//         const pk = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
//         return {
//                     id: pk.data.id,
//                     name: pk.data.name,
//                     height: pk.data.height,
//                     weight: pk.data.weight,
//                     abilities: pk.data.abilities,
//                     hp: pk.data.stats[0].base_stat,
//                     attack: pk.data.stats[1].base_stat,
//                     defense: pk.data.stats[2].base_stat,
//                     speed: pk.data.stats[5].base_stat,
//                     image: pk.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
//                     imageBack: pk.data.sprites.versions["generation-v"]["black-white"].animated.back_default,
//                     imageFrontDefault: pk.data.sprites.front_default,
//                     imageBackDefault: pk.data.sprites.back_default,
//                     imageFrontShiny: pk.data.sprites.versions["generation-v"]["black-white"].animated.front_shiny,
//                     imageBackShiny:pk.data.sprites.versions["generation-v"]["black-white"].animated.back_shiny,
//                     types: pk.data.types.map((t) => {
//                         return {
//                             name: t.type.name
//                         }
//                     })
//         }
//     } catch (e) {
//         console.log('Error', e.message)
//     }
// }

//Actions Creators:
export const getAllPokemons = (max, min) => {
    return async (dispatch) => {
        dispatch({ type: LOADING })
        dispatch(
            {
                type: GET_ALL_POKEMONS,
                payload: await getPokemonsAPI(max, min)
            }
        )
    }
}

export const getPokemonById = (id) => {
    return (dispatch) => {
        dispatch(
            {
                type: GET_POKEMON_BY_ID,
                payload: parseInt(id)
            }
        )
    }
}
//Encontrar un pokemon por nombre
export const getPokemonByName=(name)=>{
    return async (dispatch)=>{
        try{
        const pk=await axios(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        dispatch({type: LOADING});
        dispatch({
            type:GET_POKEMONS_NAME,
            payload:[{
                id: pk.data.id,
                name: pk.data.name,
                height: pk.data.height,
                weight: pk.data.weight,
                abilities: pk.data.abilities,
                hp: pk.data.stats[0].base_stat,
                attack: pk.data.stats[1].base_stat,
                defense: pk.data.stats[2].base_stat,
                speed: pk.data.stats[5].base_stat,
                image: pk.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                imageBack: pk.data.sprites.versions["generation-v"]["black-white"].animated.back_default,
                imageFrontDefault: pk.data.sprites.front_default,
                imageBackDefault: pk.data.sprites.back_default,
                imageFrontShiny: pk.data.sprites.versions["generation-v"]["black-white"].animated.front_shiny,
                imageBackShiny:pk.data.sprites.versions["generation-v"]["black-white"].animated.back_shiny,
                types: pk.data.types.map((t) => {
                    return {
                        name: t.type.name
                    }
                })
            }]
        }) 
        return 'success';       
    }catch (e){
        alert("this pokemon doesn't exist");
        // dispatch({type:GET_POKEMONS_NAME,payload:{doesntExist:true}
        // }) 
    }

}
}
