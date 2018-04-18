//require("./style.css")
var React=require('react');
var ReactDOM=require('react-dom');

/***刚开始的demo*******/
var Test3 = require('./components/Pages/Pc/Test3');
// var Testlist = require('./components/testList');
// var Home = require('./components/Pages/Mobile/Home');
// var AppStore = require('./stores/AppStore');
//
import 'antd/dist/antd.css';


/****test3***********/
ReactDOM.render(
    <Test3 />,
    document.querySelector('#content')
);
// var content='<strong>content</strong>';
//
// ReactDOM.render(
//     <div dangerouslySetInnerHTML={{__html: content}}></div>,
//     document.body
// );