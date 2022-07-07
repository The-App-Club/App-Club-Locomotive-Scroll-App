import {useState, useEffect} from 'react';
import {Parallax, ParallaxLayer} from '@react-spring/parallax';
import {css} from '@emotion/css';
import styled from '@emotion/styled';
import {motion} from 'framer-motion';
import {LoremIpsum} from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const StyledParagraph = styled.p`
  padding: 2rem;
  font-size: 3rem;
  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StyledImage = styled.img`
  height: 60%;
  display: block;
`;

const sentenceList = [...Array(14)].map((n, index) => {
  return lorem.generateSentences(3);
});

const Home = () => {
  const [paragraph, setParagraph] = useState(lorem.generateSentences(5));
  const [inView, setInView] = useState(new Date());
  const [layerNumber, setLayerNumber] = useState(0);

  useEffect(() => {
    setParagraph(sentenceList[layerNumber]);
  }, [inView]);

  return (
    <Parallax
      pages={16}
      className={css`
        width: 100%;
      `}
    >
      <ParallaxLayer
        offset={0}
        speed={0.5}
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 2;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border: 3px solid;
            background: lightgray;
            font-size: 5rem;
            @media screen and (max-width: 768px) {
              font-size: 2rem;
            }
          `}
        >
          Scroll Down
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{start: 0, end: 14}}
        className={css`
          z-index: -1;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            border: 3px solid;
            height: 100%;
            width: 50%;
            background: lightsalmon;
            @media screen and (max-width: 768px) {
              height: 50%;
              width: 100%;
            }
          `}
        >
          <StyledParagraph>{paragraph}</StyledParagraph>
        </div>
      </ParallaxLayer>

      {[...Array(14)].map((n, index) => {
        return (
          <ParallaxLayer
            key={index}
            offset={index + 1}
            speed={0.5}
            className={css`
              display: flex;
              justify-content: flex-end;
              align-items: center;
              height: 100%;
              width: 50%;
              @media screen and (max-width: 768px) {
                height: 50%;
                width: 100%;
              }
            `}
          >
            <motion.div
              className={css`
                display: flex;
                justify-content: center;
                align-items: center;
                border: 3px solid;
                height: 100%;
                width: 50%;
                @media screen and (max-width: 768px) {
                  height: 50%;
                  width: 100%;
                }
              `}
              initial={{filter: 'grayscale(100%)'}}
              whileInView={(e) => {
                return {filter: 'grayscale(0%)'};
              }}
              transition={{duration: 0.7}}
              onViewportEnter={(e) => {
                setInView(new Date());
                setLayerNumber(index);
                console.log('[enter]');
              }}
              onViewportLeave={(e) => {
                console.log('[leave]');
              }}
            >
              <StyledImage src={`/assets/image/${index + 1}.webp`} alt="" />
            </motion.div>
          </ParallaxLayer>
        );
      })}
      <ParallaxLayer
        offset={15}
        speed={0.5}
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            border: 3px solid;
            width: 100%;
            height: 100%;
            font-size: 5rem;
            @media screen and (max-width: 768px) {
              font-size: 2rem;
            }
          `}
        >
          Scroll Up
        </div>
      </ParallaxLayer>
    </Parallax>
  );
};

export {Home};
