import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import MyApp from './src/app';

const root = createRoot(document.getElementById('main'));
root.render(<MyApp />);