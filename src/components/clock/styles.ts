import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    countDown:{
        backgroundColor: colors.gray[800], 
        marginBottom: 5,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: "black",
        width: "75%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        fontFamily: "Aria"
    },
    clock:{
        color: "white",
        fontWeight: "bold",
        fontSize: 200,
        textAlign: 'center',
    },
})