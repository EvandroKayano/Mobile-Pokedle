import { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInputProps, TouchableOpacity, View } from "react-native";

import { pokemonStorage } from "@/storage/pokemon-storage";
import { colors } from "@/styles/colors";
import { Input } from "../input";
import { styles } from "./styles";


function filterPokemonName(text: string, list:string[]):string[]{
    // se n tiver nada devolve nada
    if(!text) return [];

    const name = text.toLowerCase().trim();
    const listaPokemons = list
            .filter( pkm => pkm.toLowerCase().startsWith(name))
            .sort((a,b) => a.localeCompare(b))
            .slice(0,5);
    
    return listaPokemons;
}

type Props = TextInputProps & {
    data: string[]
    input: string
    onChangeText: (text: string) => void;
    onSelect: (name: string) => void;
}


export function DropdownInput({data, input, onChangeText, onSelect, ...rest}:Props){
    const[visibility, setVisibility] = useState(false);
    const[suggestions, setSuggetions] = useState<string[]>([]);
    const[suggestionsImage, setSuggetionsImage] = useState<string[]>([]);

    
    function handleSelect(opcao: string){
        setVisibility(false);
        onSelect(opcao);
    }


    useEffect(() => {

        const loadSuggetions = async () =>{
            const filteredList = filterPokemonName(input,data);
            setSuggetions(filteredList);

            if (filteredList.length > 0) {
                setVisibility(true);
            } else {
                setVisibility(false);
            }

            const loadSuggetions = filteredList.map(async (pkmName) => {
                const pkm = await pokemonStorage.getFromCache(pkmName.toLowerCase());
                return pkm ? pkm.sprite : ""; 
            });

            const listImage:string[] = await Promise.all(loadSuggetions);
            setSuggetionsImage(listImage);
        }

        loadSuggetions();
        
    }, [input, data])

    
    return(
        <View style={styles.container}>
            {/* Input normal */}
            <Input
                value={input}
                onChangeText={onChangeText}
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor={colors.red[400]}
                {...rest}
            />


            {/* Só aparece se tiver alguma coisa no input */}

            {visibility && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({item, index}) => (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                style={styles.optionContainer}
                            >
                                {suggestionsImage[index] !== "" ?
                                <View style={styles.dropdownImageContainer}>
                                    <Image source={{uri: suggestionsImage[index]}} style={styles.dropdownImage}/>
                                </View>

                                :
                                <View style={styles.dropdownImageContainer}>
                                    <View style={styles.noDropdownImage}/>
                                </View>
                                }
                                <Text style={styles.text}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

        </View>
    )
}