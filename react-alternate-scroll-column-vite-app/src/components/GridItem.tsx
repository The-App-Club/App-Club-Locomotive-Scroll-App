import React from 'react';
import {css} from '@emotion/css';

const GridItem = ({url, description}) => {
  return (
    <div
      className={css`
        img {
          width: 100%;
          object-fit: cover;
          aspect-ratio: 1;
        }
        p {
          font-size: 1rem;
        }
        margin-bottom: 2rem;
      `}
    >
      <img className="grid-item-media" src={url} />
      <p>{description}</p>
    </div>
  );
};

export {GridItem};
