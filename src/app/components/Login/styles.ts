import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
`;

export const Center = styled.div``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 290px;

  > img {
    margin: 0 auto;
  }

  > div {
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 290px;
    }
  }
`;
