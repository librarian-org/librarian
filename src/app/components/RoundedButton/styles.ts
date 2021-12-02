import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background: #D7D7DD;
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
  width: 20px;
  height: 20px;

  &:hover {
    background: ${() => shade(0.2, '#D7D7DD')};
  }
`;
