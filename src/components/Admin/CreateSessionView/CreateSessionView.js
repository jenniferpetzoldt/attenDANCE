import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputLabel, FormControl, MenuItem, Select, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class CreateSessionView extends Component {
    render() {
        return (
            <div>
                Create Session View
            </div>
        )
    }
}

export default connect(mapStateToProps)(CreateSessionView);