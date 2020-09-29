import React from 'react';
import PropTypes from 'prop-types';

import MonacoEditor from "react-monaco-editor";

import Box from '../box/box.jsx';

import styles from './code-editor.css';

const CodeEditorComponent = props => {
    const {
        language,
        value,
        options,
        height,
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
                height={height}
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
    options: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
    onChange: PropTypes.func,
    editorDidMount: PropTypes.func,
    theme: PropTypes.string
};

CodeEditorComponent.defaultProps = {
    language: "cpp",
    value: "void setup() {\n  // put your setup code here, to run once:\n\n}\n\nvoid loop() {\n  // put your main code here, to run repeatedly:\n\n}",
    options: {
        selectOnLineNumbers: true,
        roundedSelection: true,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false
    },
    theme: "vs-light",
    height: 500,
    width: 480,
};

export default CodeEditorComponent;
