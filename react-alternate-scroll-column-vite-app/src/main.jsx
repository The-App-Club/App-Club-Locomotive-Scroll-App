import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {Button} from '@mui/material';
import {Grid} from './components/Grid';
import '@fontsource/inter';
import './styles/index.scss';
const App = () => {
  return (
    <div>
      <h2>{`App`}</h2>
      <Grid />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
