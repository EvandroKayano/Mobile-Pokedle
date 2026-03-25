import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, ImageBackground, Text, View } from "react-native";

import { allPokemonNames } from "@/assets/texts/pokemonNames";
import { Button } from "@/components/button";
import { DropdownInput } from "@/components/dropdown";
import { PokedleImageOnly } from "@/components/pokedleImageOnly";
import { WinModal } from "@/components/winModal";
import { compareGuessToDaily, RESULT } from "@/services/comparador";
import { pokemonStorage, PokemonStorage } from "@/storage/pokemon-storage";
import { randQuadrant, scaleOffset } from "@/utils/randQuadrant";
import { styles } from "./styles";


export default function Cries(){
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
                const data = await pokemonStorage.getDailyPokemonList();
                setDailyPokemon(data[1]);

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
                <Text style={styles.headerText}>Who's That Pokemon?</Text>
            </View>
            

            <View style={styles.imageWrapper}>
                <View style={styles.shadowContainer}>
                    <ImageBackground 
                        source={require('@/assets/images/wtp-background.jpg')} 
                        style={[styles.zoomedContent,
                            {transform: [
                                { scale: scaleOffset(nGuesses) },
                                { translateX: randQuadrant(dailyPokemon.id, nGuesses)[0] },
                                { translateY: randQuadrant(dailyPokemon.id, nGuesses)[1] }
                            ]}
                        ]}
                        resizeMode="cover"
                    >
                        <Image
                            source={{uri: dailyPokemon.sprite}}
                            style={styles.shadow}
                        />
                    </ImageBackground>
                </View>
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
                <View style={{height: 150, padding: 20, width: 900 }}>
                    <Button title="[DEV] Resetar Banco" onPress={resetarBancoDeDados} />
                </View> 
            */}

            <View style={{ flex: 1, width: '100%', marginTop: 20 }}>
                <FlatList
                    data={guessList}
                    style={styles.row}
                    keyExtractor={ (item) => `${item.id}` }
                    renderItem={({item}) => (   
                        <PokedleImageOnly pokemon={item} daily={dailyPokemon}/>
                    )}
                    
                />
            </View>
        </View>
    );
}