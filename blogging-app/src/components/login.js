import React from 'react'
import { Link } from 'react-router-dom'
import './signup'
import Authservice from './Authservice'
import './index.css'
import axios from 'axios';




class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: " ",
            password: " "
        };
        this.signIn = this.signIn.bind(this);
        this.Auth = new Authservice();
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentWillMount() {
        
        
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        }
        
    }
    async signIn() {
        try {
            let response = await axios.post('http://localhost:3001', {
                username: this.state.username,
                password: this.state.password
            });
            this.Auth.setToken(response.data.token)       
            if(this.Auth.loggedIn()){
                this.props.history.replace('/home');
            }
        
        } catch (e) {
            console.log(e);
            alert(e);
        }

    }

    handleUsernameChange() {
        this.setState({ username: this.refs.username.value })
    }

    handlePasswordChange(e) {
        this.setState({ password: this.refs.password.value })
    }




    render() {
        return (

            <div className="container">
                <ul className="flex-outer">
                    <p className="flex-inner"> WEBER AUTHENTICATION PORTAL </p>
                    <li>
                        <label>Username </label>
                        <input type="text" ref="username" onChange={this.handleUsernameChange}
                            id="username" placeholder="Enter your username" />
                    </li>
                    <li>
                        <label >Password</label>
                        <input type="text" ref="password" onChange={this.handlePasswordChange}
                            id="password" placeholder="Enter your password" />
                    </li>
                    <li>
                        <button type="submit" onClick={this.signIn} >Login</button>
                    </li>
                    <li>
                        <Link to="/signup">  Not a  Member ? Signup </Link>
                    </li>

                </ul>
            </div>

        )
    }


}

export default Login
  /*
        axios.post('http://localhost:3001', {
            username: this.state.username,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response);
           
          })
          .catch(function (error) {
            console.log(error);
          });
          */