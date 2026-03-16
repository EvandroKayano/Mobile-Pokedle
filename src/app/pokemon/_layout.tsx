import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { router, Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Layout(){
    const [fontsLoaded] = useFonts({
        "PokemonStyle" : require("@/assets/fonts/PokemonClassic.ttf")
        })
    if(!fontsLoaded){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
        return(
            <Tabs
                screenOptions={{
                    tabBarStyle:{
                        backgroundColor: colors.gray[300],
                    },
                    headerShown: false,
                    tabBarPosition: "top",
                    tabBarActiveTintColor: colors.gray[900],
                    tabBarInactiveTintColor: colors.gray[500],
                }}
            >
                
                <Tabs.Screen name="index" options={{ 
                    title:"",
                    tabBarIcon:() => <MaterialIcons name="home" size={30} onPress={()=>router.back()}/>
                    }} 
                />
                
                <Tabs.Screen name="pokedle/index" options={{ 
                    title:"",
                    tabBarIcon:() => <MaterialIcons name="catching-pokemon" size={30} onPress={()=>router.navigate("/pokemon/pokedle")}/>
                    }} 
                />
            </Tabs>
        )
}