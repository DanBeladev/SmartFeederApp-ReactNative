export function signInUser(user){
    return{
        type:"SET_CURRENT_USERID",
        payload: user
    };
}

export function signOut(){
    return{
        type:"SIGN_OUT",
    };
}