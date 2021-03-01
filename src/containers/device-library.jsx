import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'openblock-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import deviceLibraryContent from '../lib/libraries/devices/index.jsx';

import LibraryComponent from '../components/library/library.jsx';
import deviceIcon from '../components/action-menu/icon--sprite.svg';

const messages = defineMessages({
    deviceTitle: {
        defaultMessage: 'Choose an Device',
        description: 'Heading for the device library',
        id: 'gui.deviceLibrary.chooseADevice'
    },
    deviceUrl: {
        defaultMessage: 'Enter the URL of the device',
        description: 'Prompt for unoffical device url',
        id: 'gui.deviceLibrary.deviceUrl'
    },
    arduinoTag: {
        defaultMessage: 'Arduino',
        description: 'Arduino tag to filter all arduino devices.',
        id: 'gui.deviceLibrary.arduinoTag'
    },
    microPythonTag: {
        defaultMessage: 'MicroPython',
        description: 'Micro python tag to filter all micro python devices.',
        id: 'gui.deviceLibrary.microPythonTag'
    }
});

const ARDUINO_TAG = {tag: 'Arduino', intlLabel: messages.arduinoTag};
const MICROPYTHON_TAG = {tag: 'MicroPython', intlLabel: messages.microPythonTag};
const tagListPrefix = [ARDUINO_TAG, MICROPYTHON_TAG];

class DeviceLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        const id = item.deviceId;
        let url = item.deviceURL ? item.deviceURL : id;
        const extensions = item.extensions;
        if (!item.disabled && !id) {
            // eslint-disable-next-line no-alert
            url = prompt(this.props.intl.formatMessage(messages.deviceUrl));
        }
        if (id && !item.disabled) {
            if (this.props.vm.extensionManager.isDeviceLoaded(url)) {
                this.props.onDeviceSelected(id);
            } else {
                this.props.onDeviceChanged();
                this.props.vm.extensionManager.loadDeviceURL(url).then(() => {
                    this.props.vm.extensionManager.getLocalDeviceExtensionsList().then(() => {
                        this.props.vm.installDeviceExtension(extensions);
                    });
                    this.props.onDeviceSelected(id);
                });
            }
        }
    }
    render () {
        const deviceLibraryThumbnailData = deviceLibraryContent.map(device => ({
            rawURL: device.iconURL || deviceIcon,
            ...device
        }));

        return (
            <LibraryComponent
                data={deviceLibraryThumbnailData}
                filterable
                tags={tagListPrefix}
                id="deviceLibrary"
                title={this.props.intl.formatMessage(messages.deviceTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

DeviceLibrary.propTypes = {
    intl: intlShape.isRequired,
    onDeviceChanged: PropTypes.func,
    onDeviceSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(DeviceLibrary);
