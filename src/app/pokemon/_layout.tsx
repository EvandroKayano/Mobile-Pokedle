import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";


export default function Layout(){
    const [fontsLoaded] = useFonts({
        "PokemonStyle" : require("@/assets/fonts/PokemonClassic.ttf")
    })

    if(!fontsLoaded){
        return (
            <View style={styles.loadingLogo}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }
        return(
            <Stack>
                
                <Stack.Screen 
                    name="index" 
                    options={{ 
                        title: "Minigames",
                        headerShown: true,
                        gestureEnabled: false,
                    }} 
                />
                
                <Stack.Screen 
                    name="guess/index" 
                    options={{ 
                        headerShown: false, 
                        presentation: "modal",
                    }} 
                />

                <Stack.Screen 
                    name="entries/index" 
                    options={{ 
                        headerShown: false, 
                        presentation: "modal",
                        animation: "fade_from_bottom",
                    }} 
                />

                <Stack.Screen 
                    name="wtp/index" 
                    options={{ 
                        headerShown: false, 
                        presentation: "modal"
                    }} 
                />

                <Stack.Screen 
                    name="tcg/index" 
                    options={{ 
                        headerShown: false, 
                        presentation: "modal"
                    }} 
                />
                
            </Stack>
        )
}