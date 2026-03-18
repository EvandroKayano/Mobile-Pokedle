import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Modal, ScrollView, Text, View } from "react-native";

import { allPokemonNames } from "@/assets/texts/pokemonNames";
import { Button } from "@/components/button";
import { DropdownInput } from "@/components/dropdown";
import { PokedleRow } from "@/components/pokedleRow";
import { compareGuessToDaily, RESULT } from "@/services/comparador";
import { getDailyPokemonList } from "@/services/dailyPokemon";
import { pokemonStorage, PokemonStorage } from "@/storage/pokemon-storage";
import { styles } from "./styles";


export default function Pokedle(){
    const [dailyPokemon, setDailyPokemon] = useState<PokemonStorage>("" as unknown as PokemonStorage);
    
    const [pokemonGuess, setPokemonGuess] = useState('');
    const [guessList, setGuessList] = useState<PokemonStorage[]>([]);
    const [resultList, setResultList] = useState<RESULT[][]>([]);

    const [loading, setLoading] = useState(true);
    const [winCondition, setWinCondition] = useState(false);

    //let nGuesses : number;

    async function handleGuess(){
        if(pokemonGuess == "") Alert.alert("Error","Insert a pokémon name to guess today's pokémon");
        let guess = await pokemonStorage.getByIdOrName(pokemonGuess.toLowerCase());
        if(guess){
            //nGuesses+=1;

            // lista de guesses de pokemon  
            const list : PokemonStorage[] = [...guessList];
            list.unshift(guess);
            setGuessList(list);

            // resultados da comparação
            const appraise = compareGuessToDaily(guess,dailyPokemon);

            const sum = appraise.reduce((partialSum, a) => partialSum + a, 0);
            if(sum == 0){
                setWinCondition(true)
            }


            // lista de resultados na ordem de guesses
            const resultados : RESULT[][] = [...resultList];
            resultados.unshift(appraise)
            setResultList(resultados)

            setPokemonGuess("");
        }
    }
    /*
    const resetarBancoDeDados = async () => {
        try {
            await AsyncStorage.removeItem("pokemon-cache");
            await AsyncStorage.clear();
            console.log("BD apagado");
            alert("Cache limpo! Reinicie o app.");
        } catch (error) {
            console.error("Erro ao limpar cache", error);
        }
    }
    */

    const guessedPokemons = guessList.map(pokemon => pokemon.name.toLowerCase())
    const availableOptions = allPokemonNames.filter(nome => !guessedPokemons.includes(nome.toLowerCase()))

    useEffect(() => {
        async function loadStorage() {
            try {
                const data = await getDailyPokemonList();
                setDailyPokemon(data[0]);

            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadStorage();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <View style={styles.container}> 

            <Modal 
                visible={winCondition}
                animationType="fade"
                transparent
            >
                <View style={styles.insufilm}>
                    <View  style={styles.winModal}>
                        <Text>PARABÉNS</Text>

                        <Button
                            title="Voltar ao menu"
                            onPress={() => router.back()}
                            style={styles.modalButton}
                        />
                    </View>
                </View>
            </Modal>

            <View style={styles.header}>
                <MaterialIcons 
                    name="arrow-back" 
                    size={30} 
                    color="black" 
                    onPress={() => router.back()} // Isso "desempilha" o jogo e volta pro Hub!
                />
                <Text style={styles.headerText}>Pokedle</Text>
            </View>


            <View style = {styles.inputContainer}>
                <DropdownInput
                    placeholder="Insert a pokemon name"
                    data={availableOptions}
                    input={pokemonGuess}
                    onChangeText={setPokemonGuess}
                    onSelect={(selected) => setPokemonGuess(selected)}     
                    editable={!winCondition}      
                />
                <Button title="Guess" onPress={handleGuess} />
            </View>

            {/*
                <View style={{ flex: 1, padding: 20 }}>
                    <Button title="[DEV] Resetar Banco" onPress={resetarBancoDeDados} />
                </View>
            */}  

            

            

            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={true}
            >
                <View>
                    {guessList.length > 0 && 
                    (
                        <View style={styles.indexColumns}>
                            <Text style={styles.indexText}>Pokémon</Text>
                            <Text style={styles.indexText}>Type 1</Text>
                            <Text style={styles.indexText}>Type 2</Text>
                            <Text style={styles.indexText}>Habitat</Text>
                            <Text style={styles.indexText}>Color</Text>
                            <Text style={styles.indexText}>Rarity</Text>
                            <Text style={styles.indexText}>Generation</Text>
                            <Text style={styles.indexText}>Body</Text>
                            <Text style={styles.indexText}>Height</Text>
                            <Text style={styles.indexText}>Weight</Text>
                        </View>
                    )}
                    <FlatList
                        data={guessList}
                        style={styles.row} 
                        keyExtractor={ (item, index) => `${item.id}-${index}` }
                        renderItem={({ item, index }) => (   
                            <PokedleRow pokemon={item} daily={dailyPokemon} comparison={resultList[index]}/>
                        )}
                        
                    />
                </View>
            </ScrollView>
        </View>
    );
}