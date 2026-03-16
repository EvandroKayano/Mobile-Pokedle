import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";

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

    //let nGuesses : number;

    async function handleGuess(){
        let guess = await pokemonStorage.getByIdOrName(pokemonGuess.toLowerCase());
        if(guess){
            //nGuesses+=1;

            // lista de guesses de pokemon  
            const list : PokemonStorage[] = [...guessList];
            list.push(guess);
            setGuessList(list);

            // resultados da comparação
            const appraise = compareGuessToDaily(guess,dailyPokemon);
            console.log(appraise);

            // lista de resultados na ordem de guesses
            const resultados : RESULT[][] = [...resultList];
            resultados.push(appraise)
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
            <View style = {styles.inputContainer}>
                {/* <Input placeholder="Insert a pokemon name" onChangeText={setPokemonGuess} value={pokemonGuess}/> */}
                <DropdownInput
                    placeholder="Insert a pokemon name"
                    data={availableOptions}
                    input={pokemonGuess}
                    onChangeText={setPokemonGuess}
                    onSelect={(selected) => setPokemonGuess(selected)}           
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