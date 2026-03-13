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
    stats:{ 
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
        backgroundColor: colors.gray[300],
    },
});