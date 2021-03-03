import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';

import VM from 'openblock-vm';

import {setStageSize} from '../reducers/stage-size';
import {STAGE_SIZE_MODES} from '../lib/layout-constants';
import {openUploadProgress} from '../reducers/modals';
import {showAlertWithTimeout} from '../reducers/alerts';

import HardwareComponent from '../components/hardware/hardware.jsx';

class Hardware extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpload'
        ]);
    }

    handleUpload () {
        if (this.props.peripheralName) {
            const blocks = document.querySelector('.blocklyWorkspace .blocklyBlockCanvas');
            if (blocks.getBBox().height === 0) {
                this.props.onWorkspaceIsEmpty();
            } else {
                this.props.vm.uploadToPeripheral(this.props.deviceId, this.props.codeEditorValue);
                this.props.onOpenUploadProgress();
            }
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }

    render () {
        const {
            ...props
        } = this.props;
        return (
            <HardwareComponent
                onUpload={this.handleUpload}
                {...props}
            />
        );
    }
}

Hardware.propTypes = {
    codeEditorValue: PropTypes.string,
    deviceId: PropTypes.string,
    onNoPeripheralIsConnected: PropTypes.func.isRequired,
    peripheralName: PropTypes.string,
    onOpenUploadProgress: PropTypes.func,
    onWorkspaceIsEmpty: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    deviceId: state.scratchGui.device.deviceId,
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    peripheralName: state.scratchGui.connectionModal.peripheralName,
    codeEditorValue: state.scratchGui.code.codeEditorValue
});

const mapDispatchToProps = dispatch => ({
    onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZE_MODES.small)),
    onOpenUploadProgress: () => dispatch(openUploadProgress()),
    onWorkspaceIsEmpty: () => showAlertWithTimeout(dispatch, 'workspaceIsEmpty')
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Hardware);
