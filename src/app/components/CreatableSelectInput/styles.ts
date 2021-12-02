
import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';
interface IInputLabel {
  isFilled: boolean;
}
export const Container = styled.div`
  position: relative;
`;
export const Error = styled(Tooltip)`
  position: absolute;
  height: 20px;
  margin-top: -58px;
  right: 56px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
export const InputLabel = styled.label<IInputLabel>`
  position: absolute;
  margin-top: -12px;
  margin-left: 10px;
  border-radius: 4px 4px 0 0;
  padding: 0 8px;
  border: 2px solid ${(props) => props.theme.colors.input.background};
  background: ${(props) => props.theme.colors.input.background};
  z-index: 1;
  ${(props) => props.isFilled
    && css`
      color: ${props.theme.colors.primary.dark}
  `}
`;
