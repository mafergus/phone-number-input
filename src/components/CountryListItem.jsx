import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlagIcon from './FlagIcon';
import { MISSING_FLAGS } from './constants';

export default class CountryListItem extends Component {

  static propTypes = {
    callingCodeDivider: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
    country: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    index: PropTypes.number.isRequired,
    isHovered: PropTypes.bool,
    isSelected: PropTypes.bool,
  };

  static defaultProps = {
    onClick: null,
    isHovered: false,
    isSelected: false,
  };
  
  constructor() {
    super();

    this.state = {
      hoverIndex: NaN,
    };
  }

  getBgColor = () => {
    const { isHovered, isSelected } = this.props;
    const tabbed = false;
    if (tabbed) {
      return '#EBEBEB'
    } else if (isSelected && isHovered) {
      return '#BBDEF8'
    } else if (isSelected) {
      return '#E3F2FD'
    } else if (isHovered) {
      return '#EBEBEB'
    }
  }

  render() {
    const { searchTerm, lastPreferred } = this.state;
    const { callingCodeDivider, country, index, onClick } = this.props;
    const { name, alpha2, countryCallingCodes } = country;

    return <li
      id={alpha2}
      tabIndex={0}
      onMouseEnter={() => this.setState({ hoverIndex: index })}
      onMouseLeave={() => this.setState({ hoverIndex: NaN })}
      key={`${alpha2}-${index}`}
      style={{ padding: 15, cursor: 'pointer',
        borderBottom: lastPreferred && lastPreferred.alpha2 === alpha2 && searchTerm === '' ? '1px solid #c1c1c1' : '',
        transition: this.bgColorTransitionStyle,
        backgroundColor: this.getBgColor() }}
      onClick={() => onClick(country, false, false, true)}>
      <h6 style={{margin: 0, display: "flex", alignItems: "center"}}>
        <FlagIcon style={{ marginRight: 10 }} code={MISSING_FLAGS[alpha2] ? MISSING_FLAGS[alpha2] : alpha2} size={30} />
        {name}&nbsp;
        {countryCallingCodes.map((code, index) => {
          return (
            <small className='text-muted' key={code}>
              {code}
              {index !== countryCallingCodes.length - 1 && <span key={`${code}-divider`}>{callingCodeDivider}</span>}
            </small>
          )
        })}
      </h6>
    </li>;
  }
}