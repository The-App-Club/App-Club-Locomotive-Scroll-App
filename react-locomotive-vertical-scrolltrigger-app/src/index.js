import {useRef} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {GlobalStyles} from './styles/GlobalStyles';
import {LocomotiveScrollProvider} from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import {ScrollTriggerProxy} from './components/ScrollTriggerProxy';
import {Spacer} from './components/Spacer';
import {Home} from './components/Home';
const App = ({context}) => {
  const mainRef = useRef(null);

  return (
    <>
      <GlobalStyles />

      <LocomotiveScrollProvider
        options={{
          smooth: true,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
          // ... all available Locomotive Scroll instance options
        }}
        watch={
          [
            //..all the dependencies you want to watch to update the scroll.
            //  Basicaly, you would want to watch page/location changes
            //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
          ]
        }
        containerRef={mainRef}
      >
        <ScrollTriggerProxy />
        <main data-scroll-container ref={mainRef}>
          {[...Array(30)].map((n, index) => {
            return <Spacer key={index} />;
          })}
          <Home />
          {[...Array(30)].map((n, index) => {
            return <Spacer key={index} />;
          })}
          <Home />
          {[...Array(30)].map((n, index) => {
            return <Spacer key={index} />;
          })}
        </main>
      </LocomotiveScrollProvider>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
