import appReducer from '../../reducers/appReducer';

test('should load state should be set', () => {
    const action = {
        type: 'SET_LOAD_STATE',
        payload: true
    };
    let state = jest.fn();
    state = appReducer(state, action);
    expect(state).toEqual({ loaded: true });
});