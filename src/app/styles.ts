import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 25,
    },
    header:{
        paddingHorizontal: 15,
        width:"100%",
        flexDirection: "column",
        alignItems: "center",
    },
    title:{
        color: colors.gray[900],
        fontSize: 24,
    },
    displays:{
        alignItems: "center",
        flexDirection: "column",
    }
})