import { TextInput, TextInputProps, View } from "react-native"
import { colors } from "@/styles/colors"
import { styles } from "./styles"

export function Input({...rest}: TextInputProps) {
    return (
            <TextInput
                style={styles.container}
                {...rest}
                placeholderTextColor={colors.gray[400]}
            />
    )
}