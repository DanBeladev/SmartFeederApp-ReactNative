export function setDog(dog){
    return{
        type:'SET_CURRENT_DOG',
        payload:dog
    };
}

export function setOutDog(){
    return{
        type:'SET_NO_DOG'
    };  
}