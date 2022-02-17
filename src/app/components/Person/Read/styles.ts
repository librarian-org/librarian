import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
`;

export const LeftSidebar = styled.div`
  width: 25%;
  float: left;
  position: relative;
  min-height: 1px;
  box-sizing: border-box;
  padding: 5px;
  margin-left: 5px;
`;

export const Center = styled.div`
  width: calc(50% - 10px);
  float: left;
  position: relative;
  min-height: 1px;
  box-sizing: border-box;
  padding: 5px;
`;

export const RigthSidebar = styled.div`
  width: 25%;
  float: left;
  position: relative;
  min-height: 1px;
  box-sizing: border-box;
  padding: 5px;
  margin-right: 5px; ;
`;

interface SubpanelProps {
  isLate?: boolean;
}

export const Subpanel = styled.div<SubpanelProps>`
  border-bottom: 1px ${(props) => props.theme.colors.primary.dark} solid;
  padding-top: 16px;

  ${(props) =>
    props.isLate &&
    css`
      color: ${(props) => props.theme.colors.error};
    `}
`;

export const List = styled.ul`
  list-style: none;
`;

export const SubpanelColumn = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  label {
    font-weight: 600;
    display: block;
    font-size: 14px;
  }
`;

export const SubpanelRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 16px;
`;
