
import { colors } from "@/styles/colors";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInputProps, TouchableOpacity, View } from "react-native";
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

    
    function handleSelect(opcao: string){
        setVisibility(false);
        onSelect(opcao);
    }


    useEffect(() => {

        const filteredList = filterPokemonName(input,data);
        setSuggetions(filteredList);

        if (filteredList.length > 0 && filteredList[0].toLowerCase() !== input.toLowerCase().trim()) {
            setVisibility(true);
        } else {
            setVisibility(false);
        }
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
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                style={styles.optionContainer}
                            >
                                <Text style={styles.text}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

        </View>
    )
}