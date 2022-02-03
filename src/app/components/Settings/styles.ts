import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
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

  input {
    width:200px;
  }
`;

export const ButtonContainer = styled.div`
  padding: 24px;
  display: flex;
  justify-content: end;
`;
