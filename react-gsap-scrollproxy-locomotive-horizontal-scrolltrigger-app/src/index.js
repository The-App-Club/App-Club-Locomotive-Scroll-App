import {useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import 'locomotive-scroll/dist/locomotive-scroll.css';

import {gsap} from 'gsap/all';
import {ScrollTrigger} from 'gsap/all';
import {default as LocomotiveScroll} from 'locomotive-scroll';

import './styles/index.scss';

const App = ({context}) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pageContainer = document.querySelector('.container');

    const scroller = new LocomotiveScroll({
      el: pageContainer,
      smooth: true,
    });

    scroller.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(pageContainer, {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: pageContainer.style.transform ? 'transform' : 'fixed',
    });

    let pinWrap = document.querySelector('.pin-wrap');
    let pinWrapWidth = pinWrap.offsetWidth;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;

    // Pinning and horizontal scrolling

    gsap.to('.pin-wrap', {
      scrollTrigger: {
        scroller: pageContainer, //locomotive-scroll
        scrub: true,
        trigger: '#sectionPin',
        pin: true,
        // anticipatePin: 1,
        start: 'top top',
        end: pinWrapWidth,
      },
      x: -horizontalScrollLength,
      ease: 'none',
    });

    const doUpdate = () => {
      scroller.update();
    };

    ScrollTrigger.addEventListener('refresh', doUpdate); //locomotive-scroll

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener('refresh', doUpdate); //locomotive-scroll
    };
  }, []);

  return (
    <div className="container">
      <section data-bgcolor="#bcb8ad" data-textcolor="#032f35">
        <div>
          <h1 data-scroll data-scroll-speed="1">
            <span>Horizontal</span> <span>scroll</span> <span>section</span>
          </h1>
          <p data-scroll data-scroll-speed="2" data-scroll-delay="0.2">
            with GSAP ScrollTrigger & Locomotive Scroll
          </p>
        </div>
      </section>

      <section id="sectionPin">
        <div className="pin-wrap">
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h2>
          {[...Array(14)].map((n, index) => {
            return (
              <img key={index} src={`/assets/image/${index + 1}.webp`} alt="" />
            );
          })}
        </div>
      </section>
      <section data-bgcolor="#e3857a" data-textcolor="#f1dba7">
        <img src={`/assets/image/${1}.webp`} alt="" />
        <h2 data-scroll data-scroll-speed="1" className="credit">
          <a
            rel="noreferrer"
            href="https://thisisadvantage.com"
            target="_blank"
          >
            Made by Advantage
          </a>
        </h2>
      </section>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
