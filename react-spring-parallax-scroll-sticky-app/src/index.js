import {createRoot} from 'react-dom/client';
import {GlobalStyles} from './styles/GlobalStyles';
import {Home} from './components/Home';
import './index.scss';
const App = ({context}) => {
  return (
    <>
      <GlobalStyles />
      <Home />
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
