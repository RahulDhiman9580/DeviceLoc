import actionNames from '../../utils/actionNames';

let initialState = { info : [{
    profileImage: '',
    deviceId: '',
    lat: '',
    long: ''
}]
};

export const generalInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionNames.UPDATE_REDUCER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};