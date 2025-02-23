import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { NoteApp } from './NoteApp';
import './styles.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store = {store} >
    <BrowserRouter> 
        <NoteApp/>
      </BrowserRouter>
   </Provider>
  </React.StrictMode>,
)
