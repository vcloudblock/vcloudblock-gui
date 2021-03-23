const SET_NAME = 'scratch-gui/connection-modal/setName';
const CLEAR_NAME = 'scratch-gui/connection-modal/clearName';
const SET_REALTIME_PROTOCAL_CONNECTION = 'scratch-gui/connection-modal/setRealtimeConnection';

const initialState = {
    peripheralName: null,
    realtimeConnection: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_NAME:
        return Object.assign({}, state, {
            peripheralName: action.peripheralName
        });
    case CLEAR_NAME:
        return Object.assign({}, state, {
            peripheralName: null
        });
    case SET_REALTIME_PROTOCAL_CONNECTION:
        return Object.assign({}, state, {
            realtimeConnection: action.isConnected
        });
    default:
        return state;
    }
};
const setConnectionModalPeripheralName = function (peripheralName) {
    return {
        type: SET_NAME,
        peripheralName: peripheralName
    };
};

const clearConnectionModalPeripheralName = function () {
    return {
        type: CLEAR_NAME
    };
};

const setRealtimeConnection = function (isConnected) {
    return {
        type: SET_REALTIME_PROTOCAL_CONNECTION,
        isConnected: isConnected
    };
};

export {
    reducer as default,
    initialState as connectionModalInitialState,
    setConnectionModalPeripheralName,
    clearConnectionModalPeripheralName,
    setRealtimeConnection
};
