const userReducerDefaultState = {
    loggedIn: false,
};

const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_LOGIN_STATE":
            state = {
              loggedIn: action.payload
            };
            break;
        default:
            break;
    }

    return state ;
};

export default userReducer;
