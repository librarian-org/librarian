import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

export const Header = styled.div`
  padding: 24px;
  display: 'flex';
  flex-direction: 'row';
  justify-content: 'space-between';
`;

export const Row = styled.div`
  padding: 24px 0 24px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  /* width: 100%; */
`;
