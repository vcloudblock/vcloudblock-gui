import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';

import CodeEditorComponent from '../components/code-editor/code-editor.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class CodeEditor extends React.Component {
    getLanguage (type) {
        if (type === 'arduino') {
            return 'cpp';
        } else if (type === 'microPython') {
            return 'python';
        }
        return 'null';
    }

    render () {
        const language = this.getLanguage(this.props.deviceType);
        const {
            ...props
        } = this.props;
        return (
            <CodeEditorComponent
                value={this.props.codeEditorValue}
                language={language}
                {...props}
            />
        );
    }
}

CodeEditor.propTypes = {
    codeEditorValue: PropTypes.string,
    deviceType: PropTypes.string
};

const mapStateToProps = state => ({
    codeEditorValue: state.scratchGui.code.codeEditorValue,
    deviceType: state.scratchGui.device.deviceType
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps
    )
)(CodeEditor);
