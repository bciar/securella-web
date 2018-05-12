import { setLoginState } from '../../actions/userActions';

test('should generate setLoginState action object', () => {
    const action = setLoginState(true);
    expect(action).toEqual({
        type: "SET_LOGIN_STATE",
        payload: true
    });
});
