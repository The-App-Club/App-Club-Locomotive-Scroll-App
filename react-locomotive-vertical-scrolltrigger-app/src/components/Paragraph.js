import gsap from 'gsap';
import {useEffect, useMemo, useRef} from 'react';
import styled from '@emotion/styled';

const StyledParagraph = styled.p`
  background: #292e46;
  font-weight: 200;
  color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
`;

const Paragraph = ({children, isShow}) => {
  const paragraphRef = useRef(null);

  const tl = useMemo(() => {
    return gsap.timeline();
  }, []);

  useEffect(() => {
    if (isShow) {
      tl.to(paragraphRef.current, {
        y: 40,
        opacity: 1,
      });
    } else {
      tl.to(paragraphRef.current, {
        y: 0,
        opacity: 0,
      });
    }

    return () => {
      tl.kill();
    };
  }, [isShow, tl]);

  return <StyledParagraph ref={paragraphRef}>{children}</StyledParagraph>;
};

export {Paragraph};
