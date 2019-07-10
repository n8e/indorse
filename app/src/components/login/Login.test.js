import React from 'react';
import ReactDOM from 'react-dom';
import LoginCard from './LoginCard';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginCard />, div);
    ReactDOM.unmountComponentAtNode(div);
});
