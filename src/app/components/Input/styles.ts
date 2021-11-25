import { shade } from 'polished';
import styled, { css } from 'styled-components';

// import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored?: boolean;
  isDisabled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.input.background};
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px 0 16px;

  border: 2px solid ${props => props.theme.colors.input.background};
  color: ${props => props.theme.colors.input.text};

  transition: none;

  & + div {
    margin-top: 20px;
  }

  &:hover {
    border: 2px solid ${props => props.theme.colors.primary.dark};
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${props.theme.colors.primary.dark};
      border-color: ${props.theme.colors.primary.dark};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${props.theme.colors.primary.dark};
    `}

  ${props =>
    props.isDisabled &&
    css`
      color: ${shade(0.6, props.theme.colors.primary.dark)};
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    padding: 16px 0 16px 0;
    color: ${props => props.theme.colors.input.text};

    ${props =>
      props.isDisabled &&
      css`
        color: ${shade(0.6, props.theme.colors.input.text)};
      `}

    &::placeholder {
      color: ${props => props.theme.colors.input.placeholder};
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    border: 1px solid ${props => props.theme.colors.input.background};
    -webkit-text-fill-color: ${props => props.theme.colors.input.text};
    -webkit-box-shadow: 0 0 0 1000px
      ${props => props.theme.colors.input.background} inset;
    transition: background-color 5000s ease-in-out 0s;
    font: 300 16px 'Nunito', sans-serif;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  svg {
    margin-right: 16px;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  margin-top: -55px;
  margin-left: -10px;
  border-radius: 8px 8px 0 0;
  padding: 0 8px;
  border: 2px solid ${props => props.theme.colors.input.background};
  background: ${props => props.theme.colors.input.background};
`;

// export const Error = styled(Tooltip)`
//   height: 20px;
//   margin-left: 16px;

//   svg {
//     margin: 0;
//   }

//   span {
//     background: #c53030;
//     color: #fff;

//     &::before {
//       border-color: #c53030 transparent;
//     }
//   }
// `;
