import { tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  background: ${(props) => tint(0.2, props.theme.colors.background)};
  min-height: 2rem;

  justify-content: space-between;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  height: 100hw;
`;

export const StatusItemContainer = styled.div`
  display: flex;
  padding: 6px;
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => tint(0.4, props.theme.colors.background)};
  }

  span {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
`;
