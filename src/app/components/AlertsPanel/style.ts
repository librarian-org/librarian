import { tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  bottom: 2.1rem;
  right: 4px;

  padding: 4px;
  background: ${(props) => tint(0.2, props.theme.colors.background)};

  width: 450px;
  max-height: 450px;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const AlertList = styled.ul`
  list-style: none;

  max-height: 442px;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: ${(props) => tint(0.2, props.theme.colors.card.background)} ${(props) => tint(0.2, props.theme.colors.card.background)};

  &::-webkit-scrollbar {
    width: 12px;
    margin: 4px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.card.background};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => tint(0.2, props.theme.colors.background)};
    border-radius: 8px;
    border: 3px solid ${(props) => props.theme.colors.card.background};
  }
`;

export const AlertItem = styled.li`
  display: flex;

  div {
    display: flex;
    border-radius: 8px;
    flex-grow: 1;
    padding: 8px;
    margin-bottom: 4px;
    background: ${(props) => tint(0.2, props.theme.colors.card.background)};
    font-size: 12px;
    margin-right: 4px;
    justify-content: space-between;

    span {
      display: flex;

      svg {
        cursor: pointer;

        &:hover {
          color: ${(props) => props.theme.colors.primary.dark};
        }
      }
    }
  }
`;

export const Clear = styled.button`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  font-size: 10px;
  color: ${(props) => props.theme.colors.text};
  padding: 1px;
  border-radius: 6px;
  margin-left: 4px;

  &:hover {
    /* color: ${(props) => props.theme.colors.primary.dark}; */
    background-color: ${(props) => tint(0.4, props.theme.colors.background)};
  }
`;

export const AlertsActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px;
`;
