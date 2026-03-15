import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";

export default function Layout(){
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