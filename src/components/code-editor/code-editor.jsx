import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';

// 导入语言类型
import 'codemirror/mode/clike/clike.js';

// 按ctrl+空格进行提示功能
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';

// 导入theme文件
import './arduino.css';

const CodeEditorComponent = function (props) {
    const {
        value,
        onChange,
        options,
        ...componentProps
    } = props;
    return (
        <CodeMirror
            value={value}
            onChange={onChange}
            options={options}
            {...componentProps}
        />
    );
};

CodeEditorComponent.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string,
    options:{
        lineNumbers: PropTypes.bool,
        mode: {
            name: PropTypes.string
        },
        extraKeys: {
            "Ctrl-Space": PropTypes.string
        }, 
        theme: PropTypes.string,
        tabSize: PropTypes.number,
        indentWithTabs: PropTypes.bool
    }
};

CodeEditorComponent.defaultProps = {
    options:{
        lineNumbers: true,
        mode: { name: 'text/x-c++src' },
        extraKeys: { "Ctrl-Space": "autocomplete" }, 
        theme: "arduino",
        tabSize: 2,
        indentWithTabs: true
    }
};

export default CodeEditorComponent;
