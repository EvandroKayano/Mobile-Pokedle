import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Text, View } from "react-native";

import { allPokemonNames } from "@/assets/texts/pokemonNames";
import Button from "@/components/button";
import DropdownInput from "@/components/dropdown";
import PokedleImageOnly from "@/components/pokedleImageOnly";
import WinModal from "@/components/winModal";
import { compareGuessToDaily, RESULT } from "@/services/comparador";
import { pokemonStorage, PokemonStorage } from "@/storage/pokemon-storage";
import { styles } from "./styles";


export default function TCG(){
    const [dailyPokemon, setDailyPokemon] = useState<PokemonStorage>("" as unknown as PokemonStorage);
    const [tcgImage, setTcgImage] = useState("");
    
    const [pokemonGuess, setPokemonGuess] = useState("");
    const [guessList, setGuessList] = useState<PokemonStorage[]>([]);
    const [resultList, setResultList] = useState<RESULT[][]>([]);

    const [loading, setLoading] = useState(true);
    const [winCondition, setWinCondition] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);

    const [nGuesses, setNGuesses] = useState<number>(0);

    async function loadTCG(todaysPokemon: PokemonStorage){
        const response = await fetch(
            `https://api.pokemontcg.io/v2/cards?q=name:"${todaysPokemon.name}"`
        );
        const tcgList = await response.json();
        //console.log(tcgList.data[0].set.images.logo)
        const imageLink = tcgList.data[0].images.large;
        setTcgImage(imageLink);
    }

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
 
    const guessedPokemons = guessList.map(pokemon => pokemon.name.toLowerCase())
    const availableOptions = allPokemonNames.filter(nome => !guessedPokemons.includes(nome.toLowerCase()))

    let blurIntensity : number;
    // 9, 30, 5
    if(nGuesses <= 9){
        blurIntensity = 30 - (nGuesses * 2);
    }
    else 
        blurIntensity = 10;


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
                const data = await pokemonStorage.getDailyPokemonList();
                setDailyPokemon(data[3]);
                loadTCG(data[3]);
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

            {/* ----- Win ----- */}
            <WinModal
                modalVisibility={modalVisibility}
                guesses={nGuesses}
                todaysPokemon={dailyPokemon}
                onClose={()=>setModalVisibility(false)}
            />


            {/* ----- ROUTER ----- */}
            <View style={styles.header}>
                <MaterialIcons 
                    name="arrow-back" 
                    size={30} 
                    color="black" 
                    onPress={() => router.back()}
                />
                <Text style={styles.headerText}>Who's That Pokemon?</Text>
            </View>
            

            {/* ----- PORTRAIT ----- */}
            <View style={styles.imageWrapper}>
                <View style={styles.shadowContainer}>
                    <Image
                        style={styles.tcg}
                        source={{uri: tcgImage}}
                        resizeMode="contain"

                        blurRadius={blurIntensity}
                    />
                </View>
            </View>



            {/*             
                <View style={{height: 150, padding: 20, width: 900 }}>
                    <Button title="[DEV] Resetar Banco" onPress={resetarBancoDeDados} />
                </View> 
            */}



            {/* ----- INPUT ----- */}
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

            {/* ----- GUESSES ----- */}
            <View style={styles.imageGuesses}>
                <FlatList
                    data={guessList}
                    style={styles.row}
                    ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                    keyExtractor={ (item) => `${item.id}` }
                    renderItem={({item}) => (   
                        <PokedleImageOnly pokemon={item} daily={dailyPokemon}/>
                    )}
                    
                />
            </View>
        </View>
    );
}