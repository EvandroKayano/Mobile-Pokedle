import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { PokedleRow } from "@/components/pokedleRow";
import { getDailyPokemonList } from "@/services/dailyPokemon";
import { pokemonStorage, PokemonStorage } from "@/storage/pokemon-storage";
import { styles } from "./styles";


export default function Pokedle(){
    const [dailyPokemon, setDailyPokemon] = useState<PokemonStorage>("" as unknown as PokemonStorage);
    const [loading, setLoading] = useState(true);
    const [pokemonGuess, setPokemonGuess] = useState('');

    async function handleGuess(){
        let guess = await pokemonStorage.getByIdOrName(pokemonGuess);
    }




    useEffect(() => {
        async function testStorage() {
            try {

                const data = await getDailyPokemonList();
                setDailyPokemon(data[0]);

            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        testStorage();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <View style={styles.container}> 
            <View style = {styles.inputContainer}>
                <Input placeholder="Insert a pokemon name" autoCorrect={false} onChangeText={setPokemonGuess}/>
                <Button title="Guess" onPress={handleGuess} />
            </View>

            <FlatList
                data={[dailyPokemon]}
                showsHorizontalScrollIndicator={true}
                style={styles.row} 
                keyExtractor={item => String(item?.id)}

                renderItem={({ item }) => (   
                    <PokedleRow pokemon={item}/>
                )}
                
            />
        </View>
    );
}