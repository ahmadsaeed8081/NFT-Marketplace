import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Homepage from './Homepage';
import * as serviceWorker from './serviceWorker';
import CreateItem from './CreateItem';
import CreatorDashboard from './CreatorDashboard';
import Routing from './Routing'
import {BrowserRouter} from "react-router-dom"
import App from './App';

ReactDOM.render(
    <>
    
    <Routing />
</>
,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
