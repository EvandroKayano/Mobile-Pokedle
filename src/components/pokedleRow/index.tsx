import { RESULT } from "@/services/comparador";
import { PokemonStorage } from "@/storage/pokemon-storage";
import { arrows } from "@/styles/flatIcons";
import { pkmTypes } from "@/styles/pkmTypes";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View } from "react-native";
import { styles } from "./styles";

type Props = {
    pokemon: PokemonStorage
    daily: PokemonStorage
    comparison: RESULT[]
}

function directionIcon(result:RESULT):ImageSourcePropType{ 
    if(result === RESULT.HIGHER) return arrows["upArrow"]
    else if(result === RESULT.LOWER) return arrows["downArrow"]
    else return arrows["downArrow"]
}

function rightOrWrong(result:RESULT): TextStyle {
    switch(result){
        case RESULT.RIGHT:
            return styles.statsRight;
            

        case RESULT.HIGHER:
        case RESULT.LOWER:
        case RESULT.WRONG_SPOT:
        case RESULT.WRONG_ANSWER:
            return styles.statsWrong;
    }

}

export function PokedleRow({ pokemon, daily, comparison }: Props) {
    if (!comparison || comparison.length === 0) {
        return null; 
    }
    
    if(pokemon.type2 == undefined) pokemon.type2 = "none";

    let type1style: ImageStyle;
    switch(comparison[0]){
        case RESULT.RIGHT:
            type1style = styles.statsRight;
            break;
        case RESULT.WRONG_SPOT:
            type1style = styles.wrongSpot;
            break;
        case RESULT.WRONG_ANSWER:
            type1style = styles.statsWrong;
            break;
        default: 
            type1style = styles.sprite;
            break;
    }
    let type2style: ImageStyle;
    switch(comparison[1]){
        case RESULT.RIGHT:
            type2style = styles.statsRight;
            break;
        case RESULT.WRONG_SPOT:
            type2style = styles.wrongSpot;
            break;
        case RESULT.WRONG_ANSWER:
            if(pokemon.type2 === "none")
                type2style=styles.noneSprite;
            else
                type2style = styles.statsWrong;
            break;
        default:
            type2style = styles.sprite;
            break;
    }

    if(pokemon.type2 == undefined) pokemon.type2 = "none";


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
                style={type1style}
            />
            <View style={pokemon.type2 === "none" ? [styles.noneOuterSprite,{backgroundColor: 'rgba(0, 255, 0, 0.6)'}] : styles.noneOuterSprite}>
                <Image
                    source={pkmTypes[pokemon.type2]}
                    style={pokemon.type2 === "none" ? styles.noneSprite : type2style}
                />
            </View>
            
            <Text style={rightOrWrong(comparison[2])}>  {pokemon.habitat} </Text>
            <Text style={rightOrWrong(comparison[3])}>  {pokemon.color} </Text>

            <Text style={styles.statsRight}>  {pokemon.is_baby ? "Sim" : "Não"} </Text>
            <Text style={styles.statsRight}>  {pokemon.is_legendary ? "Sim" : "Não"} </Text>
            <Text style={styles.statsRight}>  {pokemon.is_mythical ? "Sim" : "Não"} </Text>

            <Text style={rightOrWrong(comparison[5])}>  {pokemon.generation} </Text>
            <Text style={rightOrWrong(comparison[6])}>  {pokemon.shape} </Text>
            
            <View style={styles.highLowBlock} >
                { (comparison[7] === RESULT.HIGHER || comparison[7] === RESULT.LOWER) &&(
                    <Image source={directionIcon(comparison[7])} style={styles.backgroundImage} />
                )}
                <Text style={rightOrWrong(comparison[7])}>  {height} </Text>
            </View>
            

            <View style={styles.highLowBlock} >
                { (comparison[8] === RESULT.HIGHER || comparison[8] === RESULT.LOWER) &&(
                    <Image source={directionIcon(comparison[8])} style={styles.backgroundImage} />
                )}
                <Text style={rightOrWrong(comparison[8])}>  {weight} </Text>
            </View>

        </View>
    )
}