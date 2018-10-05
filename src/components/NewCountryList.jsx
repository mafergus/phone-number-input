import React from 'react';
import PropTypes from 'prop-types';
import countries from 'country-data';

function CountryListItem(props) {
  const { country, onClick } = props;
  const { countryCallingCodes, name } = country;

  return (
    <div
      style={{
        height: 50,
        width: 450,
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        paddingLeft: 10
      }}
      onClick={() => onClick(country)}
    >
      <span style={{ width: 55, marginRight: 20 }}>{countryCallingCodes[0]}</span>
      <span>{name}</span>
    </div>
  );
}

export default class NewCountryList extends React.Component {

  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    open: PropTypes.bool,
  };

  static defaultProps = {
    open: true,
  };

  render() {
    const { onItemClick, open } = this.props;
    const countryData = countries.callingCountries.all.filter((country) => country.status === 'assigned');

    return (
      <div
        style={{ 
          height: 400,
          width: 450,
          overflowX: "scroll",
          backgroundColor: "yellow",
          visibility: open ? "visible" : "hidden",
          borderLeft: "1px solid red"
        }}
      >
        {countryData.map(country => {
          return <CountryListItem country={country} onClick={onItemClick} />
        })}
      </div>
    );
  }
}