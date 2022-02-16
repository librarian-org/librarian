import { tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 6px;
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => tint(0.4 ,props.theme.colors.background)};
  }
`;
