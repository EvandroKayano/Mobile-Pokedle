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
        alignContent: "center"
    },
    optionContainer:{
        borderWidth: 0.2,
        borderColor: colors.gray[950],
    },
    text:{
        fontSize: 24,
        fontWeight:"bold"
    }
})