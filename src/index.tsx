import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import React from 'react';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No element with id 'root' found");
}

ReactDOM.createRoot(rootElement).render(<App />);
