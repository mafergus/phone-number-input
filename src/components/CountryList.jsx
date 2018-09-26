import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountryListItem from "./CountryListItem";

const NO_RESULTS_MESSAGE = 'No results available';
const PAGINATE_TEXT = 'Display additional results...';

export default class CountryList extends Component {

  static propTypes = {
    callingCodeDivider: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    handleMultiSelect: PropTypes.func.isRequired,
    filteredCountries: PropTypes.array.isRequired,
    multiSelect: PropTypes.object,
    onSelectCountry: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    paginate: PropTypes.number.isRequired,
    paginateCount: PropTypes.number.isRequired,
    maxHeight: PropTypes.number,
    setCountryDropDown: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    callingCodeDivider: <span style={{marginLeft: 4, marginRight: 4}}>/</span>,
    maxHeight: 300,
    style: {},
  };

  constructor() {
    super();
    this.state = {
      open: false,
      selectedCountry: {},
      intlPhoneNumber: '',
      phoneNumber: '',
      searchTerm: '',
      valid: false,
      filteredCountries: [],
      preferredCountries: [],
      paginateCount: 1,
      multiSelectOpen: false,
      multiSelectItem: {},
      lastPreferred: '',
      tabbedIndex: -1,
    };
  }

  renderPagination(index, paginateCount) {
    return <div
      className='dropdown-item'
      aria-hidden
      style={{padding: 15, cursor: 'pointer', transition: this.bgColorTransitionStyle}}
      key={`addit-results-${index}`}
      onClick={() => this.setState({ paginateCount: paginateCount + 1 })}>
      {PAGINATE_TEXT}
    </div>;
  }

  renderNoResults() {
    return <div 
      style={{
        padding: 15,
        cursor: 'pointer', 
        transition: this.bgColorTransitionStyle
      }}
      className='dropdown-item'
    >
      {NO_RESULTS_MESSAGE}
    </div>;
  }

  render() {
    const { 
      paginateCount,
      multiSelectOpen,
      multiSelectItem,
      selectedCountry 
    } = this.state;

    const { callingCodeDivider, 
      onSelectCountry, 
      open,
      filteredCountries,
      paginate,
      maxHeight,
      handleMultiSelect,
      setCountryDropDown,
      style 
    } = this.props;

    return <ul
      aria-hidden
      tabIndex={-1}
      ref={dropdown => setCountryDropDown(dropdown)}
      className='dropdown-menu country-dropdown'
      style={{ ...style, display: 'block', backgroundColor: "white", zIndex: 101, overflowX: 'scroll', marginTop: 0,
        borderTopLeftRadius: 0, borderTopRightRadius: 0, maxHeight: open ? maxHeight : 0, boxShadow: open ? this.boxShadowStyle : null, borderWidth: open ? 1 : 0, padding: open ? '10px 0 10px 0' : 0, transition: 'all 0.2s ease', width: '100%', borderTop: 'none' }}>
      {filteredCountries && filteredCountries.length > 0 && filteredCountries.map((country, index) => {
        const paginateTo = paginate && parseInt(paginate, 10) * paginateCount;
        if (index <= paginateTo) {
          return <CountryListItem
            key={country.alpha2}
            callingCodeDivider={callingCodeDivider}
            country={country}
            selected={country.alpha2 === selectedCountry.alpha2}
            index={index}
            onClick={onSelectCountry}
          />;
        }
        if (index - 1 === paginateTo) {
          return this.renderPagination(index, paginateCount);
        }
        return null;
      })}
      {filteredCountries && filteredCountries.length === 0 && this.renderNoResults()}
      <div
        ref={select => handleMultiSelect(select) }
        aria-hidden={!multiSelectOpen}
        className={`text-center calling-code-multi-select${multiSelectOpen ? ' open' : ''}`}
        style={{opacity: multiSelectOpen ? 1 : 0, zIndex: multiSelectOpen ? 'auto' : -1, transition: 'all 0.2s ease', backgroundColor: 'white', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}}>
        <button
          type='button'
          aria-hidden={!multiSelectOpen}
          aria-label='close'
          onClick={() => this.cancelMultiSelect()}
          style={{position: 'absolute', left: 10, bottom: 10}}
          className='btn btn-outline btn-outline-danger multi-select-back-btn'>
          Close
        </button>
        {Object.keys(multiSelectItem).length > 0 && multiSelectItem.countryCallingCodes.map((item) => {
          return (
            <button
              key={item}
              type='button'
              onClick={() => onSelectCountry(multiSelectItem, false, item, true)}
              style={{position: 'relative', top: '50%', transform: 'perspective(1px) translateY(-50%)', marginLeft: 8, verticalAlign: 'middle'}}
              className='btn btn-secondary'>
              {item}
            </button>
          )
        })}
      </div>
    </ul>;
  }
}