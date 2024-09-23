import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
//import { HelmetProvider } from 'react-helmet-async';

import App from './App';
//import { ThemeProvider } from './theme';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
