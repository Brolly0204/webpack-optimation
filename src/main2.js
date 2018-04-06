import React from 'react';
import ReactDOM from 'react-dom';
import Dev from './dev';

Dev('hello main2!')
let say = 'hello react';

ReactDOM.render(
    <h3>{say}</h3>,
    document.getElementById('root')
)