import { setLoadState } from '../../actions/appActions';

test('should generate setLoadState action object', () => {
    const action = setLoadState(true);
    expect(action).toEqual({
        type: "SET_LOAD_STATE",
        payload: true
    });
});