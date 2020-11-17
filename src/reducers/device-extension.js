const ADD_DEVICE_EXTENSION = 'scratch-gui/deviceExtension/addDeviceExtension';
const REMOVE_DEVICE_EXTENSION = 'scratch-gui/deviceExtension/removeDeviceExtension';
const CLEAR_DEVICE_EXTENSION = 'scratch-gui/deviceExtension/clearDeviceExtension';

const initialState = {
    deviceExtension: []
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ADD_DEVICE_EXTENSION:
        var deviceExt = Object.assign([], state.deviceExtension);
        deviceExt.push({
            id: action.id,
            xml: action.xml,
            blocksUrl: action.blocksUrl,
            generatorUrl: action.generatorUrl
        });
        return Object.assign({}, state, {
            deviceExtension: deviceExt
        });
    case REMOVE_DEVICE_EXTENSION:
        return Object.assign({}, state, {
            deviceExtension: deviceExtension.filter((ext) => {
                if (ext.id === action.id) {
                    return false;
                } else {
                    return true;
                }
            })
        });
    case CLEAR_DEVICE_EXTENSION:
        return Object.assign({}, state, {
            deviceExtension: []
        });
    default:
        return state;
    }
};

const addDeviceExtension = function (id, xml, blocksUrl, generatorUrl) {
    return {
        type: ADD_DEVICE_EXTENSION,
            id: id,
            xml: xml,
            blocksUrl: blocksUrl,
            generatorUrl: generatorUrl
    };
};

const removeDeviceExtension = function (id) {
    return {
        type: REMOVE_DEVICE_EXTENSION,
        id: id
    };
};

const clearDeviceExtension = function () {
    return {
        type: CLEAR_DEVICE_EXTENSION
    };
};


export {
    reducer as default,
    initialState as deviceExtensionInitialState,
    addDeviceExtension,
    removeDeviceExtension,
    clearDeviceExtension
};
