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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 32,
    },
    title:{
        color: colors.gray[900],
        fontSize: 24,
    },
    displays:{
        justifyContent: "center",
        flexDirection: "row",
        gap: 15,
    },
})