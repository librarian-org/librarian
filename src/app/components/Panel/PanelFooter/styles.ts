import styled from 'styled-components';
import {shade} from 'polished';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  color: #D1D1D1;
  background: ${props => shade(0.1, props.backgroundColor)};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
