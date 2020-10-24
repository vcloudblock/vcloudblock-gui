const SET_UPLOAD_MODE = 'scratch-gui/progran-mode/SET_UPLOAD_MODE';
const SET_REALTIME_MODE = 'scratch-gui/progran-mode/SET_REALTIME_MODE';

const initialState = {
    isUplodeMode: true,
    isRealtimeMode: true
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_UPLOAD_MODE:
        return Object.assign({}, state, {
            isUplodeMode: true,
            isRealtimeMode: false
        });
    case SET_REALTIME_MODE:
        return Object.assign({}, state, {
            isUplodeMode: false,
            isRealtimeMode: true
        });
    default:
        return state;
    }
};

const setUploadMode = () => ({
    type: SET_UPLOAD_MODE
});

const setRealtimeMode = () => ({
    type: SET_REALTIME_MODE
});

export {
    reducer as default,
    initialState as programModeInitialState,
    setUploadMode,
    setRealtimeMode
};
