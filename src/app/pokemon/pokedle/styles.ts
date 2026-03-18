import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1, 
        padding: 5, 
        backgroundColor: colors.gray[400],
        paddingHorizontal: 5,
    },
    header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 20, 
        gap: 2,
    },
    headerText:{ 
        fontSize: 24, 
        marginLeft: 10,
    },
    row:{
        marginTop: 10,
        flex: 1,
    },
    inputContainer:{
        height: 65,
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
    },
    indexColumns: {
        flexDirection: "row",
        top: 5,
        gap: 5,

    },
    indexText: {
        width: 100,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: colors.gray[100],
        
        //linha
        paddingBottom: 5,
        borderBottomWidth: 5,
        borderBottomColor: colors.gray[200],
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    insufilm:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    winModal:{
        width: '80%',
        backgroundColor: colors.gray[400],
        borderRadius: 20,
        padding: 10,
        alignItems: "center",

        shadowColor: "black",
        shadowOffset: { 
            width: 0, 
            height: 2 
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton:{
        backgroundColor: colors.red[300],
        borderRadius: 5,
        padding: 3,
        paddingLeft: 5,
        paddingRight: 5,
    }
})