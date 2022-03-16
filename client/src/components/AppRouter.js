import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers/history';

//components
import Navbar from './Navbar';

//pages 
import Home from '../pages/Home/Home';
import Result from '../pages/Result/Result';

const AppRouter = (props) => {
    return (
        <Router history={history}>
            <>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                        <Route path="results" element={<Result />} />
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