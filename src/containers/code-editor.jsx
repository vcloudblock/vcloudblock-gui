import bindAll from 'lodash.bindall';
import React from 'react';

import CodeEditorComponent from '../components/code-editor/code-editor.jsx';


class CodeEditor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleonChange'
        ]);
        this.state = { code: 'void setup() {\n  // put your setup code here, to run once:\n\n}\n\nvoid loop() {\n  // put your main code here, to run repeatedly:\n\n}' }
    }
    handleonChange (data) {
        return this.setState({code: data});
    }

    render () {
        const {
            ...props
        } = this.props;
        return (
            <CodeEditorComponent
                value={this.state.code}
                onChange={this.handleonChange}
                {...props}
            >
            </CodeEditorComponent>
        );
    }
}

export default CodeEditor;
