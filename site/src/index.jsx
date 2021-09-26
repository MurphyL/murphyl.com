import React from 'react';
import ReactDOM from 'react-dom';

import App from 'core/app.jsx';

console.log('process.env', process.env);

const container = document.getElementById('root');

ReactDOM.render(<App />, container);
