import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import {addDeviceExtension} from '../reducers/device-extension';

import extensionLibraryContent from '../lib/libraries/extensions/index.jsx';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';

const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Choose an Extension',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    },
    extensionUrl: {
        defaultMessage: 'Enter the URL of the extension',
        description: 'Prompt for unoffical extension url',
        id: 'gui.extensionLibrary.extensionUrl'
    },
    legoTag: {
        id: 'gui.library.lego',
        defaultMessage: 'Lego',
        description: 'Lego tag to filter all lego libraries.'
    }
});

const LEGO_TAG = {tag: 'lego', intlLabel: messages.legoTag};
const tagListPrefix = [LEGO_TAG];

const localExtensionsUrl = 'http://127.0.0.1:20120/';

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'isDeviceExtensionAdded'
        ]);
        this.state = {
            localExtensions: []
        }
    }

    componentDidMount() {
        fetch(localExtensionsUrl)
            .then(response => response.json())
            .then(data => {
                var localExt = [];
                data.forEach(ext => localExt.push(ext));
                this.setState({ localExtensions: localExt });
            });
    }

    isDeviceExtensionAdded(id) {
        const extId = this.props.deviceExtension.map(ext => {
            return ext.id;
        });
        return extId.includes(id);
    }

    handleItemSelect (item) {
        const id = item.extensionId;

        if (this.props.deviceId) {
            if (id && !item.disabled) {
                if (this.isDeviceExtensionAdded(id)) {
                    console.log('DeviceExtensionAdded');
                    // todo onCategorySelected()?
                } else {
                    const toolboxUrl = localExtensionsUrl + item.toolbox;
                    const blockUrl = localExtensionsUrl + item.blocks;
                    const generatorUrl = localExtensionsUrl + item.generator;

                    fetch(toolboxUrl)
                        .then(response => response.text())
                        .then(data => {
                            this.props.onAddDeviceExtension(id, data, blockUrl, generatorUrl);
                        });
                }
            }
        } else {
            let url = item.extensionURL ? item.extensionURL : id;
            if (!item.disabled && !id) {
                // eslint-disable-next-line no-alert
                url = prompt(this.props.intl.formatMessage(messages.extensionUrl));
            }
            if (id && !item.disabled) {
                if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                    this.props.onCategorySelected(id);
                } else {
                    this.props.vm.extensionManager.loadExtensionURL(url).then(() => {
                        this.props.onCategorySelected(id);
                    });
                }
            }
        }
    }
    render () {
        var extensionLibraryThumbnailData = [];

        if (this.props.deviceId) {
            extensionLibraryThumbnailData = this.state.localExtensions.filter(extension => {
                return extension.supportDevice.includes(this.props.deviceId);
            }).map(extension => ({
                rawURL: localExtensionsUrl + extension.iconURL || extensionIcon,
                ...extension
            }));
        } else {
            extensionLibraryThumbnailData = extensionLibraryContent.map(extension => ({
                rawURL: extension.iconURL || extensionIcon,
                ...extension
            }));
        }

        return (
            <LibraryComponent
                data={extensionLibraryThumbnailData}
                filterable={true}
                tags={tagListPrefix}
                id="extensionLibrary"
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    deviceExtension: PropTypes.array,
    deviceId: PropTypes.string,
    intl: intlShape.isRequired,
    onAddDeviceExtension: PropTypes.func,
    onCategorySelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = state => {
    return {
        deviceExtension: state.scratchGui.deviceExtension.deviceExtension,
        deviceId: state.scratchGui.device.deviceId
    };
};

const mapDispatchToProps = dispatch => ({
    onAddDeviceExtension: (id, xml, blocksUrl, generatorUrl) => {
        dispatch(addDeviceExtension(id, xml, blocksUrl, generatorUrl));
    },
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ExtensionLibrary);
