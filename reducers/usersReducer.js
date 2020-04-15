export default usersReducers= (state={userID:undefined}, action)=>{
    switch(action.type){
        case "SET_CURRENT_USERID":
            state={
                userID:action.payload
            }
            break;
        case "SIGN_OUT":
            state={
                user:undefined
            }    
    }
    return state;
}