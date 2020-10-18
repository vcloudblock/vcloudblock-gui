import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import VM from 'scratch-vm';

import { setStageSize } from '../reducers/stage-size';
import { STAGE_SIZE_MODES } from '../lib/layout-constants';
import { openUploadProgress } from '../reducers/modals';
import { showStandardAlert } from '../reducers/alerts';

import HardwareComponent from '../components/hardware/hardware.jsx';

class Hardware extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onUpload'
        ]);
    }

    onUpload() {
        // todo: if extension is not support upload alert extension is not support upload
        if (this.props.peripheralName) {
            let blocks = document.querySelector('.blocklyWorkspace .blocklyBlockCanvas');
            if (blocks.getBBox().height == 0) {
                this.props.onWorkspaceIsEmpty();
            }
            else {
                this.props.vm.uploadToPeripheral(this.props.extensionId, this.props.codeEditorValue);
                this.props.onOpenUploadProgress();
            }
        }
        else {
            // todo: if peripheral is not connected alert connect peripheral first
            console.log('connect device first');
        }
    }

    render() {
        const {
            ...props
        } = this.props;
        return (
            <HardwareComponent
                onUpload={this.onUpload}
                {...props}
            >
            </HardwareComponent>
        );
    }
}

Hardware.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired,
    extensionId: PropTypes.string,
    peripheralName: PropTypes.string,
    onOpenUploadProgress: PropTypes.func,
    onWorkspaceIsEmpty: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        stageSizeMode: state.scratchGui.stageSize.stageSize,
        extensionId: state.scratchGui.connectionModal.extensionId,
        peripheralName: state.scratchGui.connectionModal.peripheralName,
        codeEditorValue: state.scratchGui.code.codeEditorValue
    };
};

const mapDispatchToProps = dispatch => ({
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZE_MODES.small)),
    onOpenUploadProgress: () => dispatch(openUploadProgress()),
    onWorkspaceIsEmpty: () => dispatch(showStandardAlert('workspaceIsEmpty'))
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Hardware);
