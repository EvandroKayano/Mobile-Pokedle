import { Button } from "@/components/button";
import { captalize } from "@/components/pokedleGuess";
import { PokemonStorage } from "@/storage/pokemon-storage";
import { styles } from "./styles";

import { router } from "expo-router";
import { Image, Modal, Text, View } from "react-native";

type Props = {
    win : boolean
    guesses: number
    todaysPokemon : PokemonStorage
}

export function WinModal({win,guesses,todaysPokemon}:Props){
    return(
           <Modal 
                visible={win}
                animationType="fade"
                transparent
            >
                <View style={styles.insufilm}>
                    <View style={styles.winModal}>
                        
                        <Text style={styles.textHeader}>PARABÉNS</Text>
                        <Text style={styles.textSubHeader}>Você acertou:</Text>

                        <View style={styles.stats}>
                            <Image
                                source={{ uri: todaysPokemon.sprite }}
                                style={styles.pkmSprite}
                            />

                            <View style={styles.winInfo}>
                                <Text style={styles.pkmName}> {captalize(todaysPokemon.name)} </Text>

                                <Text 
                                    style={styles.textContent}
                                    numberOfLines={4} 
                                    adjustsFontSizeToFit={true} 
                                    minimumFontScale={0.5}
                                >
                                    Número de tentativas: {guesses}
                                </Text>
                            </View>
                        </View>


                        <Button
                            title="Voltar ao menu"
                            onPress={() => router.back()}
                            style={styles.modalButton}
                        />
                    </View>
                </View>
            </Modal>
    )
}      
