import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { InputLabel, FormControl, MenuItem, Select, Button, Divider } from '@material-ui/core';

import Nav from './../../Nav/Nav';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class AttendanceView extends Component {
    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                Attendance View
            </div>
        )
    }
}

export default connect(mapStateToProps)(AttendanceView);