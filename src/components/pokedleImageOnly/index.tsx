import { PokemonStorage } from "@/storage/pokemon-storage";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
    pokemon: PokemonStorage
    daily: PokemonStorage
}

function captalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function PokedleImageOnly({ pokemon, daily }: Props) {

    const correctStyle = pokemon.id === daily.id ? styles.green : styles.red;


    return (
        <View style={[styles.container, correctStyle]}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: pokemon.sprite }}
                    style={styles.sprite}
                />
            </View>
            <Text style={styles.pokemonName}>{captalize(pokemon.name)}</Text>
    
        </View>
    )
}