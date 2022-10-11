import styled from 'styled-components';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: ${props => props.backgroundColor};
  color: #D1D1D1;
`;

