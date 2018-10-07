import React, { Component } from 'react';
import './Assets/default.css';
import Header from './Component/Header';
// import Footer from './Component/Footer';
import HomePage from './Component/Pages/HomePage';
import Category from './Component/Pages/Category';
import Product from './Component/Pages/Product';
import Login from './Component/Pages/Login';
import {
  BrowserRouter as Router,  
  Route, 
} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">         
        <Header />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/category' component={Category} />
        <Route exact path='/products' component={Product} />
        <Route exact path='/login' component={Login} />
      </div>
      </Router>
    );
  }
}

export default App;
