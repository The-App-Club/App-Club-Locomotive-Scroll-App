import {motion} from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, {useLayoutEffect, useRef, useMemo} from 'react';
import styled from 'styled-components';

import img1 from '../assets/image/1.webp';
import img2 from '../assets/image/2.webp';
import img3 from '../assets/image/3.webp';
import img4 from '../assets/image/4.webp';
import img5 from '../assets/image/5.webp';
import img6 from '../assets/image/6.webp';
import img7 from '../assets/image/7.webp';
import img8 from '../assets/image/8.webp';
import img9 from '../assets/image/9.webp';
import img10 from '../assets/image/10.webp';
import img11 from '../assets/image/11.webp';
import img12 from '../assets/image/12.webp';
import img13 from '../assets/image/13.webp';
import img14 from '../assets/image/14.webp';

const Section = styled(motion.section)`
  min-height: 100vh;
  height: auto;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  position: relative;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-family: 'Kaushan Script';
  font-weight: 300;
  text-shadow: 21px 11px 14px rgba(32, 32, 32, 1);

  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 11;
  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Left = styled.div`
  width: 35%;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(32, 32, 32, 1);
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  min-height: 100vh;
  z-index: 10;

  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1rem;
    font-weight: 300;
    width: 80%;
    margin: 0 auto;
  }
`;

const Right = styled.div`
  position: absolute;
  left: 35%;
  padding-left: 30%;
  background-color: transparent;
  min-height: 100vh;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30rem;
  @media screen and (max-width: 768px) {
    z-index: 12;
  }
`;

const Item = styled(motion.div)`
  width: 20rem;
  margin-right: 6rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    display: block;
    max-width: 100%;
    width: 100%;
  }

  h1 {
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(32, 32, 32, 1);
  }
  @media screen and (max-width: 768px) {
    width: 17rem;
  }
`;
const Product = ({img, title = ''}) => {
  return (
    <Item
      initial={{filter: 'grayscale(100%)'}}
      whileInView={{filter: 'grayscale(0%)'}}
      transition={{duration: 0.5}}
      viewport={{once: false, amount: 'all'}}
    >
      <img width={400} src={img} alt={title} />
      <h1>{title}</h1>
    </Item>
  );
};

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const scrollingRef = useRef(null);

  const tl = useMemo(() => {
    return gsap.timeline({paused: true});
  }, []);

  const tl2 = useMemo(() => {
    return gsap.timeline({paused: true});
  }, []);

  useLayoutEffect(() => {
    const sectionDom = sectionRef.current;
    const scrollingDom = scrollingRef.current;
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    const pinWrapWidth = scrollingDom.offsetWidth;
    sleep(1000)
      .then(() => {
        tl.to(sectionDom, {
          scrollTrigger: {
            trigger: sectionDom,
            start: 'top top',
            end: `${pinWrapWidth} bottom`,
            scroller: '[data-scroll-container]', //locomotive-scroll
            scrub: true,
            pin: true,
            markers: true,
          },
          height: `${scrollingDom.scrollWidth}px`,
          ease: 'none',
        });
      })
      .then(() => {
        tl2.to(scrollingDom, {
          scrollTrigger: {
            trigger: scrollingDom,
            start: 'top top',
            end: `${pinWrapWidth} bottom`,
            scroller: '[data-scroll-container]',
            scrub: true,
            markers: false,
          },
          x: -pinWrapWidth,
          ease: 'none',
        });
      });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      try {
        tl.kill();
        tl2.kill();
        tl2.scrollTrigger?.kill();
        window.removeEventListener('resize', handleResize);
      } catch (error) {
        console.log(error);
      }
    };
  }, [tl, tl2]);

  return (
    <Section ref={sectionRef}>
      <Title data-scroll data-scroll-speed="-1">
        New Collection
      </Title>
      <Left>
        <p>
          The brand new collection is currently being developed in USA. We
          create our products using best quality material, including the use of
          some of the pure fabrics to make our products. All products are made
          using the best materials, from the finest cotton to the finest
          fabrics.
          <br /> <br />
          We have lots of different clothing options like shoes, jackets and
          dresses. Not only clothes but we also provide unique Jewellery as
          well. It is great for us to carry our new clothes all around the
          country and look different.
        </p>
      </Left>
      <Right data-scroll ref={scrollingRef}>
        <Product img={img1} title="Man Basics" />
        <Product img={img2} title="Tops" />
        <Product img={img3} title="Sweatshirts" />
        <Product img={img4} title="Ethnic Wear" />
        <Product img={img5} title="Blazers" />
        <Product img={img6} title="Suits" />
        <Product img={img7} title="Antiques" />
        <Product img={img8} title="Jewellery" />
        <Product img={img9} title="Watches" />
        <Product img={img10} title="Special Edition" />
        <Product img={img11} title="Special Edition" />
        <Product img={img12} title="Special Edition" />
        <Product img={img13} title="Special Edition" />
        <Product img={img14} title="Special Edition" />
      </Right>
    </Section>
  );
};

export {Home};
