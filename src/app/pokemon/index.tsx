
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

export default function Index(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a minigame!</Text>

            <TouchableOpacity 
                style={styles.cardJogo}
                onPress={() => router.push("/pokemon/guess/")}
            >
                <MaterialIcons name="catching-pokemon" size={40} color="red" />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.gameName}>PokeGuess</Text>
                    <Text style={styles.gameDesc}>Guess today's pokémon</Text>
                </View>
            </TouchableOpacity>

        
            <TouchableOpacity 
                style={styles.cardJogo}
                onPress={() => router.push("/pokemon/cries/")}
            >
                <MaterialIcons name="volume-up" size={40} color="black" />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.gameName}>Whose cry is it?</Text>
                    <Text style={styles.gameDesc}>Guess the pokémon cry</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.cardJogo}
                onPress={() => router.push("/pokemon/wtp/")}
            >
                <MaterialIcons name="man" size={40} color="black" />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.gameName}>Who's That Pokemon?</Text>
                    <Text style={styles.gameDesc}>Guess the strange shadow</Text>
                </View>
            </TouchableOpacity>

            
        </View>
    );
}
