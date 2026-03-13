import { PressableProps, ImageSourcePropType, Pressable, ImageBackground, Text } from "react-native";
import { styles } from "./styles";

type Props = PressableProps & {
    title: string
    image: ImageSourcePropType
};

export function Display({title, image, ...rest} : Props){
    return(
        <Pressable style={styles.container} {...rest}>
            <ImageBackground style={styles.image} source={image}>
                <Text style={styles.title}>{title}</Text>
            </ImageBackground>
        </Pressable>
    )
}