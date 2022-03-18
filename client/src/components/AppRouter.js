import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers/history';

//components
import Navbar from './navbar/navbar';

import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import EventBus from "../common/EventBus";

//pages 
import Home from '../pages/home/home';
import Login from '../pages/signin/login';

const AppRouter = (props) => {
    const [user, setUser] = useState(undefined);
    const [loaded, setLoaded] = useState(false);

    history.listen((location) => {
        props.dispath(clearMessage());
    });

    useEffect(() => {
        const user = props.user;
        if (user) {
        setUser({
            currentUser: user,
            rootRole: user.roles.includes("ROLE_MODERATOR") ||
            user.roles.includes("ROLE_ADMIN")
        });
        setLoaded(true);
        }
        EventBus.on("logout", () => {
        logout().bind(this);
        });
    }, [props]);

    return (
        <Router history={history}>
            <>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                        <Route path="signin" element={<Login />} />
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