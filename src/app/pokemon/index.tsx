
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

export default function Index(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Escolha seu Jogo!</Text>

            <TouchableOpacity 
                style={styles.cardJogo}
                onPress={() => router.push("/pokemon/pokedle")}
            >
                <MaterialIcons name="catching-pokemon" size={40} color="red" />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.gameName}>Pokedle</Text>
                    <Text style={styles.gameDesc}>Adivinhe o Pokémon do dia</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    );
}
