import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        height: "100%",
        width: "80%",
        backgroundColor: colors.gray[800],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[800],
        color: colors.gray[100],
        zIndex: 10,
    },
    dropdown:{
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        backgroundColor: colors.gray[300],
        justifyContent: "center",
        alignContent: "center",
    },
    optionContainer:{
        flexDirection: "row",
        top:2,
        left:2,
    },
    text:{
        fontSize: 24,
        left: 5,
        fontFamily: "PokemonStyle"
    },
    dropdownImageContainer:{
        width: 40, 
        height: 40, 
        marginBottom: 5,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "black",
        overflow: "hidden",
    },
    dropdownImage:{ 
        width: "100%", 
        height: "100%", 
    },
    noDropdownImage:{ 
        width: "100%", 
        height: "100%", 
        marginRight: 10, 
        backgroundColor: colors.gray[400], 
    },
})