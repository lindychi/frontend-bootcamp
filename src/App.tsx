import React from 'react';
import './App.css';
import './consts/style.css';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

function App() {
  const router = useRoutes(routes) ;

  return <div>{router}</div>;

}

export default App;



