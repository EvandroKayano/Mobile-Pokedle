import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "80%",
        backgroundColor: colors.gray[800],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[800],
        padding: 10,
        color: colors.gray[100],
        fontSize: 16,
    },
})