import React from 'react';
import ReactDOM from 'react-dom';
import RegisterCard from './RegisterCard';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegisterCard />, div);
    ReactDOM.unmountComponentAtNode(div);
});
