export function signInUser(userID){
    return{
        type:"SET_CURRENT_USERID",
        payload:userID
    };
}

export function signOut(){
    return{
        type:"SIGN_OUT",
    };
}