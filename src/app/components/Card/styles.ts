import { tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.colors.card.background};
  border-radius: 8px;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  margin: 16px 0 16px 0;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 32px 16px 32px;
  h2 {
    size: 24px;
  }

  svg {
    color: ${(props) => props.theme.colors.primary.dark};
    cursor: pointer;
    &:hover {
      color: ${(props) => tint(0.4, props.theme.colors.primary.dark)};
    }
  }
`;

export const CardContent = styled.div`
  padding: 16px 32px 16px 32px;
  margin: 0 0 16px 0;
`;
