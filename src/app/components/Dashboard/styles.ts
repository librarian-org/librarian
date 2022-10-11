import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 24px;
`;

export const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    margin: 16px;
  }
`;
