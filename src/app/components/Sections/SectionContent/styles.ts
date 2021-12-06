import styled, { css } from 'styled-components';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.section<ContainerProps>`
  display: none;
  padding: 0 24px 0 24px;
  flex-direction: column;

  /* align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; */

  min-height: 150px;

  ${props =>
    props.isActive &&
    css`
      display: flex;
    `}
`;
