import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.button`
  display: flex;
  background: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  border: 0;
  height: 40px;
  padding: 0 24px;
  font-weight: 500;
  transition: background-color 0.2s;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  line-height: 18px;
  color: #555;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => shade(0.2, props.theme.colors.background)};
    ${(props) => props.theme.title == 'dark' && css`
      background-color: ${(props) => shade(0.8, props.theme.colors.background)};
    `}
  }
`;
