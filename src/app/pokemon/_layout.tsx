import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { styles } from './styles';

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
                    }} 
                />
                
                <Stack.Screen 
                    name="pokedle/index" 
                    options={{ 
                        headerShown: false, 
                        presentation: 'modal'
                    }} 
                />
            </Stack>
        )
}