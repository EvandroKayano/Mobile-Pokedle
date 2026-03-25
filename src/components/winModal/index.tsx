import { Button } from "@/components/button";
import { captalize } from "@/components/pokedleGuess";
import { PokemonStorage } from "@/storage/pokemon-storage";
import { styles } from "./styles";

import { router } from "expo-router";
import { Image, Modal, Pressable, Text, View } from "react-native";

type Props = {
    modalVisibility : boolean
    guesses: number
    todaysPokemon : PokemonStorage
    onClose: () => void
}

export function WinModal({modalVisibility,guesses,todaysPokemon, onClose}:Props){
    return(
           <Modal 
                visible={modalVisibility}
                animationType="fade"
                transparent
            >
                <Pressable style={styles.insufilm} onPress={onClose}>
                    <View style={styles.winModal}>
                        
                        <Text 
                            style={styles.textHeader}
                            numberOfLines={1} 
                            adjustsFontSizeToFit={true} 
                            minimumFontScale={0.5}
                        >
                            CONGRATULATIONS!
                        </Text>
                        <Text style={styles.textSubHeader}>You got it right:</Text>

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
                                    Number of attempts: {guesses}
                                </Text>
                            </View>
                        </View>


                        <Button
                            title="Back to menu"
                            onPress={() => router.back()}
                            style={styles.modalButton}
                        />
                    </View>
                </Pressable>
            </Modal>
    )
}      
