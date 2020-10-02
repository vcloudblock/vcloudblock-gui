import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import CodeEditorComponent from '../components/code-editor/code-editor.jsx';

class CodeEditor extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        const {
            ...props
        } = this.props;
        return (
            <CodeEditorComponent
                value={this.props.codeEditorValue}
                {...props}
            >
            </CodeEditorComponent>
        );
    }
}

CodeEditorComponent.propTypes = {
    codeEditorValue: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        codeEditorValue: state.scratchGui.code.codeEditorValue
    };
};

const mapDispatchToProps = dispatch => ({

});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(CodeEditor);
