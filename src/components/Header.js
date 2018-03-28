import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
               <h3>{this.props.title}</h3>
            </div>
        )
    }
}