import React from 'react';
import PropTypes from 'prop-types';
import countries from 'country-data';

import FlagIcon from 'components/FlagIcon';
import USFlag from 'assets/flags/US.svg';
import NewCountryList from 'components/NewCountryList';

export default class CountrySelect extends React.Component {
  
  state = {
    selectedCountry: null,
    showList: true,
  };

  onCountrySelected = country => {
    this.setState({ selectedCountry: country });
  }

  render() {
    const { selectedCountry, showList } = this.state;
    const countryData = countries.callingCountries.all.filter((country) => country.status === 'assigned');

    return (
      <div
        style={{ height: 50, width: 50, backgroundColor: "blue", display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={() => this.setState({ showList: !showList })}
      >
        <p style={{ height: 50, width: 50 }}>{selectedCountry && selectedCountry.countryCallingCodes[0]}</p>
        <NewCountryList
          open={showList}
          onItemClick={this.onCountrySelected}
        />
      </div>
    );
  }
}