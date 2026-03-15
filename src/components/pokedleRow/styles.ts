import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 5,
    },
    sprite:{ 
        width: 100, 
        height: 100, 
        backgroundColor: colors.gray[300], 
        marginBottom: 5,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: "black",
        overflow: "hidden",
    },
    noneSprite:{
        width: 75, 
        height: 75, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    typeSprite:{
        width: 100, 
        height: 100, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    noneOuterSprite:{
        width: 100, 
        height: 100,
        marginBottom: 5,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: "black",
        overflow: "hidden",
        backgroundColor: colors.gray[300],
        justifyContent: 'center', 
        alignItems: 'center',
    },
    wrongSpot:{
        backgroundColor: 'rgba(255, 255, 0, 0.6)',
    },
    rightSpot:{
        backgroundColor: 'rgba(0, 255, 0, 0.6)'
    },
    wrongAnswer:{
        backgroundColor: 'rgba(255, 0, 0, 0.6)'
    },
    type1wrongSpot:{
        width: 100, 
        height: 100, 
        marginBottom: 5,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: "black",
        overflow: "hidden",
        justifyContent: 'center', 
        alignItems: 'center',

    },


    highLowBlock:{
        justifyContent: "center",
    },
    statsRight:{ 
        fontWeight: 'bold',
        marginBottom: 5,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: "black",
        overflow: "hidden",
        width: 100, 
        height: 100, 
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: 'rgba(0, 255, 0, 0.6)',
    },
    statsWrong:{
        fontWeight: 'bold',
        marginBottom: 5,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: "black",
        overflow: "hidden",
        width: 100, 
        height: 100, 
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
    },
    backgroundImage:{
        position: "absolute",
        height: 95,
        width: 100,
        opacity: 0.65,
    },
});