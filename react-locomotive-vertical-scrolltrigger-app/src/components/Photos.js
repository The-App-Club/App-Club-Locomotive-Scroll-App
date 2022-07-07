import {useState} from 'react';
import styled from '@emotion/styled';
import {motion} from 'framer-motion';
import {Paragraph} from './Paragraph';

const Item = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8rem 0;
  max-width: 100%;
  img {
    max-width: 100%;
    width: 100%;
    z-index: 11;
  }
`;

const Photos = ({img, name, description, subscribeShowUpNotify}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Item>
      <motion.img
        src={img}
        alt={name}
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        onViewportEnter={(e) => {
          setIsShow(true);
          console.log('[enter]', e);
        }}
        onViewportLeave={(e) => {
          setIsShow(false);
          console.log('[leave]', e);
        }}
      />
      <h2>{name}</h2>
      <Paragraph isShow={isShow}>{description}</Paragraph>
    </Item>
  );
};

export {Photos};
