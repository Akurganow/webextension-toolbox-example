import 'modern-css-reset';
import '../styles/newtab.css';

import React from 'react';
import { render } from 'react-dom';

import App from 'containers/App';

const Root = () => <App />;

const root = document.getElementById('root');

render(<Root />, root);
