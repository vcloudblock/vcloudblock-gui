import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import classNames from 'classnames';

import {STAGE_SIZE_MODES} from '../../lib/layout-constants';
import CodeEditor from '../../containers/code-editor.jsx';

import styles from './hardware.css';

const HardwareComponent = props => {
    const {
        stageSizeMode
    } = props;
    return (
        <Box className={styles.hardwareWrapper}>
            <Box className={classNames(styles.codeEditorWrapper)}>
                <CodeEditor
                    width={(stageSizeMode === STAGE_SIZE_MODES.large) ? 480 : 240}
                />
            </Box>
            {/*
                <SerialPort Console/>
             */}
        </Box>
    );
};

HardwareComponent.propTypes = {
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES))
};

HardwareComponent.defaultProps = {
    stageSizeMode: STAGE_SIZE_MODES.large
};

export default HardwareComponent;
