import React from 'react';
import Authservice from './Authservice';
import './home.css';
import AddPost from './AddPost';
import { Link } from 'react-router-dom';
import axios from 'axios';

class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.logout = this.logout.bind(this);
        // this.getData = this.getData.bind(this);
        this.Auth = new Authservice();
    }


    componentWillMount() {

        if (!this.Auth.loggedIn()) {
            this.props.history.replace('/')
        }
        else {
            this.getData();
        }
    }
    async getData() {
        try {
            let url = "http://localhost:3001/home";

            let response = await axios.post(url, {
                token: this.Auth.getToken(),
            });
            //let posts = response.data.posts.map((post,i) => post);
            this.setState({ posts: response.data.posts })
            // .map ( a => 
            //     <li>

            //         {a.title}
            //         {a.postcontent}
            //         {a.user}
            //     </li> )

            console.log("Posts data: ", this.state.posts)

        } catch (e) {
            console.log(e);
            alert(e);
        }

    }

    logout() {
        this.Auth.logout();
        this.props.history.replace('/');
    }
    singleroute(a){
        this.props.history.replace('/singlePost/' + a);
        console.log(a);
    }
   

    render() {
        let img;
        let temp;
        const dataList = this.state.posts.map(a => {
            if(typeof a.image_path !== 'undefined'){
                temp = a.image_path.split('/').slice(1).join('/');
            
            }else{
                temp = null;
            }
           // temp = a.image_path.split('/').slice(1).join('/');
           // console.log(temp);
            img = `http://localhost:3001/${temp}`
            console.log("image name",img);
            return (
                <div className="main-content" key={a._id} onClick={ this.singleroute.bind(this,a._id) }>
                    <div className="watch">
                        <div className="watch-info">
                            <img src={img} alt="pic" />
                            Title:  {a.title}
                            Description: {a.postcontent}
                            Username :{a.user}
                        </div>
                    </div>
                </div>

            )
        })
        return (
            <div>
                <header className="header-container">
                    <div className="logo">
                        <h4> Blogging App</h4>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/AddPost">AddPost</Link>  </li>
                            <li> <a onClick={this.logout}> Logout </a> </li>
                        </ul>
                    </nav>
                </header>

                <div className="main-heading">
                    <div className="logo">
                        User Feed
                    </div>
                </div>
                <div className="header-container">
                    <div className=" main-content">

                        {dataList}
                    </div>
                </div>


                <footer>
                    <h5>Copyright 2018 TheIoFactory PvtLtd. - All Rights Reserved</h5>
                </footer>

            </div>


        )
    }
}
export default home
