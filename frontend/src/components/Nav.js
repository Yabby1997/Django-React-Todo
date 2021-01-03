import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
    const logged_out_nav = (
        <div className="card p-3">
            <button
                onClick={() => props.display_form('login')}
                className="btn btn-primary"
            >Login</button>
            <button
                onClick={() => props.display_form('signup')}
                className="btn btn-danger"
            >Signup</button>
        </div>
    );

    const logged_in_nav = (
        <div className="card p-3">
            <button
                onClick={props.handle_logout}
                className="btn btn-danger"
            >Logout</button>
        </div>
    );

    return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>
}

export default Nav;

Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
}