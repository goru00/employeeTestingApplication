import { useEffect } from 'react';
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
import University from '../pages/university/university';
import Users from '../pages/users/users';
import Cathedras from '../pages/university/cathedras/cathedras';
import CathedraProfile from '../pages/university/cathedras/profile.cathedras';
import Directions from '../pages/university/directions/profile.direction';
import DirectionProfile from '../pages/university/directions/profile.direction';

const AppRouter = () => {
    
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
                        <Route path='users' element={<Users />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="tests" element={<Tests />} />
                        <Route path="university" element={<University />}>
                            <Route path="cathedras" element={<Cathedras />} />
                            <Route path='cathedras/:id' element={<CathedraProfile />} />
                            <Route path='cathedras/:cathedraId/directions/:directionId' element={<DirectionProfile />} />
                        </Route>
                        <Route path="signin" element={<Login />} />
                    </Route>
                </Routes>
            </>
        </Router>
    )
}

export default AppRouter;