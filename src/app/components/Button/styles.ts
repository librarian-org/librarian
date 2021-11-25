import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background: #D7D7DD;
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
    background: ${() => shade(0.2, '#D7D7DD')};
  }
`;
