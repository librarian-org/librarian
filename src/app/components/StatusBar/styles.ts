import { tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  background: ${(props) => tint(0.2, props.theme.colors.background)};
  min-height: 2rem;

  justify-content: space-between;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  height: 100hw;
`;

export const StatusItemContainer = styled.div`
  display: flex;
  padding: 6px;
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => tint(0.4, props.theme.colors.background)};
  }

  span {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
`;

export const Counter = styled.small`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 8px;
  font-weight: bold;

  position: relative;

  background-color: ${(props) => props.theme.colors.error};

  border-radius: 50%;

  height: 12px;
  width: 12px;
  left: -6px;
  top: -6px;
`;
