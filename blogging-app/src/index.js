import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route  } from 'react-router-dom';
import login from './components/login';
import signup from './components/signup';
import home from './components/home';
import registerServiceWorker from './registerServiceWorker';
import AddPost from './components/AddPost';
import singlePost from './components/singlePost';


ReactDOM.render(
<BrowserRouter>
    <div>
        <Route exact path = "/" component = {login} ></Route>
        <Route path = "/signup" component = {signup}></Route>
        <Route path = "/home" component = {home}></Route>
        <Route path = "/AddPost"  component = {AddPost}></Route>
        <Route path = "/singlePost/:id" component = {singlePost}></Route>
        
    </div>
</BrowserRouter>,
 document.getElementById('root'));
registerServiceWorker();
