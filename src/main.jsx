import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/root';
import Game from './routes/game';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/game',
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <header className="header">typing</header>
    <RouterProvider router={router} />
    <footer>© 2023 Made by Nenad Kraljevic</footer>
  </React.StrictMode>
);
