import React from 'react';
import PropTypes from 'prop-types';

import MonacoEditor from "react-monaco-editor";

const CodeEditorComponent = props => {
    const {
        language,
        value,
        options,
        onChange,
        editorDidMount,
        theme,
        ...componentProps
    } = props;
    return (
        <MonacoEditor
            language={language}
            value={value}
            options={options}
            height="400"
            width="400"
            onChange={onChange}
            editorDidMount={editorDidMount}
            theme={theme}
            {...componentProps}
        />
    );
};

CodeEditorComponent.propTypes = {
    language: PropTypes.string,
    value: PropTypes.string,
    options:PropTypes.object,
    onChange: PropTypes.func,
    editorDidMount: PropTypes.func,
    theme: PropTypes.string
};

CodeEditorComponent.defaultProps = {
    language: "cpp",
    value: "void setup() {\n  // put your setup code here, to run once:\n\n}\n\nvoid loop() {\n  // put your main code here, to run repeatedly:\n\n}",
    options:{
        selectOnLineNumbers: true,
        roundedSelection: true,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false
    },
    theme: "vs-light"
};

export default CodeEditorComponent;
