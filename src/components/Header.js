import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Header extends Component {
    render() {
        return (
            <div className='header'>
               <h3>{this.props.title}</h3>
               <p>hello world</p>
            </div>
        )
    }
}

export default hot(module)(Header);