import styled from 'styled-components';

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
  margin-right: 5px;;
`;

export const Subpanel = styled.div`
border-bottom: 1px ${(props) => props.theme.colors.primary.dark} solid;
`;
