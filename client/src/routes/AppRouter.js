import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../helpers/history';

//components
import NavigationBar from '../components/navigationBar/NavigationBar';

import { clearMessage } from "../actions/message";
import { logout } from '../actions/auth';

//pages 
import Home from '../pages/home/index';
import Login from '../pages/signin/login';
import Profile from '../pages/profile/profile';
import Tests from '../pages/tests/tests';
import { useEffect } from 'react';

const AppRouter = (props) => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage());
        })
    }, [dispatch]);

    return (
        <Router history={history}>
            <>
                <Routes>
                    <Route path="/" element={<NavigationBar />}>
                        <Route index element={<Home />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="tests" element={<Tests />} />
                    </Route>
                    <Route path="/signin" element={<Login />} />
                </Routes>
            </>
        </Router>
    )
}

export default AppRouter;