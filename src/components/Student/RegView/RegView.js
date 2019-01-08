import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import Nav from './../../Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { InputLabel, FormControl, FormHelperText, MenuItem, Select, Button } from '@material-ui/core';


const mapStateToProps = state => ({
    user: state.user,
    state,
  });

class RegView extends Component {
    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                Registraion View
            </div>
        )
    }
}

export default connect(mapStateToProps)(RegView);