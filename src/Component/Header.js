import React, { Component } from 'react';
import {   
    Link
  } from 'react-router-dom';
class Header extends Component
{
    render()
    {
        return (
            <header>
               <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                            <Link className="navbar-brand" to="/">My First</Link>                          
                            </div>
                            <ul className="nav navbar-nav">
                            <li className="active"> <Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link> </li>
                            <li><Link to="/category">Category</Link></li>
                            <li><Link to="/login">Login/Registration</Link></li>
                            </ul>
                        </div>
                        </nav>
                </header>
        );
        
    }

}
export default Header;