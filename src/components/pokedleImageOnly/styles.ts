import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 5,
        borderRadius: 15,
        borderColor: colors.gray[800],
        padding: 10
    },
    imageContainer:{
        width: 80,
        height: 80,
        marginRight: 15,
        borderWidth: 5,
        borderRadius: 15,
        overflow: "hidden"
    },
    sprite: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.gray[100],
    },
    pokemonName:{
        fontSize: 24,
        fontFamily: "PokemonStyle"
    },
    green:{
        backgroundColor: 'rgba(0, 200, 0, 0.6)',
    },
    red:{
        backgroundColor: 'rgba(200, 0, 0, 0.6)',
    }
})