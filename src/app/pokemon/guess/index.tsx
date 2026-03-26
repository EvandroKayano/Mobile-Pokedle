import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, ScrollView, Text, View } from "react-native";

import { allPokemonNames } from "@/assets/texts/pokemonNames";
import Button from "@/components/button";
import DropdownInput from "@/components/dropdown";
import PokedleRow from "@/components/pokedleGuess";
import WinModal from "@/components/winModal";
import { compareGuessToDaily, RESULT } from "@/services/comparador";
import { pokemonStorage, PokemonStorage } from "@/storage/pokemon-storage";
import { styles } from "./styles";


export default function Guess(){
    const [dailyPokemon, setDailyPokemon] = useState<PokemonStorage>("" as unknown as PokemonStorage);
    
    const [pokemonGuess, setPokemonGuess] = useState('');
    const [guessList, setGuessList] = useState<PokemonStorage[]>([]);
    const [resultList, setResultList] = useState<RESULT[][]>([]);

    const [loading, setLoading] = useState(true);
    const [winCondition, setWinCondition] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [nGuesses, setNGuesses] = useState<number>(0);

    async function handleGuess(){
        if(pokemonGuess == "") Alert.alert("Error","Insert a pokémon name to guess today's pokémon");
        let guess = await pokemonStorage.getByIdOrName(pokemonGuess.toLowerCase());
        if(guess){


            // lista de guesses de pokemon  
            const list : PokemonStorage[] = [...guessList];
            list.unshift(guess);
            setGuessList(list);

            // resultados da comparação
            const appraise = compareGuessToDaily(guess,dailyPokemon);

            // condição de vitória
            const sum = appraise.reduce((partialSum, a) => partialSum + a, 0);
            if(sum == 0){
                setWinCondition(true);
                setModalVisibility(true);
            }

            // lista de resultados na ordem de guesses
            const resultados : RESULT[][] = [...resultList];
            resultados.unshift(appraise)
            setResultList(resultados)
        
            // numero de guesses
            setNGuesses(list.length);

            setPokemonGuess("");
        }
    }
    
    // const resetarBancoDeDados = async () => {
    //     try {
    //         await AsyncStorage.removeItem("pokemon-cache");
    //         await AsyncStorage.clear();
    //         console.log("BD apagado");
    //         alert("Cache limpo! Reinicie o app.");
    //     } catch (error) {
    //         console.error("Erro ao limpar cache", error);
    //     }
    // }
    
    const guessedPokemons = guessList.map(pokemon => pokemon.name.toLowerCase())
    const availableOptions = allPokemonNames.filter(nome => !guessedPokemons.includes(nome.toLowerCase()))

    useEffect(() => {
        async function loadStorage() {
            try {
                const data = await pokemonStorage.getDailyPokemonList();
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

            <WinModal
                modalVisibility={modalVisibility}
                guesses={nGuesses}
                todaysPokemon={dailyPokemon}
                onClose={()=>setModalVisibility(false)}
            />

            <View style={styles.header}>
                <MaterialIcons 
                    name="arrow-back" 
                    size={30} 
                    color="black" 
                    onPress={() => router.back()}
                />
                <Text style={styles.headerText}>PokeGuess</Text>
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

                        
                {/* <View style={{height: 150, padding: 20, width: 900 }}>
                    <Button title="[DEV] Resetar Banco" onPress={resetarBancoDeDados} />
                </View>  */}
           

            
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
                            <Text style={styles.indexText}>Stage</Text>
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