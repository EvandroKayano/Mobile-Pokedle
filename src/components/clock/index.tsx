import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export function Clock(){
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(()=>{
        const calculateTimeLeft = () => {
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

            // em segundos
            const diff = (tomorrow.getTime() - now.getTime());

            const hours = Math.floor  ((diff / (1000*60*60)) % 24);
            const minutes = Math.ceil((diff / 1000/60)       % 60);
            const seconds = Math.floor((diff / 1000)         % 60);   

            // formata para um tamanho maximo de 2 numero e complementa com 0
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            setTimeLeft(formattedTime);
        }

        calculateTimeLeft();

        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    },[])
    
    return(
        <View style={styles.countDown}>
            <Text 
                style={styles.clock}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
            >
                {timeLeft}
            </Text>
        </View>
    )
}