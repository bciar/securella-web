import userReducer from '../../reducers/userReducer';

test('should load state should be set', () => {
    const action = {
        type: 'SET_LOGIN_STATE',
        payload: true
    };
    let state = jest.fn();
    state = userReducer(state, action);
    expect(state).toEqual({ loggedIn: true });
});