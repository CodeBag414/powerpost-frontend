import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import { noop } from 'lodash';

const Wrapper = styled.div`
  background: white;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 4px;
  z-index: 10;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  /*-webkit-filter: drop-shadow(0 1px 2px rgba(60, 92, 129, 0.42));
  filter        : drop-shadow(0 1px 2px rgba(60, 92, 129, 0.42));
  -ms-filter    : "progid:DXImageTransform.Microsoft.Dropshadow(OffX=0, OffY=1, Color='#383C5C81')";*/

  &:after {
    content: '';
    display: ${({ hasArrow }) => hasArrow ? 'block' : 'none'};
    position: absolute;
    left: ${({ arrowLeft }) => arrowLeft ? `${arrowLeft}px` : 'initial'};
    right: ${({ arrowRight }) => arrowRight ? `${arrowRight}px` : 'initial'};
    top: ${({ top }) => top}px;
    width: 14px;
    height: 14px;
    background: #f4f6f7;
    border-top: 1px solid ${({ borderColor }) => borderColor};
    border-left: 1px solid ${({ borderColor }) => borderColor};
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
    transform: rotate(45deg);
  }
`;

class Popup extends Component {
  static propTypes = {
    left: PropTypes.number,
    top: PropTypes.number,
    hasArrow: PropTypes.bool,
    arrowLeft: PropTypes.number,
    arrowRight: PropTypes.number,
    borderColor: PropTypes.string,
    children: PropTypes.node,
    onOutsideClick: PropTypes.func,
  }

  static defaultProps = {
    left: 0,
    top: -20,
    hasArrow: false,
    borderColor: 'black',
    onOutsideClick: noop,
  }

  handleClickOutside = (e) => {
    this.props.onOutsideClick(e);
  }

  render() {
    const { left, top, arrowLeft, arrowRight, borderColor, hasArrow } = this.props;

    return (
      <Wrapper left={left} top={top} arrowLeft={arrowLeft} arrowRight={arrowRight} borderColor={borderColor} hasArrow={hasArrow}>
        {this.props.children}
      </Wrapper>
    );
  }
}

export default enhanceWithClickOutside(Popup);
