import { fetchPokemon } from "@/services/dailyPokemon";
import { getDailyNumber } from "@/utils/dailySeed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const POKEMON_STORAGE_KEY = "pokemon-storage"

export type PokemonStorage = {
    id: number,
    name: string,
    generation: string,
    color: string,
    type1: string,
    type2: string | undefined,
    habitat: string,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    shape: string,
    height: number,
    weight: number,
    sprite: string,
    stage:number
};

async function get():Promise<PokemonStorage[]>{

    const storage = await AsyncStorage.getItem(POKEMON_STORAGE_KEY)
    const response  : PokemonStorage[] = storage ? JSON.parse(storage) : []
    
    return response
}

async function getByIdOrName(valor:number|string): Promise<PokemonStorage | null> {
    const storage = await AsyncStorage.getItem(POKEMON_STORAGE_KEY)
    let cache : PokemonStorage[] = storage ? JSON.parse(storage) : []   

    // 1 - verificar cache
    let cachedPkm = await getFromCache(valor);
    if(cachedPkm != null){
        return cachedPkm;
    }
    // 2 - buscar pela API
    else{
        const pkm = await fetchPokemon(valor);

        // se conseguir o pokemon, guarda no cache de retorna ele
        if (pkm) {
            cache.push(pkm);
            await AsyncStorage.setItem(POKEMON_STORAGE_KEY, JSON.stringify(cache));

            return pkm;
        }
    }
    
    return null;
}

async function getFromCache(valor :number|string) : Promise<PokemonStorage | null>{
    const storage = await AsyncStorage.getItem(POKEMON_STORAGE_KEY);
    let cache : PokemonStorage[] = storage ? JSON.parse(storage) : [];

    let cachedPkm: PokemonStorage | undefined;
    if(typeof valor === "string")
        cachedPkm = cache.find(p => p.name.toLowerCase() === valor.toLowerCase());
    else
        cachedPkm = cache.find(p => p.id === valor);
    
    if (cachedPkm != undefined) {
        return cachedPkm;
    }
    else 
        return null
}

export async function getDailyPokemonList(): Promise<PokemonStorage[]>{
  const ids : number [] = [];

  for (let i = 0 ; i<5; i++){
    const id = getDailyNumber(1025,i);
    // está gerando 5 numeros aleatórios
    // console.log(id);
    ids.push(id);
  }

  const promises = ids.map(
      id => pokemonStorage.getByIdOrName(id)
    )
    const result = await Promise.all(promises);

    //console.log(ids);

    return result.filter(pkm => pkm != null) as PokemonStorage[];
}


export const pokemonStorage = {
    get,
    getByIdOrName,
    getFromCache,
    getDailyPokemonList
}