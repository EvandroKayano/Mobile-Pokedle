import { getDailyNumber } from "@/utils/dailySeed";
import { pokemonStorage, PokemonStorage } from "@/storage/pokemon-storage";

export async function fetchPokemon(valor:number|string) : Promise<PokemonStorage | null>{
  const pokemonRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${valor}`
  );

  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${valor}`
  );

  if (!pokemonRes.ok || !speciesRes.ok ){
    console.log("fail to connect")
    return null;
  }

  const pokemon = await pokemonRes.json();
  const species = await speciesRes.json();


  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    generation: species.generation?.name || "unknown",
    color: species.color?.name || "unknown",
    type1:pokemon.types[0].type.name,
    type2: pokemon.types[1]?.type.name || undefined,
    habitat: species.habitat?.name || "unknown",
    is_baby: species.is_baby,
    is_legendary: species.is_legendary,
    is_mythical: species.is_mythical,
    shape: species.shape?.name || "unknown",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  };
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

    console.log(ids);

    return result.filter(pkm => pkm != null) as PokemonStorage[];
}