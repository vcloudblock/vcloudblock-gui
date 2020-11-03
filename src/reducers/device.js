const SET_ID = 'scratch-gui/device/setId';
const CLEAR_ID = 'scratch-gui/device/clearId';
const SET_NAME = 'scratch-gui/device/setName';
const CLEAR_NAME = 'scratch-gui/device/clearName';

const initialState = {
    deviceId: null,
    deviceName: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ID:
        return Object.assign({}, state, {
            deviceId: action.deviceId
        });
    case CLEAR_ID:
        return Object.assign({}, state, {
            deviceId: null
        });
    case SET_NAME:
        return Object.assign({}, state, {
            deviceName: action.deviceName
        });
    case CLEAR_NAME:
        return Object.assign({}, state, {
            deviceName: null
        });
    default:
        return state;
    }
};

const setDeviceId = function (deviceId) {
    return {
        type: SET_ID,
        deviceId: deviceId
    };
};

const clearDeviceId = function () {
    return {
        type: CLEAR_ID
    };
};

const setDeviceName = function (deviceName) {
    return {
        type: SET_NAME,
        deviceName: deviceName
    };
};

const clearDeviceName = function () {
    return {
        type: CLEAR_NAME
    };
};

export {
    reducer as default,
    initialState as deviceInitialState,
    setDeviceId,
    clearDeviceId,
    setDeviceName,
    clearDeviceName
};
