import { MaterialIcons } from "@expo/vector-icons";
import { Image, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { colors } from "@/styles/colors";
import { useState } from "react";
import { styles } from "./styles";

type ImageContent = {
    type: "Image"
    data: ImageSourcePropType[];
}

type TextContent = {
    type: "Text"
    data: string;
}

type TipContent = TextContent | ImageContent;

type Props = TouchableOpacityProps & {
    numGuesses : number
    maxGuesses : number
    content : TipContent
    title : string
    icon: keyof typeof MaterialIcons.glyphMap
}

// o botão só é liberado depois que a condição é atendida
// com o botão liberado, só aparece a dica se o player quiser, toggle ON/OFF



export default function Tip({numGuesses, maxGuesses, content, title, icon, ...rest}:Props){
    const [toggle, setToggle] = useState(false);

    function handleToggle(){
        if(numGuesses >= maxGuesses){
            setToggle(!toggle);
        }
    }

    const renderContent = () => {
        if(content.type === "Text"){
            return(
                <View style={styles.tipBorder}>
                    <Text
                        numberOfLines={1} 
                        adjustsFontSizeToFit
                        style={styles.tipText}
                    >
                        {content.data}
                    </Text>
                </View>
            );
        }
        if(content.type === "Image"){
            return(
                <View style={ styles.tipBorderImage }>
                    {content.data.map((img, index) => (
                        <Image 
                            key={index} 
                            source={img} 
                            style={styles.tipImage} 
                            resizeMode="contain" 
                        />
                    ))}
                </View>
            )
        }
    }

    const iconColor = (numGuesses >= maxGuesses) ? colors.yellow[500] : colors.gray[500];

    return(
        <View style={styles.tipContainer}>

            <TouchableOpacity 
                style={styles.icon} 
                onPress={handleToggle}
                activeOpacity={(numGuesses >= maxGuesses) ? 0.7 : 1}
                {...rest}
            >
                <MaterialIcons name={icon} size={30} color={iconColor}/>
                <Text style={[styles.title, {color:iconColor}]}>{title}</Text>
            </TouchableOpacity>
            
            {/* 
                Se a condição para aparecer for atendida e não estiver selecionado:
                - pode clicar, mas não aparece a dica, senão pode clicar e aparece a dica
            */}
            <View style={styles.tipContentWrapper}>
                { ((numGuesses >= maxGuesses) && toggle) ? 
                renderContent() 
                : ( ( !(numGuesses >= maxGuesses) &&
                        <View style={{width:"70%"}}>
                            <Text 
                                numberOfLines={3}
                                adjustsFontSizeToFit
                                style={styles.guessesLeft}>
                                    {maxGuesses-numGuesses} guesses left
                            </Text>
                        </View>
                    )
                )}
            </View>
        </View>
    )
}