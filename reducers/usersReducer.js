const initialState = {
  userID: undefined,
};

export default usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USERID':
      return (state = {
        userID: action.payload,
      });
    case 'SIGN_OUT':
      return (state = {
        user: undefined,
      });
      case 'GET_USERID':
        return (state = {
          userID: state.userID,
        });
    }
  return state;
};
