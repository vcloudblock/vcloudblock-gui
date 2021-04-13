import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl, intlShape, defineMessages} from 'react-intl';

import {closeUpdateModal} from '../reducers/modals';
import {clearUpdate, setUpgrading} from '../reducers/update';

import UpdateModalComponent from '../components/update-modal/update-modal.jsx';

const messages = defineMessages({
    upgradeWarning: {
        id: 'gui.updateModal.upgradeWarning',
        defaultMessage: 'Currently unsaved projects will be lost, continue upgrade and restart?',
        description: 'Confirmation that user wants upgrade'
    }
});

class UpdateModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleClickUpdate'
        ]);
    }
    componentDidMount () {
    }
    componentWillUnmount () {
    }
    handleCancel () {
        this.props.onCloseUpdateModal();
        this.props.onClearUpdate();
    }
    handleClickUpdate () {
        const readyUpgrade = this.props.confirmWithMessage(this.props.intl.formatMessage(messages.upgradeWarning));
        if (readyUpgrade) {
            this.props.onCloseUpdateModal();
            if (typeof this.props.onClickUpdate !== 'undefined') {
                this.props.onClickUpdate();
            }
            this.props.onSetUpgrading();
        }
    }

    render () {
        return (
            <UpdateModalComponent
                onClickUpdate={this.handleClickUpdate}
                onCancel={this.handleCancel}
                extensionVersion={this.props.extensionVersion}
                extensionMessage={this.props.extensionMessage}
                deviceVersion={this.props.deviceVersion}
                deviceMessage={this.props.deviceMessage}
            />
        );
    }
}

UpdateModal.propTypes = {
    confirmWithMessage: PropTypes.func,
    intl: intlShape,
    onClickUpdate: PropTypes.func.isRequired,
    onCloseUpdateModal: PropTypes.func.isRequired,
    onClearUpdate: PropTypes.func.isRequired,
    onSetUpgrading: PropTypes.func.isRequired,
    extensionVersion: PropTypes.string.isRequired,
    extensionMessage: PropTypes.string.isRequired,
    deviceVersion: PropTypes.string.isRequired,
    deviceMessage: PropTypes.string.isRequired
};

UpdateModal.defaultProps = {
    // default to using standard js confirm
    confirmWithMessage: message => (confirm(message)) // eslint-disable-line no-alert
};

const mapStateToProps = state => ({
    extensionVersion: state.scratchGui.update.extensionVersion,
    extensionMessage: state.scratchGui.update.extensionMessage,
    deviceVersion: state.scratchGui.update.deviceVersion,
    deviceMessage: state.scratchGui.update.deviceMessage
});

const mapDispatchToProps = dispatch => ({
    onCloseUpdateModal: () => dispatch(closeUpdateModal()),
    onClearUpdate: () => dispatch(clearUpdate()),
    onSetUpgrading: () => dispatch(setUpgrading())
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(UpdateModal);
