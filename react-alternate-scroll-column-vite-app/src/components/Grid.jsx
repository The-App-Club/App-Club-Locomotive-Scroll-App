import {useEffect, useRef, useMemo, useState} from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/src/locomotive-scroll.scss';
import 'array-each-slice';
import imagesLoaded from 'imagesloaded';
import {css, cx} from '@emotion/css';
import {GridItem} from './GridItem';
import {MathUtils} from 'three';

import photos from '../data/dump';

const preloadImages = (selector) => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      {background: true},
      resolve
    );
  });
};

const Grid = () => {
  const [tik, setTik] = useState(null);
  const containerDomRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const middleColumnRef = useRef(null);
  const scroll = useRef({
    cache: 0,
    current: 0,
  });
  useEffect(() => {
    const scrollElement = new LocomotiveScroll({
      el: containerDomRef.current,
      smooth: true,
      smartphone: {
        smooth: true,
      },
      getDirection: true,
      getSpeed: true,
    });
    scrollElement.on('scroll', (obj) => {
      // Find distance between scroll updates
      scroll.current.current = obj.scroll.y;
      const distance = scroll.current.current - scroll.current.cache;
      scroll.current.cache = scroll.current.current;

      leftColumnRef.current.style.transform = `skewY(${MathUtils.clamp(
        distance,
        -10,
        10
      )}deg)`;
      rightColumnRef.current.style.transform = `skewY(${MathUtils.clamp(
        distance,
        -10,
        10
      )}deg)`;
      middleColumnRef.current.style.transform = `skewY(${MathUtils.clamp(
        -distance,
        -10,
        10
      )}deg)`;
    });

    // Preload images
    Promise.all([preloadImages('.grid-item-media')]).then(() => {
      scrollElement.update();
    });
  }, []);

  const handleResize = (e) => {
    setTik(new Date());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pieceSize = useMemo(() => {
    return Math.ceil(photos.length / 3);
  }, [photos]);

  const {leftChunk, middleChunk, rightChunk} = useMemo(() => {
    const [leftChunk, middleChunk, rightChunk] = photos.eachSlice(pieceSize);
    return {leftChunk, middleChunk, rightChunk};
  }, [pieceSize]);

  return (
    <div
      data-scroll-container
      ref={containerDomRef}
      className={css`
        @media (max-width: 768px) {
          padding: 1rem;
        }
      `}
    >
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(3, 20%);
          gap: 3rem;
          @media (max-width: 768px) {
            grid-template-columns: repeat(3, 30%);
            gap: 1rem;
          }
          justify-content: center;
          margin: 0 auto;
        `}
      >
        <div className={cx(css``, `left-column`)} ref={leftColumnRef}>
          {leftChunk.map(({url, description}, index) => (
            <GridItem key={index} url={url} description={description} />
          ))}
        </div>
        <div
          className={cx(css``, `middle-column`)}
          data-scroll
          data-scroll-speed="-20"
          // ラップするのがみそ
        >
          <div ref={middleColumnRef}>
            {middleChunk.map(({url, description}, index) => (
              <GridItem key={index} url={url} description={description} />
            ))}
          </div>
        </div>
        <div className={cx(css``, `right-column`)} ref={rightColumnRef}>
          {rightChunk.map(({url, description}, index) => (
            <GridItem key={index} url={url} description={description} />
          ))}
        </div>
      </div>
    </div>
  );
};
export {Grid};
