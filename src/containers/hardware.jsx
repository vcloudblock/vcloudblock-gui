import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { setStageSize } from '../reducers/stage-size';
import { STAGE_SIZE_MODES } from '../lib/layout-constants';

import HardwareComponent from '../components/hardware/hardware.jsx';

import VM from 'scratch-vm';

class Hardware extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onUpload'
        ]);
    }

    onUpload() {
        if (this.props.peripheralName) {
            this.props.vm.uploadToPeripheral(this.props.extensionId, this.props.codeEditorValue);
        }
        else {
            // alert
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
    peripheralName: PropTypes.string
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
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Hardware);
