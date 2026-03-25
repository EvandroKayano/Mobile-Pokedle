import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    insufilm:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    winModal:{
        width: "85%",
        backgroundColor: colors.gray[400],
        borderRadius: 20,
        padding: 10,

        shadowColor: "black",
        shadowOffset: { 
            width: 0, 
            height: 2 
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textHeader:{
        fontFamily: "PokemonStyle",
        fontSize: 24,
        textAlign: "center",
        color: "white",
        textShadowColor: "black",
        textShadowRadius: 4,
        textShadowOffset: {
            width: 0, 
            height: 2,

        }
    },
    textSubHeader:{
        fontFamily: "PokemonStyle",
        fontSize: 20,
        color: "white",
    },
    stats:{
        flexDirection: "row",
        top: 5,
        marginBottom: 15
    },
    textContent:{
        fontFamily: "PokemonStyle",
        fontSize: 14
    },
    winInfo:{
        flex: 1,
        marginLeft: 10,
        alignContent:"center",
        justifyContent:"center"
    },
    pkmName:{
        fontFamily: "PokemonStyle",
        fontSize: 20,
        color: "white",
        textShadowColor: colors.gray[500],
        textShadowRadius: 4,
        textShadowOffset: {
            width: 0, 
            height: 2,
        }
    },
    pkmSprite:{ 
        width: 100, 
        height: 100, 
        backgroundColor: colors.gray[300], 
        borderRadius: 15,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
    },

    modalButton:{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 3,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})