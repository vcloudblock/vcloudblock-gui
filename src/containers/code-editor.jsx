import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';

import CodeEditorComponent from '../components/code-editor/code-editor.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class CodeEditor extends React.Component {
    render () {
        const {
            ...props
        } = this.props;
        return (
            <CodeEditorComponent
                value={this.props.codeEditorValue}
                {...props}
            />
        );
    }
}

CodeEditor.propTypes = {
    codeEditorValue: PropTypes.string
};

const mapStateToProps = state => ({
    codeEditorValue: state.scratchGui.code.codeEditorValue
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps
    )
)(CodeEditor);
