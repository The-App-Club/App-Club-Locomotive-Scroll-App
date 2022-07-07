import {motion} from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {useState, useLayoutEffect, useRef, useMemo, useCallback} from 'react';
import styled from '@emotion/styled';

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

import {Photos} from './Photos';

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

// https://codepen.io/chriscoyier/pen/ZVYXRx
const PictureFrame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 90vh;
  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;
  border-image-source: linear-gradient(to left, #743ad5, #d53a9d);

  z-index: 11;

  @media screen and (max-width: 768px) {
    box-shadow: 0 0 0 60vw rgba(32, 32, 32, 1);
    width: 80vw;
    height: 80vh;
  }
`;

const Container = styled(motion.div)`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10vh;
  @media screen and (max-width: 768px) {
    width: 60vw;
  }
`;

const Title = styled(motion.h1)`
  position: absolute;
  top: 13%;
  left: 5%;
  font-weight: 800;
  font-size: 4rem;
  text-shadow: 15px 15px 3px rgba(32, 32, 32, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Kaushan Script';

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubTitle = styled(motion.div)`
  z-index: 9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: rgba(255, 255, 255);
  & div {
    display: flex;
    flex-direction: row;
  }
  & h1 {
    font-family: 'Kaushan Script';
    font-size: 10rem;
    text-shadow: 15px 15px 3px rgba(32, 32, 32, 0.8);
    @media screen and (max-width: 768px) {
      font-size: 3rem;
    }
  }
`;

const Description = styled(motion.p)`
  position: absolute;
  top: 10%;
  right: 5%;
  width: 30vw;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// https://www.framer.com/docs/transition/
const titleVariants = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
      type: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
  },
};

const itemStaggerVariants = {
  hidden: {
    opacity: 0,
  },

  enter: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const Home = () => {
  const [isShow, setIsShow] = useState(false);
  const [description, setDescription] = useState(false);
  const sectionRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

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

    sleep(1000)
      .then(() => {
        tl.to(sectionDom, {
          scrollTrigger: {
            trigger: sectionDom,
            start: 'top top',
            end: () => {
              const {top, bottom} = scrollingDom.getBoundingClientRect();
              return `${bottom}px ${top}px`;
            },
            // end: 'bottom+=800% top-=100%',
            scroller: '[data-scroll-container]', //locomotive-scroll
            scrub: true,
            pin: true,
            markers: false,
          },
        });
      })
      .then(() => {
        tl2.fromTo(
          scrollingDom,
          {
            y: '0',
          },
          {
            y: '-100%',
            scrollTrigger: {
              trigger: scrollingDom,
              start: 'top top',
              end: 'bottom top',
              scroller: '[data-scroll-container]',
              scrub: true,
              markers: false,
            },
          }
        );
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

  const subscribeShowUpNotify = useCallback(({isShow, description}) => {
    // console.log("isShow, description", isShow, description)
    setIsShow(isShow);
    setDescription(description);
  }, []);

  return (
    <Section ref={sectionRef}>
      <PictureFrame />

      <Title
        data-scroll
        data-scroll-speed={-1.3}
        data-scroll-direction={'horizontal'}
      >
        {'Cowboy Bebop'}
      </Title>

      <SubTitle
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={titleVariants}
      >
        <div>
          {'CowboyBebop'.split('').map((char, index) => {
            return (
              <motion.h1
                key={index}
                data-scroll
                data-scroll-delay={0.24 - index * 0.02}
                data-scroll-speed={4}
                variants={itemStaggerVariants}
              >
                {char}
              </motion.h1>
            );
          })}
        </div>
      </SubTitle>
      <Container ref={scrollingRef}>
        <Photos
          img={img1}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="Denim"
        />
        <Photos
          img={img2}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="Cool Dresses"
        />
        <Photos
          img={img3}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="Jackets"
        />
        <Photos
          img={img4}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img5}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img6}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img7}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img8}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img9}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img10}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img11}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img12}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img13}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
        <Photos
          img={img14}
          subscribeShowUpNotify={subscribeShowUpNotify}
          description={
            'はまっすぎわたしはゆうべにいいたてたくさんのケースの子人へむし第一外国曲のかっこにおろしているだます。寄りはさっき熟しんでやった。ゴーシュは万弾き出しおっかさんのようが云いていまし。晩は萱心臓とここを落ちついていた。野ねずみはセロがこうにするてこどもに床下のようをあるきて扉に鳴ってどんなに晩をもって行きう。'
          }
          name="T-shirts"
        />
      </Container>

      <Description
        data-scroll
        data-scroll-speed={-0.3}
        data-scroll-direction={'horizontal'}
      >
        {
          '黒いきょろきょろですとくたびれと来てみみずくからきいようた戸がやり直してそしてもう扉が時云いたいう。どんどんかと月もてすっかりなおしだでてないのをはいまは赤ん坊の下たらた。甘藍は私に一生けん命たおかげのまま何へ飛びつきましようによ糸扉を雲がぶっつけておまえか見んをほてらてはじめたん。'
        }
      </Description>
    </Section>
  );
};

export {Home};
