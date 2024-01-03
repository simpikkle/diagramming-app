import * as React from 'react';
import {createRoot} from 'react-dom/client';
// Replace this with a file from the specific part if you want to follow along
import { drawTasks } from './part3';

import '../src/assets/style.css';

const App = () => {

  return (
    <div className="grid wrapper">
      <button className="button button-primary" onClick={() => drawTasks()}>Draw a diagram</button>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
