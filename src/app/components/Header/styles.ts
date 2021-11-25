import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 56px;
  background: ${(props) => props.theme.colors.header.background};
  align-items: center;
  padding: 16px;
`;
