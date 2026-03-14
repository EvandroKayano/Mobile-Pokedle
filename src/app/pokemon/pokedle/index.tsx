import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { PokedleRow } from "@/components/pokedleRow";
import { compareGuessToDaily, RESULT } from "@/services/comparador";
import { getDailyPokemonList } from "@/services/dailyPokemon";
import { pokemonStorage, PokemonStorage } from "@/storage/pokemon-storage";
import { styles } from "./styles";


export default function Pokedle(){
    const [dailyPokemon, setDailyPokemon] = useState<PokemonStorage>("" as unknown as PokemonStorage);
    
    const [pokemonGuess, setPokemonGuess] = useState('');
    const [guessList, setGuessList] = useState<PokemonStorage[]>("" as unknown as PokemonStorage[]);
    const [pokedleResult, setPokedleResult] = useState<RESULT[]>("" as unknown as RESULT[]);
    const [resultList, setResultList] = useState<RESULT[][]>("" as unknown as RESULT[][]);

    const [loading, setLoading] = useState(true);

    async function handleGuess(){
        let guess = await pokemonStorage.getByIdOrName(pokemonGuess.toLowerCase());
        
        if(guess){
            const list : PokemonStorage[] = [...guessList];
            list.push(guess);
            setGuessList(list);

            const appraise = compareGuessToDaily(guess,dailyPokemon);
            console.log(appraise);

            
            const resultados : RESULT[][] = [...resultList];
            resultados.push(appraise)

            setPokedleResult(appraise)
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
                <Input placeholder="Insert a pokemon name" autoCorrect={false} onChangeText={setPokemonGuess} value={pokemonGuess}/>
                <Button title="Guess" onPress={handleGuess} />
            </View>
            {/*
                <View style={{ flex: 1, padding: 20 }}>
                    <Button title="[DEV] Resetar Banco" onPress={resetarBancoDeDados} />
                </View>
            */} 
            <FlatList
                data={[dailyPokemon]}
                showsHorizontalScrollIndicator={true}
                style={styles.row} 

                keyExtractor={ item => String(item?.id) }

                renderItem={({ item, index }) => (   
                    <PokedleRow pokemon={item} daily={dailyPokemon} comparison={pokedleResult}/>
                )}
                
            />
            
            <FlatList
                data={guessList}
                showsHorizontalScrollIndicator={true}
                style={styles.row} 
                keyExtractor={item => String(item?.id)}

                renderItem={({ item }) => (   
                    <PokedleRow pokemon={item} daily={dailyPokemon} comparison={pokedleResult}/>
                )}
                
            />
            {/*
            */}
        </View>
    );
}