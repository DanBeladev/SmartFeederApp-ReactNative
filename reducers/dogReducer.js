const initialState={
    currentDog:undefined
}

export default usersReducers = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_DOG':
        return (state = {
            currentDog: action.payload,  
        });
      case 'SET_NO_DOG':
        return (state = {
            currentDog:undefined
        });
      }
    return state;
  };
  