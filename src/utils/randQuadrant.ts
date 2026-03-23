export function randQuadrant(id:number, attempt:number):number[]{
    let quad = id % 4;
    if(attempt > 10) return [0,0];

    let offset = attempt * 2.5;

    switch(quad){
        case 0:
            return [25-offset,25-offset];
        case 1:
            return [25-offset,-25+offset];
        case 2:
            return [-25+offset,25-offset];
        case 3:
            return [-25+offset,-25+offset];
    }

    return [0,0];
}

export function scaleOffset(attempt: number):number{
    if(attempt > 10) return 1;
    return 2.5 - (0.25 * (attempt/2))
}