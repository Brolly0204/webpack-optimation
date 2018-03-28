// import dep1 from 'util/dep1';
// import add from 'util';
// import text from './no-parser'

import React from 'react';
import ReactDOM from 'react-dom';

// import Header from 'Header'
import Header from 'components/Header'
let say = 'hello world!';

console.log(say);
ReactDOM.render(
    <div>
    <Header title={say} />
    </div>,
    document.querySelector('#root')
)
