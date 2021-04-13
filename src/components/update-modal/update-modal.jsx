import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './update-modal.css';

const UpdateModalComponent = props => (
    <Modal
        className={styles.modalContent}
        headerClassName={styles.header}
        id="updateModal"
        onRequestClose={props.onCancel}
        shouldCloseOnOverlayClick={false}
        closeButtonVisible={false}
    >
        <Box className={styles.body}>
            <Box className={styles.updateTitle}>
                <div>
                    <FormattedMessage
                        defaultMessage="New updates are ready"
                        description="Tile of update modal"
                        id="gui.updateModel.tile"
                    />
                </div>
            </Box>
            <Box className={styles.updateInfo}>
                {props.extensionVersion ? (
                    <div>
                        <div className={styles.bold}>
                            <FormattedMessage
                                defaultMessage="New extension version:"
                                description="Label of new extension version"
                                id="gui.updateModel.newExtensionVersion"
                            />
                            {` ${props.extensionVersion}\n\n`}
                        </div>
                        <div>
                            {`${props.extensionMessage}\n\n`}
                        </div>
                    </div>
                ) : null}
                {props.deviceVersion ? (
                    <div>
                        <div className={styles.bold}>
                            <FormattedMessage
                                defaultMessage="New device version:"
                                description="Label of new device version"
                                id="gui.updateModel.newDeviceVersion"
                            />
                            {` ${props.deviceVersion}\n\n`}
                        </div>
                        <div>
                            {props.deviceMessage}
                        </div>
                    </div>
                ) : null}
            </Box>
            <Box className={styles.bottomArea}>
                <button
                    className={classNames(styles.bottomAreaItem, styles.updateButton, styles.primary)}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Update later"
                        description="Button in bottom to update later"
                        id="gui.updateModal.updateLater"
                    />
                </button>
                <button
                    className={classNames(styles.bottomAreaItem, styles.updateButton)}
                    onClick={props.onClickUpdate}
                >
                    <FormattedMessage
                        defaultMessage="Update and restart"
                        description="Button in bottom to confirm update and restart"
                        id="gui.updateModal.updateAndRestart"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
);

UpdateModalComponent.propTypes = {
    onClickUpdate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    extensionVersion: PropTypes.string.isRequired,
    extensionMessage: PropTypes.string.isRequired,
    deviceVersion: PropTypes.string.isRequired,
    deviceMessage: PropTypes.string.isRequired
};

UpdateModalComponent.defaultProps = {
};

export {
    UpdateModalComponent as default
};
