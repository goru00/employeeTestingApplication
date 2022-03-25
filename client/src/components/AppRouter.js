import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers/history';

//components
import NavigationBar from './navigationBar/NavigationBar';

import { clearMessage } from "../actions/message";

//pages 
import Home from '../pages/home/index';
import Login from '../pages/signin/login';
import Profile from '../pages/profile/profile';
import Tests from '../pages/tests/tests';

const AppRouter = (props) => {
    const currentUser = props.user;

    history.listen((location) => {
        props.dispath(clearMessage());
    });

    return (
        <Router history={history}>
            <>
                <Routes>
                    <Route path="/" element={<NavigationBar />}>
                        <Route index element={<Home />} />
                        <Route path="signin" element={<Login />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="tests" element={<Tests />} />
                    </Route>
                </Routes>
            </>
        </Router>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(AppRouter);