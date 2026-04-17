import styled from 'styled-components';
// import { colors } from '../../styles/colors';

export const Svg = styled.svg`
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  vertical-align: middle;
  fill: ${(props) => props?.fill && props?.fill};
  shape-rendering: inherit;
  ${(props) => props.style};
`;
