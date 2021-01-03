import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    };


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <form onSubmit={e => this.props.handle_login(e, this.state)}>
                <h4>Login</h4>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    ></input>
                </div>
                <input type="submit"></input>
            </form>
        )
    }
}

export default LoginForm;

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
};