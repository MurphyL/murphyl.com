import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './core/reportWebVitals.js';

import App from 'core/app.jsx';

console.log('process.env', process.env);

const container = document.getElementById('root');

ReactDOM.render(<App />, container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();