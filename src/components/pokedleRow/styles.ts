import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
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
        backgroundColor: "#ffff00",
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
    nothing:{
        position: "absolute",
        height: 95,
        width: 100,
        opacity: 0.0,
    }
});