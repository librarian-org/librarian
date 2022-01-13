import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-end;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 16px;

  button {
    display: flex;
    background: ${props => props.theme.colors.primary};
    align-items: center;
    justify-content: center;
    border-style: none;
    border-radius: 8px;
    width: 32px;
    height: 32px;
    margin: 1px;
    color: ${props => props.theme.colors.text};

    svg {
      color: ${props => props.theme.colors.text};
    }

    &:hover {
      background: ${props => shade(0.2, props.theme.colors.primary.light)};
    }

    &:disabled {
      background: ${props => shade(0.5, props.theme.colors.primary.dark)};
    }

    transition: background-color 0.2s;
  }

  select {
    height: 32px;
    border-radius: 8px;
    border: 2px solid ${props => props.theme.colors.input.background};
    background: ${props => props.theme.colors.input.background};
    color: ${props => props.theme.colors.input.text};
    padding: 0px 8px;
    margin: 0px 8px;
    cursor: pointer;
  }
`;
