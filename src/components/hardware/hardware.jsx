import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import classNames from 'classnames';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';

import { STAGE_SIZE_MODES } from '../../lib/layout-constants';
import CodeEditor from '../../containers/code-editor.jsx'

import styles from './hardware.css';

import largeStageIcon from './icon--large-stage.svg';
import smallStageIcon from './icon--small-stage.svg';
import uploadIcon from './icon--upload.svg';

const messages = defineMessages({
    uploadMessage: {
        defaultMessage: 'upload',
        description: 'Button to upload program',
        id: 'gui.hardware.uploadButton'
    },
    largeStageSizeMessage: {
        defaultMessage: 'Switch to large stage',
        description: 'Button to upload code to device alt',
        id: 'gui.stageHeader.codeStageSizeLarge'
    },
    smallStageSizeMessage: {
        defaultMessage: 'Switch to small stage',
        description: 'Button to change stage size to small',
        id: 'gui.stageHeader.codeStageSizeSmall'
    }
});

const HardwareComponent = props => {
    const {
        onSetStageLarge,
        onSetStageSmall,
        onUpload,
        stageSizeMode,
        ...componentProps
    } = props;
    return (
        <Box>
            <Box className={styles.stageMenuWrapper}>
                <div className={styles.uploadGroup}>
                    <div>
                        <img
                            className={styles.uploadIcon}
                            draggable={false}
                            src={uploadIcon}
                            title={props.intl.formatMessage(messages.uploadMessage)}
                            onClick={onUpload}
                        />
                    </div>
                </div>
                <div className={styles.stageSizeToggleGroup}>
                    <div>
                        <Button
                            className={classNames(
                                styles.stageButton,
                                styles.stageButtonFirst,
                                (stageSizeMode === STAGE_SIZE_MODES.small) ? null : styles.stageButtonToggledOff
                            )}
                            onClick={onSetStageSmall}
                        >
                            <img
                                alt={props.intl.formatMessage(messages.smallStageSizeMessage)}
                                className={styles.stageButtonIcon}
                                draggable={false}
                                src={smallStageIcon}
                            />
                        </Button>
                    </div>
                    <div>
                        <Button
                            className={classNames(
                                styles.stageButton,
                                styles.stageButtonLast,
                                (stageSizeMode === STAGE_SIZE_MODES.large) ? null : styles.stageButtonToggledOff
                            )}
                            onClick={onSetStageLarge}
                        >
                            <img
                                alt={props.intl.formatMessage(messages.largeStageSizeMessage)}
                                className={styles.stageButtonIcon}
                                draggable={false}
                                src={largeStageIcon}
                            />
                        </Button>
                    </div>
                </div>
            </Box>
            <Box className={classNames(styles.codeEditorWrapper)}>
                <CodeEditor width={(stageSizeMode === STAGE_SIZE_MODES.large) ? 480 : 240}/>
            </Box>
        </Box>
    );
};

HardwareComponent.propTypes = {
    intl: intlShape,
    onUpload: PropTypes.func.isRequired,
    onSetStageLarge: PropTypes.func.isRequired,
    onSetStageSmall: PropTypes.func.isRequired,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
};

HardwareComponent.defaultProps = {
    stageSizeMode: STAGE_SIZE_MODES.large
};

export default HardwareComponent;
