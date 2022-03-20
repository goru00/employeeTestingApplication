import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

import eventBus from "../../common/EventBus";
import userService from "../../services/user.service";

function Profile(props) {
    const { user: currentUser } = props;
    const [info, setInfo] = useState(null);

    if (!currentUser) {
        return <Navigate to={"/signin"} />;
    }
    return (
        <>
            <div className="container mt-3">
                <header className="jumbotron">
                    <h3>Профиль {currentUser.username}</h3>
                </header>
                <strong>
                        Права
                </strong>
                :
                <ul className="list-group">
                    {
                        currentUser.roles && currentUser.roles.map((item, index) => {
                            return (
                                <li 
                                    key={index}
                                    className="list-group-item"
                                >
                                    {item}
                                </li>)
                        })
                    }
                </ul>
            </div>
        </>
    )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);