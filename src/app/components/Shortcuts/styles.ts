import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: calc(100vh - (42px + 2rem));
  background: ${(props) => props.theme.colors.card.background};
`;

export const ShortcutsList = styled.div`
  display: table;
`;

export const ShortcutItem = styled.div`
  display: table-row;
  text-align: right;
  color: hsla(0,0%,100%,.37);
  ${props =>
    props.theme.title === 'light' &&
    css`
      color: rgba(0,0,0,.37);
  `}
  font-size: 95%;

  div {
    display: table-cell;
    padding: .4rem;
  }
`;

export const Shortc = styled.div`
  display: table-cell;
  padding: .4rem;

  span {
    display: inline-block;
    padding: 0 .35rem;
    border-radius 4px;
    font-size: 90%
    font-weight: 400;
    line-height: 1.6;
    text-align: center;
    white-space: no-wrap;
    vertical-align: baseline;
    background: hsla(0,0%, 100%, .05);
    box-shadow: inset 0 0 0 1px hsl(0deg 0% 100% / 5%);
    color: hsla(0,0%,100%,.67);
    maring: 0 .14rem;
    transition: color .15s;

    ${props =>
      props.theme.title === 'light' &&
      css`
        background: rgba(0,0,0,.05);
        color: rgba(0,0,0,.67);
        box-shadow: inset 0 0 0 1px rgb(0 0 0 / 5%);
    `}
  }
`;
