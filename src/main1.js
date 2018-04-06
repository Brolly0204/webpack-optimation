import React from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/Header'
import Dev from './dev';
import scope from './scope';



Dev('hello main!');

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
    console.log('development', NODE_ENV);
} else {
    console.log('production', NODE_ENV);
}

let say = 'hello world!';

let output = () => { // 懒加载
    import('./lazy').then(module => {
        console.log(module.default);
    });
};
ReactDOM.render(
    <div>
    <Header title={say} />
    <button onClick={output}>点击</button>
    </div>,
    document.querySelector('#root')
)
