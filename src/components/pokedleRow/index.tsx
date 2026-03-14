import { RESULT } from "@/services/comparador";
import { PokemonStorage } from "@/storage/pokemon-storage";
import { arrows } from "@/styles/flatIcons";
import { pkmTypes } from "@/styles/pkmTypes";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
    pokemon: PokemonStorage
    daily: PokemonStorage
    comparison: RESULT[]
}

function boolStyle(result:RESULT):ImageSourcePropType{ 
    if(result === RESULT.HIGHER) return arrows["upArrow"]
    else if(result === RESULT.LOWER) return arrows["downArrow"]
    else return arrows["downArrow"]
}

export function PokedleRow({ pokemon, daily, comparison }: Props) {
    if(comparison[0] === RESULT.RIGHT){
        console.log(`${RESULT.RIGHT}: RIGHT!`);
    }

    if(pokemon.type2 == undefined) pokemon.type2 = "none"
    let height="";
    if(pokemon.height > 10){                    // 21 dm
        let h = Math.floor(pokemon.height/10);  // 2
        let cm = pokemon.height - h*10;         // 1
        height = `${h}m${cm*10}`;
    }
    else
        height = `${pokemon.height*10}cm`;
    let weight = `${pokemon.weight/10}Kg`;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: pokemon.sprite }}
                style={styles.sprite}
            />
            <Image
                source={pkmTypes[pokemon.type1]}
                style={styles.sprite}
            />
            <View style={pkmTypes[pokemon.type2] === "none" ? styles.nothing : styles.noneOuterSprite}>
                <Image
                    source={pkmTypes[pokemon.type2]}
                    style={pkmTypes[pokemon.type2] === "none" ? styles.sprite : styles.noneSprite}
                />
            </View>
            
            <Text style={comparison[2] === RESULT.RIGHT ? styles.statsRight : styles.statsWrong}>  {pokemon.habitat} </Text>
            <Text style={comparison[3] === RESULT.RIGHT ? styles.statsRight : styles.statsWrong}>  {pokemon.color} </Text>
            <Text style={styles.statsRight}>  {pokemon.is_baby ? "Sim" : "Não"} </Text>
            <Text style={styles.statsRight}>  {pokemon.is_legendary ? "Sim" : "Não"} </Text>
            <Text style={styles.statsRight}>  {pokemon.is_mythical ? "Sim" : "Não"} </Text>
            <Text style={comparison[5] === RESULT.RIGHT ? styles.statsRight : styles.statsWrong}>  {pokemon.generation} </Text>
            <Text style={comparison[6] === RESULT.RIGHT ? styles.statsRight : styles.statsWrong}>  {pokemon.shape} </Text>
            
            <View style={styles.highLowBlock} >
                { (comparison[7] === RESULT.HIGHER || comparison[7] === RESULT.LOWER) &&(
                    <Image source={boolStyle(comparison[7])} style={styles.backgroundImage} />
                )}
                <Text style={comparison[7] === RESULT.RIGHT ? styles.statsRight : styles.statsWrong}>  {height} </Text>
            </View>
            

            <View style={styles.highLowBlock} >
                <Image source={boolStyle(comparison[8])} style={styles.backgroundImage} />
                <Text style={comparison[8] === RESULT.RIGHT ? styles.statsRight : styles.statsWrong}>  {weight} </Text>
            </View>

        </View>
    )
}