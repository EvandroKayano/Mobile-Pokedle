import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPokemon } from "@/services/dailyPokemon";


const POKEMON_STORAGE_KEY = "pokemon-storage"

export type PokemonStorage = {
    id: number,
    name: string,
    height: number,
    weight: number,
    generation: string,
    color: string,
    type1: string,
    type2: string | undefined,
    habitat: string,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    shape: string,
    sprite: string
};

async function get():Promise<PokemonStorage[]>{

    const storage = await AsyncStorage.getItem(POKEMON_STORAGE_KEY)
    const response  : PokemonStorage[] = storage ? JSON.parse(storage) : []
    
    return response
}

async function getByIdOrName(valor:number|string): Promise<PokemonStorage | null> {
    const storage = await AsyncStorage.getItem(POKEMON_STORAGE_KEY)
    let cache : PokemonStorage[] = storage ? JSON.parse(storage) : []   

    let cachedPkm: PokemonStorage | undefined;
    if(typeof valor === "string")
        cachedPkm = cache.find(p => p.name.toLowerCase() === valor.toLowerCase());
    else
        cachedPkm = cache.find(p => p.id === valor);
    if (cachedPkm != undefined) {
        return cachedPkm;
    }

    const pkm = await fetchPokemon(valor);

    if (pkm) {
        cache.push(pkm);
        await AsyncStorage.setItem(POKEMON_STORAGE_KEY, JSON.stringify(cache));

        return pkm;
    }
    
    return null;
}


export const pokemonStorage = {
    get,
    getByIdOrName
}