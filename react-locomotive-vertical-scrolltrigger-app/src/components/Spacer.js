import styled from '@emotion/styled';

const StyledSpacer = styled.hr`
  border: none;
  width: 100%;
  height: 3vh;
`;

const Spacer = ({height = '3vh'}) => {
  return <StyledSpacer style={{height: height}} />;
};

export {Spacer};
