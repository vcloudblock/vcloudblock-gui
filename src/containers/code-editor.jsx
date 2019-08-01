import bindAll from 'lodash.bindall';
import React from 'react';

import CodeEditorComponent from '../components/code-editor/code-editor.jsx';


class CodeEditor extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            ...props
        } = this.props;
        return (
            <CodeEditorComponent
                {...props}
            >
            </CodeEditorComponent>
        );
    }
}

export default CodeEditor;
