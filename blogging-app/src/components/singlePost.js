import React, { Component } from 'react';
import axios from 'axios';
import Authservice from './Authservice';

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state={
            feed : null
        }
        // console.log(this.props);
        //var data = this.props.match
        //console.log(data.params);
        //var value = data.params;
        //console.log(value);
        this.homeroute = this.homeroute.bind(this);
        this.logout = this.logout.bind(this);
        this.Auth = new Authservice();
    }
    homeroute() {
        this.props.history.replace('/');
    }
    logout() {
        this.Auth.logout();
        this.props.history.replace('/')
    }
    async componentWillMount() {
        try {
            var feed = await axios.get(`http://localhost:3001/singlePost/${this.props.match.params.id}`);
            this.setState({
                feed: feed.data.data
            })

        }
        catch (e) {
            console.log(e);
        }
    }



    render() {
        if(this.state.feed != null){
            return (
                <div>
                    <div>
                        <nav className="navheader">
                            <a onClick={this.homeroute}>Home</a>
                            <a onClick={this.logout}> Logout </a>
                        </nav>
                    </div>
                    <div>
                        Post detail
                        <p> title {this.state.feed.title}</p>
                        <p> description{this.state.feed.postcontent} </p>
                    </div>
                </div>
            );
        }
        return (<div>No Data</div>);
    }
}

export default SinglePost;