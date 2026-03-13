import { PokemonStorage } from "@/storage/pokemon-storage";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
    pokemon: PokemonStorage
}

export function PokedleRow({ pokemon }: Props) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: pokemon.sprite }}
                style={styles.sprite}
            />
            <Text style={styles.stats}>  {pokemon.name} </Text>
            <Text style={styles.stats}>  {pokemon.type1} </Text>
            <Text style={styles.stats}>  {pokemon.type2} </Text>
            <Text style={styles.stats}>  {pokemon.height} </Text>
            <Text style={styles.stats}>  {pokemon.weight} </Text>
            <Text style={styles.stats}>  {pokemon.generation} </Text>
            <Text style={styles.stats}>  {pokemon.color} </Text>
            <Text style={styles.stats}>  {pokemon.habitat} </Text>
            <Text style={styles.stats}>  {pokemon.is_baby ? "Sim" : "Não"} </Text>
            <Text style={styles.stats}>  {pokemon.is_legendary ? "Sim" : "Não"} </Text>
            <Text style={styles.stats}>  {pokemon.is_mythical ? "Sim" : "Não"} </Text>
            <Text style={styles.stats}>  {pokemon.shape} </Text>


        </View>
    )
}