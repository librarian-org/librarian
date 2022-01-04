import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.text};
  border-radius: 100%;
  border: 0;
  font-weight: 500;
  transition: background-color 0.2s;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  line-height: 18px;
  color: #555;
  font-weight: bold;
  width: 25px;
  height: 25px;
  padding-top: 3px;

  &:hover {
    background: ${() => shade(0.2, '#D7D7DD')};
  }
`;
