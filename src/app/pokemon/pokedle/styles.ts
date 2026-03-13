import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1, 
        padding: 10, 
        backgroundColor: colors.gray[400],
        paddingHorizontal: 15,
    },
    header:{

    },
    row:{
        flexDirection: "row",
    },
    inputContainer:{
        height: 60,
        width: "100%",
        backgroundColor: colors.gray[900],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[800],
        padding: 10,
        color: colors.gray[100],
        fontSize: 16,
        flexDirection: "row",
        alignContent:"center"
    }
})