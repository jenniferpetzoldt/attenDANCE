import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputLabel, FormControl, MenuItem, Select, Button } from '@material-ui/core';

import Nav from './../../Nav/Nav';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class CreateSessionView extends Component {
    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                Create Session View
            </div>
        )
    }
}

export default connect(mapStateToProps)(CreateSessionView);