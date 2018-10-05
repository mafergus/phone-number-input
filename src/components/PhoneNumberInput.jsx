import React from 'react';
import PropTypes from 'prop-types';
import countries from 'country-data';

import CountrySelect from './CountrySelect';

export default class PhoneNumberInput extends React.Component {
  render() {
    const { onListCountries } = this.props;

    onListCountries(countries);

    return (
      <div style={{ height: 50, width: "100%", backgroundColor: "green" }}>
        <CountrySelect />
        <input style={{ height: "100%", width: 250 }} />
      </div>
    );
  }
}