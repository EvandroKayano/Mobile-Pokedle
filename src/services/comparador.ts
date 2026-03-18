import { PokemonStorage } from "@/storage/pokemon-storage";

export enum RESULT {
    RIGHT,          //verde   
    WRONG_SPOT,     //laranja
    WRONG_ANSWER,   //vermelho
    LOWER,          //vermelho
    HIGHER,         //vermelho
}

export function compareGuessToDaily(guess:any, todays:any) : RESULT[] {
    let appraisal : RESULT[] = [];

    // PokemonStorage
    // 0 1 2 3 4 5 6 7 8
    if("generation" in guess && "generation" in todays){
        const guessed = guess as PokemonStorage;
        const daily = todays as PokemonStorage;

        if(guessed.id === daily.id){
            for(let i=0; i< 9; i++){
                appraisal.push(RESULT.RIGHT)
            }
            return appraisal;
        }
        //type1 0
        if(guessed.type1 == daily.type1) appraisal.push(RESULT.RIGHT)
        else if(guessed.type1 == daily.type2) appraisal.push(RESULT.WRONG_SPOT)
        else appraisal.push(RESULT.WRONG_ANSWER)
        //type2 1
        if(guessed.type2 == daily.type2) appraisal.push(RESULT.RIGHT)
        else if(guessed.type2 == daily.type1) appraisal.push(RESULT.WRONG_SPOT)
        else appraisal.push(RESULT.WRONG_ANSWER)
        //habitat 2
        appraisal.push (guessed.habitat === daily.habitat ? RESULT.RIGHT : RESULT.WRONG_ANSWER);
        //color 3
        appraisal.push (guessed.color === daily.color ? RESULT.RIGHT : RESULT.WRONG_ANSWER);
        //legendary,mythical,baby 4
        const isCorrect = 
        guessed.is_baby         === daily.is_baby       &&
        guessed.is_legendary    === daily.is_legendary  &&
        guessed.is_mythical     === daily.is_mythical;
        appraisal.push(isCorrect ? RESULT.RIGHT : RESULT.WRONG_ANSWER);

        //gen 5
        appraisal.push (guessed.generation === daily.generation ? RESULT.RIGHT : RESULT.WRONG_ANSWER);
        //shape 6
        appraisal.push (guessed.shape === daily.shape ? RESULT.RIGHT : RESULT.WRONG_ANSWER);
        //height 7 
        if(guessed.height > daily.height) appraisal.push(RESULT.LOWER)          // o pokemon é mais baixo
        else if (guessed.height < daily.height) appraisal.push(RESULT.HIGHER)   // o pokemon é mais alto
        else appraisal.push(RESULT.RIGHT)
        //weight 8
        if(guessed.weight > daily.weight) appraisal.push(RESULT.LOWER)          // o pokemon é mais baixo
        else if (guessed.weight < daily.weight) appraisal.push(RESULT.HIGHER)   // o pokemon é mais alto
        else appraisal.push(RESULT.RIGHT)

    }

    return appraisal;
}