import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

const Home = (props) => {
    const { user: currentUser } = props;


    if (!currentUser) {
        return <Navigate to={"/signin"} />;
    }

    return (
        <main>
            fwfwefe
        </main>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
  }
  
  export default connect(mapStateToProps)(Home);