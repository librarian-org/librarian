import { tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  background: ${(props) => tint(0.2 ,props.theme.colors.background)};
  min-height: 2rem;

  justify-content: space-between;
`;

export const StatusItem = styled.div`
  display: flex;
  padding: 6px;
  align-items: center;
  height: 100hw;

  span {
    margin-left: 6px;
    display: block;
    font-size: 12px;

    svg {
      cursor: pointer;
    }
  }
`;
