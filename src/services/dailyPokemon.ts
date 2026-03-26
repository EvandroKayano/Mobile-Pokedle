import { PokemonStorage } from "@/storage/pokemon-storage";

export async function fetchPokemon(valor:number|string) : Promise<PokemonStorage | null>{
  if( typeof valor === "string") valor = cleanPkmName(valor)


  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${valor}`
  );
  if (!speciesRes.ok ){
    console.log("fail to connect to pokemon-species");
    return null;
  }
  const species = await speciesRes.json();
  
  let pokemonRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${valor}`
  );
  if (!pokemonRes.ok ){
    console.log("fail to connect to pokemon, trying with species id");

    pokemonRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${species.id}`
    );
  }

  const pokemonInfo = await pokemonRes.json();

  let stage = 0;

  // se nao tiver pre-evolução
  if(species.evolves_from_species === null) stage = 1;
  // se tiver
  else{
      const evolvesFromId : number = extractIdFromLink(species.evolves_from_species.url);
      const preEvo = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${evolvesFromId}/`
      );
      const preEvoPkm = await preEvo.json();
      if(preEvoPkm.evolves_from_species === null) stage = 2;
      else stage = 3;
  }


  return refinePokemonData(pokemonInfo, species, stage);
}

function refinePokemonData(pokemonInfo:any, species:any, stage:number):PokemonStorage{
  let GEN : string;
  switch(species.generation.name){
    case "generation-i":
      GEN = "Kanto"
      break;
    case "generation-ii":
      GEN = "Johto"
      break;
    case "generation-iii":
      GEN = "Hoenn"
      break;
    case "generation-iv":
      GEN = "Sinnoh"
      break;
    case "generation-v":
      GEN = "Unova"
      break;
    case "generation-vi":
      GEN = "Kalos"
      break;
    case "generation-vii":
      GEN = "Alola"
      break;
    case "generation-viii":
      if(species.pokedex_numbers[1].name == "hisui")
        GEN = "Hisui"
      else 
        GEN = "Galar"
      break;
    case "generation-ix":
      GEN = "Paldea"
      break;
    case "generation-x":
      GEN = ""
      break;
    case "generation-xi":
      GEN = ""
      break;
    default:
      GEN = "";
      break;
  }

  const formattedName = cleanPkmName(pokemonInfo.name);
  
  const enEntry = species.genera.find((entry:any) => entry.language.name === "en");
  const pokemonGenus:string = enEntry ? enEntry.genus : "Genus unknown";

  const refinedPokemon : PokemonStorage ={
    id: pokemonInfo.id,
    name: formattedName,
    height: pokemonInfo.height,
    weight: pokemonInfo.weight,
    generation: GEN,
    color: species.color?.name || "unknown",
    type1: pokemonInfo.types[0].type.name,
    type2: pokemonInfo.types[1]?.type.name || "none",
    habitat: species.habitat?.name || "Unknown",
    is_baby: species.is_baby,
    is_legendary: species.is_legendary,
    is_mythical: species.is_mythical,
    shape: species.shape?.name || "Unknown",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`,
    stage:stage,
    entry: pokemonGenus
  };

  return refinedPokemon;
}

function cleanPkmName(name : string) : string{
  if(name === "dudunsparce-two-segment")
    return "dudunsparce";

  return name.normalize("NFD")
             .replace(/[\u0300-\u036f]/g, "")
             .replace(/[.']/g,'')
             .replace(/\s+/g, '-')
             .toLowerCase();
}

const extractIdFromLink = (link:string): number => Number(new URL(link)
                                            .pathname.split("/")
                                            .filter(Boolean)
                                            .pop()
                                        )
