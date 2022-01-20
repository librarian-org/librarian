import { shade, tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

  font-size: 14px;
  line-height: 16px;
  font-family: 'Nunito', sans-serif;
  color: ${props => props.theme.colors.text};

  table {
    width: 100%;
    border-spacing: 0;

    th,
    td {
      padding: 16px;

      svg {
        color: ${props => props.theme.colors.primary.dark};
        &:hover {
          color: ${props => tint(0.4, props.theme.colors.primary.dark)}
        }
      }
    }

    th {
      font-weight: 600;
      text-align: left;
    }

    tbody > tr:hover {
      background: ${props =>
        props.theme.title === 'light'
          ? shade(0.1, props.theme.colors.card.background)
          : tint(0.1, props.theme.colors.card.background)};
      cursor: pointer;
    }
  }
`;
