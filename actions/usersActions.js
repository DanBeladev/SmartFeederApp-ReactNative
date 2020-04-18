export function signInUser(userDetails){
    return{
        type:"SET_CURRENT_USERID",
        payload: userDetails
    };
}

export function signOut(){
    return{
        type:"SIGN_OUT",
    };
}