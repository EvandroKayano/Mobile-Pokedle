function getSeed():number{
    const today = new Date()
    const seed = today.getFullYear() * 10000 + (today.getMonth()+1)*100  + today.getDate();
    // 20260000 + 1100 + 28 = 20261128 ,por exemplo
    return seed;
}


export function getDailyNumber(max: number, jogo: number) : number{
    const seed = getSeed() + jogo * 14749; 

    // seno fica entre -1 e 1
    const x = Math.sin(seed) *  10000;
    // sen(20261129) = -0.5150380749
    //x = -5150.380749
    const randomNumber =  x - Math.floor(x);
    // x - (parte inteira de x, pra baixo) = resto
    // -5150.380749 - (-5151) = 0.6192509999999992


    console.log(`${seed} - ${x} - ${randomNumber} - ${Math.floor(randomNumber * max)}`);
    // randomNumber serve como uma "porcentagem" do total de itens a serem escolhidos.
    // aí floor pega o debaixo para garantir que esteja dentro do numero max
    return Math.floor(randomNumber * max);
}
