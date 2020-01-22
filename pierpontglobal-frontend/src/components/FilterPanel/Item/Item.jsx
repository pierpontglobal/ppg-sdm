import React from 'react';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import ArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import Container from '../../styles/Container/Container';
import styled from 'styled-components';

const ArrowWrapper = styled.div`
  padding: 8px;
  cursor: pointer;
  transition: all 0.15s;
  transform: ${ props => props.toggle ? 'rotate(180deg)' : 'rotate(0deg)'};
  & > svg {
    font-size: 1.5rem;
  }
`;

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(
      prev => ({ toggle: !prev.toggle }),
    );
  }

  render() {
    const { name, children } = this.props;
    const { toggle } = this.state;
    const arrow = <ArrowWrapper toggle={toggle} style={{ color: 'rgb(58, 62, 67)' }}><ArrowIcon /></ArrowWrapper>;

    return (
      <Container
        className="d-flex flex-column border-bottom"
        minHeight="54px"
      >
        <div
          className="d-flex mb-0 p-3 justify-content-between"
          onClick={this.onClick}
        >
          <div
            className="mb-0"
            style={{
              display: 'flex',
              fontSize: '16px',
              alignContent: 'center',
              alignItems: 'center',
              fontWeight: '400',
            }}
          >
            <span>{name}</span>
          </div>
          {arrow}
        </div>
        <Collapse isOpen={toggle}>
          {children}
        </Collapse>
      </Container>
    );
  }
}

Item.propTypes = {
  name: PropTypes.any,
  children: PropTypes.any,
};

Item.defaultProps = {
  name: {},
  children: {},
};
