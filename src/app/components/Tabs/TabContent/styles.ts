import styled, { css } from 'styled-components';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  background: ${(props) =>  props.theme.colors.card.background};
  color: ${(props) =>  props.theme.colors.text};
  padding: 16px;
  margin-top: -2px !important;
  height: calc(100vh - (40px + 2rem));

  ${props =>
    props.isActive &&
    css`
      background: ${(props) =>  props.theme.colors.tab.active};
    `}
`;
