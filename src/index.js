import React from 'react';
import { createRoot } from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById("root");
const root = createRoot(container)
root.render(<BrowserRouter><App /></BrowserRouter>)
