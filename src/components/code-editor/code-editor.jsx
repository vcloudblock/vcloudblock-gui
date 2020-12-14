import React from 'react';
import PropTypes from 'prop-types';

import MonacoEditor from 'react-monaco-editor';

import Box from '../box/box.jsx';

import styles from './code-editor.css';

const CodeEditorComponent = props => {
    const {
        language,
        value,
        options,
        width,
        onChange,
        editorDidMount,
        theme,
        ...componentProps
    } = props;
    return (
        <Box className={styles.codeEditor}>
            <MonacoEditor
                language={language}
                value={value}
                options={options}
                width={width}
                onChange={onChange}
                editorDidMount={editorDidMount}
                theme={theme}
                {...componentProps}
            />
        </Box>
    );
};

CodeEditorComponent.propTypes = {
    language: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.shape({
        highlightActiveIndentGuide: PropTypes.bool,
        cursorSmoothCaretAnimation: PropTypes.bool,
        readOnly: PropTypes.bool,
        contextmenu: PropTypes.bool,
        minimap: PropTypes.shape({
            enabled: PropTypes.bool
        })
    }),
    height: PropTypes.number,
    width: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    editorDidMount: PropTypes.func,
    theme: PropTypes.string
};

CodeEditorComponent.defaultProps = {
    language: 'cpp',
    theme: 'vs-light',
    height: 500,
    options: {
        highlightActiveIndentGuide: false,
        cursorSmoothCaretAnimation: true,
        readOnly: true,
        contextmenu: false,
        minimap: {
            enabled: false
        }
    }
};

export default CodeEditorComponent;
