import { shade, tint } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

export const Header = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  position: relative;
  padding: 0 24px;
  display: flex;
  justify-content: end;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;

  justify-content: space-between;
  align-items: center;

  padding: 12px;
  margin-bottom: 4px;
  width: 100%;

  background-color: ${(props) => tint(0.2, props.theme.colors.background)};
  &:hover {
    background-color: ${(props) => tint(0.25, props.theme.colors.background)};
    ${(props) =>
      props.theme.title == 'light' &&
      css`
        background-color: ${(props) =>
          shade(0.05, props.theme.colors.background)};
      `}
  }

  svg {
    cursor: pointer;
    &:hover {
      color: ${(props) => tint(0.2, props.theme.colors.secondary.dark)};
    }
  }

  span {
    width: 40%;
  }
`;

export const Row = styled.div`
  padding: 24px 0 24px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  width: 100%;

  label {
    white-space: nowrap;
    cursor: pointer;
  }

  input[type='date'] {
    width: 130px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-grow: 1;

  align-items: center;

  > svg {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary.dark};

    &:hover {
      ${(props) => props.theme.colors.primary.light};
    }
  }

  > div {
    width: 95%;
  }
`;
