import { router } from "expo-router"
import { Text, View } from "react-native"

import { styles } from "@/app/styles"
import { Display } from "@/components/display"

export default function Index(){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Menu Principal</Text>

            </View>

            
            <View style={styles.displays}>
                <Display title="Pokemon" image={require("@/assets/images/pkm.jpg")} onPress={() => router.navigate("/pokemon")}/>
            </View>

        </View>

    )
}