import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    container:{
        width: '20%',
        height: '100%',
        backgroundColor: colors.blue[300],
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: colors.blue[900],
        fontSize: 16,
        fontWeight: '600',
    }
});