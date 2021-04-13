const SET_EXTENSION = 'scratch-gui/update/SET_EXTENSION';
const SET_DEVICE = 'scratch-gui/update/SET_DEVICE';
const CLEAR_UPDATE = 'scratch-gui/update/CLEAR_UPDATE';
const SET_UPGRADING = 'scratch-gui/update/SET_UPGRADING';

const initialState = {
    isUpgrading: false,
    extensionVersion: '',
    extensionMessage: '',
    deviceVersion: '',
    deviceMessage: ''
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_EXTENSION:
        return Object.assign({}, state, {
            extensionVersion: action.version,
            extensionMessage: action.message
        });
    case SET_DEVICE:
        return Object.assign({}, state, {
            deviceVersion: action.version,
            deviceMessage: action.message
        });
    case CLEAR_UPDATE:
        return Object.assign({}, state, {
            extensionVersion: '',
            extensionMessage: '',
            deviceVersion: '',
            deviceMessage: ''
        });
    case SET_UPGRADING:
        return Object.assign({}, state, {
            isUpgrading: true
        });
    default:
        return state;
    }
};

const setExtensionUpdate = function (version, message) {
    return {
        type: SET_EXTENSION,
        version: version,
        message: message
    };
};

const setDeviceUpdate = function (version, message) {
    return {
        type: SET_DEVICE,
        version: version,
        message: message
    };
};

const clearUpdate = function () {
    return {
        type: CLEAR_UPDATE
    };
};

const setUpgrading = function () {
    return {
        type: SET_UPGRADING
    };
};

export {
    reducer as default,
    initialState as updateInitialState,
    setExtensionUpdate,
    setDeviceUpdate,
    clearUpdate,
    setUpgrading
};
