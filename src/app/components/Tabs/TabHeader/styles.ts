import styled, { css } from 'styled-components';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.li<ContainerProps>`
  display: flex;
  background: ${(props) =>  props.theme.colors.tab.background};
  color: ${(props) =>  props.theme.colors.text};
  cursor: pointer;
  min-width: 100px;
  height: 32px;
  line-height: 34px;
  font-size: 12px;
  /* font-weight: 600; */
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin-right: 5px;

  justify-content: center;

  > span {
    text-overflow: clip;
    overflow: hidden;
    white-space: nowrap;
  }

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: .5rem;
    padding-right: .4rem;
  }

  div:last-child {
    display: flex;
    right: 0;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    height: 100%;
    min-width: 28px;

    span {
      min-width: 24px;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      visibility: hidden;
    }
  }

  &:hover {
    div:last-child {
      svg {
        visibility: visible;
      }
    }
  }

  ${props =>
    props.isActive &&
    css`
      background: ${(props) =>  props.theme.colors.tab.active};

      div:last-child {
        svg {
          visibility: visible;
        }
      }
  `}
`;
