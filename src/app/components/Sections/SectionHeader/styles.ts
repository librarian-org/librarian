import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 16px;
  box-shadow: inset 0 -1px hsl(0deg 0% 100% / 10%);

  a {
    cursor: pointer;
    padding: 8px;
    min-width: 120px;
    text-align: center;
    font-weight: 600;
    color: ${props => shade(0.2, props.theme.colors.text)};
    transition: color, box-shadow .2s ease-in-out;

    &:hover {
      color: ${props => props.theme.colors.text};
      box-shadow: inset 0 -2px ${props => props.theme.colors.text};
    }
  }

  .active {
      color: ${props => props.theme.colors.primary.dark};
      box-shadow: inset 0 -2px ${props => props.theme.colors.primary.dark};
      transition: none;

      &:hover {
        color: ${props => props.theme.colors.primary.dark};
        box-shadow: inset 0 -2px ${props => props.theme.colors.primary.dark};
        transition: none;
      }
    }
`;
