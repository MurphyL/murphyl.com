import { render } from 'react-dom';

import App from './core/app';

console.log('process.env', process.env);

render(<App />, document.getElementById('root'));