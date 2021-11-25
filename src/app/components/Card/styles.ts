import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.colors.card.background};
  border-radius: 8px;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  margin: 16px 0 16px 0;

  h2 {
    padding: 32px 32px 16px 32px;
    size: 24px;
  }

  & > div {
    padding: 16px 32px 16px 32px;
    margin: 0 0 16px 0;
  }
`;
