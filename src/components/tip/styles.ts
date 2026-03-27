import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    tipContainer:{
        alignItems: "center", 
        marginVertical: 10,
        flex: 1
    },
    icon:{
        justifyContent:"center",
        alignItems:"center",
    },
    title:{
        fontFamily: "PokemonStyle",
        fontSize: 12,
        textAlign: "center",
    },
    tipContentWrapper:{
        alignItems: "center",
        marginTop: 10
    },
    tipBorder:{
        borderRadius: 5,
        borderWidth: 3,
        borderColor: "gray",
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        backgroundColor: "white"
    },
    tipBorderImage: {
        flexDirection: "row",
        borderRadius: 5,
        borderWidth: 3,
        borderColor: "gray",
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        backgroundColor: "white"
    },
    tipText: {
        fontSize: 16,
        textAlign: "center",
        textTransform: "capitalize",
        fontWeight: "bold"
    },
    tipImage: {
        width: 50,
        height: 50,
    },
    guessesLeft:{
        fontSize: 12,
        fontFamily: "PokemonStyle",
        textAlign: "center",
        color: colors.gray[500],
    }
})

