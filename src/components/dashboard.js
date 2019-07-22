import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import Container from '@material-ui/core/Container';

import requiresLogin from './requires-login';
import {fetchUserLinks} from '../actions/links';
import UserLinks from './user-links/user-links';

const Dashboard = ({ authToken, username, name, userLinks, dispatch }) => {   

    useEffect(() => { 
        if(!userLinks.links || userLinks.links.length < 1) {
            fetchUserLinks(dispatch, authToken);
        }                              
    }, []);    

    const { links } = userLinks;

    return (
        <Container>                   
           <UserLinks />
        </Container>
    );
 }

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,        
        userLinks: state.userLinks,
        authToken: state.auth.authToken
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
