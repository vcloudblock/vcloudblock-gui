import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl, intlShape} from 'react-intl';
import {defineMessages} from 'react-intl';

import VM from 'openblock-vm';
// eslint-disable-next-line no-unused-vars
import analytics from '../lib/analytics';
import deviceData from '../lib/libraries/devices/index.jsx';
import {closeUploadProgress} from '../reducers/modals';
import {showAlertWithTimeout} from '../reducers/alerts';

import UploadProgressComponent, {PHASES} from '../components/upload-progress/upload-progress.jsx';

const messages = defineMessages({
    uploadErrorMessage: {
        defaultMessage: 'Upload error',
        description: 'Prompt for upload error',
        id: 'gui.uploadProgress.uploadErrorMessage'
    }
});

class UploadProgress extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleHelp',
            'handleStdout',
            'handleUploadError',
            'handleUploadSuccess'
        ]);
        this.state = {
            extension: deviceData.find(dev => dev.deviceId === props.deviceId),
            phase: PHASES.uploading,
            peripheralName: null,
            text: ''
        };
    }
    componentDidMount () {
        this.props.vm.on('PERIPHERAL_UPLOAD_STDOUT', this.handleStdout);
        this.props.vm.on('PERIPHERAL_UPLOAD_ERROR', this.handleUploadError);
        this.props.vm.on('PERIPHERAL_UPLOAD_SUCCESS', this.handleUploadSuccess);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('PERIPHERAL_UPLOAD_STDOUT', this.handleStdout);
        this.props.vm.removeListener('PERIPHERAL_UPLOAD_ERROR', this.handleUploadError);
        this.props.vm.removeListener('PERIPHERAL_UPLOAD_SUCCESS', this.handleUploadSuccess);
    }
    handleCancel () {
        this.props.oncloseUploadProgress();
    }
    handleHelp () {
        window.open(this.state.extension.helpLink, '_blank');
        analytics.event({
            category: 'extensions',
            action: 'help',
            label: this.props.deviceId
        });
    }
    handleStdout (data) {
        this.setState({
            text: this.state.text + data.message
        });
    }
    handleUploadError (data) {
        this.setState({
            text: `${this.state.text + data.message}\r\n${this.props.intl.formatMessage(messages.uploadErrorMessage)}`,
            phase: PHASES.error
        });
        this.props.onUploadError();
    }
    handleUploadSuccess () {
        this.setState({
            phase: PHASES.success
        });
        this.props.onUploadSuccess();
        // this.handleCancel();
    }

    render () {
        return (
            <UploadProgressComponent
                connectionSmallIconURL={this.state.extension && this.state.extension.connectionSmallIconURL}
                name={this.state.extension && this.state.extension.name}
                onCancel={this.handleCancel}
                onHelp={this.handleHelp}
                text={this.state.text}
                phase={this.state.phase}
            />
        );
    }
}

UploadProgress.propTypes = {
    deviceId: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired,
    oncloseUploadProgress: PropTypes.func.isRequired,
    onUploadError: PropTypes.func.isRequired,
    onUploadSuccess: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    deviceId: state.scratchGui.device.deviceId
});

const mapDispatchToProps = dispatch => ({
    oncloseUploadProgress: () => dispatch(closeUploadProgress()),
    onUploadError: () => showAlertWithTimeout(dispatch, 'uploadError'),
    onUploadSuccess: () => showAlertWithTimeout(dispatch, 'uploadSuccess')
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(UploadProgress);
