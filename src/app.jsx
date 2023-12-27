import * as React from 'react';
import {createRoot} from 'react-dom/client';
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
