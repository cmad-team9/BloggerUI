import React from 'react';
import ReactDOM from 'react-dom';
import TNavBar from './TNavBar.jsx';
import NewBlog from './NewBlog.jsx';
import LoginScreen from './LoginScreen.jsx';
import Blogger from './Blogger.jsx';

//ReactDOM.render(<TNavBar /> , document.getElementById('navbar'));
//ReactDOM.render(<LoginScreen /> , document.getElementById('loginscreen'));
//ReactDOM.render(<NewBlog /> , document.getElementById('newblogscreen'));

ReactDOM.render(<Blogger /> , document.getElementById('blogger'));
