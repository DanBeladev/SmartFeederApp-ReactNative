const initialState = {
  userDetails: undefined,
  isSignIn: false,
};

export default usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USERID':
      return (state = {
        userDetails: action.payload,
        isSignIn: true,
      });
    case 'SIGN_OUT':
      return (state = {
        userDetails: undefined,
        isSignIn: false,
      });
    case 'GET_USERID':
      return (state = {
        userID: state.userID,
      });
  }
  return state;
};
