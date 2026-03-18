import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: colors.gray[100], 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20,
    },
    cardJogo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        elevation: 3,
        shadowColor: colors.gray[950],
        shadowOpacity: 0.1,
    },
    gameName: { 
        fontSize: 18, 
        fontWeight: 'bold',
    },
    gameDesc: { 
        fontSize: 14, 
        color: colors.gray[500],
    },
    loadingLogo:{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})