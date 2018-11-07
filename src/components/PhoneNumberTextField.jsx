// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import countries from 'country-data';
// import { PhoneNumberUtil } from 'google-libphonenumber';
// import escapeStringRegexp from 'escape-string-regexp';
// import uuid from 'uuid';
// import TextField from '@material-ui/core/TextField';
// import CountryList from './CountryList';
// import FlagIcon from './FlagIcon';
// import { MISSING_FLAGS } from './constants';
// import { text } from 'util/colors';

// export default class PhoneNumberTextField extends Component {

//   static propTypes = {
//     error: PropTypes.bool,
//     errorText: PropTypes.string,
//     removeToken: PropTypes.oneOfType([
//       PropTypes.element,
//       PropTypes.string
//     ]),
//     preferredCountries: PropTypes.arrayOf(PropTypes.string),
//     defaultValue: PropTypes.oneOfType([
//       PropTypes.number,
//       PropTypes.string
//     ]),
//     paginate: PropTypes.number,
//     placeholder: PropTypes.string,
//     onChange: PropTypes.func,
//     minLengthMessage: PropTypes.string,
//     maxLengthMessage: PropTypes.string,
//     callingCodeMessage: PropTypes.string,
//     catchAllMessage: PropTypes.string,
//     inputClassName: PropTypes.string,
//     style: PropTypes.class,
//     validMessage: PropTypes.string
//   };

//   static defaultProps = {
//     error: false,
//     errorText: "",
//     removeToken: <span>&times;</span>,
//     paginate: 50,
//     placeholder: 'Search for a calling code by country name',
//     minLengthMessage: 'Too short to be a valid phone number',
//     maxLengthMessage: 'Too long to be a valid phone number',
//     callingCodeMessage: 'Please select a valid country code',
//     catchAllMessage: 'Not a valid phone number',
//     style: {},
//     validMessage: 'This phone number is valid',
//   };

//   constructor () {
//     super();
//     this.phoneUtil = PhoneNumberUtil.getInstance();
//     this.countries = countries.callingCountries.all.filter((country) => country.status === 'assigned');
//     const US = this.countries.filter(country => country.alpha2 === "US")[0];
//     this.mouseDownOnMenu = false;
//     this._pageClick = this.pageClick.bind(this);
//     this.boxShadowStyle = '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.4)';
//     this.bgColorTransitionStyle = 'background-color .25s, color .25s';
//     this.state = {
//       open: false,
//       selectedCountry: US,
//       phoneNumber: '',
//       searchTerm: '',
//       valid: false,
//       filteredCountries: [],
//       preferredCountries: [],
//       paginateCount: 1,
//       multiSelectOpen: false,
//       multiSelectItem: {},
//       lastPreferred: '',
//       tabbedIndex: -1,
//     };
//   }

//   getPreferredCountries = () => {
//     const { preferredCountries } = this.props;
//     if (preferredCountries && preferredCountries.length) {
//       const _preferredCountries = preferredCountries.map((country) => country.toUpperCase());
//       const preferred = this.countries.filter((country) => _preferredCountries.indexOf(country.alpha2) !== -1).reverse();
//       const regular = this.countries.filter((country) => _preferredCountries.indexOf(country.alpha2) === -1);
//       const orderedCountries = preferred.concat(regular);
//       this.setState({ preferredCountries: orderedCountries, lastPreferred: preferred[preferred.length - 1] });

//       return orderedCountries;
//     }
//   }

//   mapErrorMessage = message => {
//     const { minLengthMessage, maxLengthMessage, callingCodeMessage, catchAllMessage } = this.props;
//     if (message === 'The string supplied did not seem to be a phone number' || message === 'The string supplied is too short to be a phone number' || message === 'Phone number too short after IDD') {
//       return minLengthMessage;
//     } else if (message === 'The string supplied is too long to be a phone number') {
//       return maxLengthMessage;
//     } else if (message === 'Invalid country calling code') {
//       return callingCodeMessage;
//     } else {
//       return catchAllMessage;
//     }
//   }

//   formatValidation = (valid, internalMessage, friendlyMessage, parsed) => {
//     return {
//       valid,
//       internalMessage,
//       friendlyMessage,
//       parsed,
//     };
//   }

//   validateNumber = (alpha2, phoneNumber) => {
//     if (alpha2) {
//       const _alpha2 = alpha2 === 'unknown' ? '' : alpha2;
//       try {
//         this.phoneUtil.parse(phoneNumber, _alpha2);
//       } catch (e) {
//         const { message } = e;
//         return this.formatValidation(false, message, this.mapErrorMessage(message), null);
//       }
//       const { validMessage } = this.props;
//       const parsed = this.phoneUtil.parse(phoneNumber, _alpha2);
//       const valid = this.phoneUtil.isPossibleNumber(parsed);

//       return this.formatValidation(valid, '', valid ? validMessage : this.mapErrorMessage(), parsed);
//     } else {
//       const { callingCodeMessage } = this.props;

//       return this.formatValidation(false, '', callingCodeMessage, null, null);
//     }
//   }

//   validatePhoneNumber = phoneNumber => {
//     /*
//     Phone number validation using google-libphonenumber
//     */
//     let valid = false;
//     try {
//       const phoneUtil = PhoneNumberUtil.getInstance();
//       valid =  phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber));
//     } catch(e) {
//       valid = false;
//     }

//     return valid;
//   }

//   setDropDown = dropdown => { this.countryDropdown = dropdown };

//   onKeyDown = e => {
//     const { tabbedIndex, paginateCount, open, filteredCountries } = this.state;
//     if (open) {
//       const dropdownItemHeight = parseInt(window.getComputedStyle(this.countryDropdown.children[0]).getPropertyValue('height'), 10);
//       const dropdownHeight = parseInt(window.getComputedStyle(this.countryDropdown).getPropertyValue('height'), 10);
//       const halfwayPoint = (dropdownHeight / dropdownItemHeight) / 2;
//       const { paginate } = this.props;
//       const key = e.key;
//       if (key === 'Escape') {
//         this.setState({ open: false, tabbedIndex: -1 });
//       } else if (key === 'ArrowDown' || (key === 'Tab' && !e.shiftKey)) {
//         e.preventDefault();
//         const newIndex = tabbedIndex === filteredCountries.length ? filteredCountries.length : tabbedIndex + 1;
//         this.setState({ tabbedIndex: newIndex }, () => {
//           this.countryDropdown.scrollTop = (dropdownItemHeight * (newIndex - halfwayPoint));

//           if (paginate && paginateCount && ((paginate * paginateCount) === (newIndex - 2))) {
//             this.setState({ paginateCount: paginateCount + 1 });
//           }
//         })
//       } else if (key === 'ArrowUp' || (key === 'Tab' && e.shiftKey)) {
//         e.preventDefault();
//         const newIndex = tabbedIndex === 0 ? 0 : tabbedIndex - 1;
//         this.setState({ tabbedIndex: newIndex }, () => {
//           this.countryDropdown.scrollTop = (dropdownItemHeight * (newIndex - halfwayPoint));
//         })
//       } else if (key === 'Enter' || e.keyCode === 32 || e.which === 32) {
//         if (tabbedIndex) {
//           const { filteredCountries } = this.state;
//           this.selectCountry(filteredCountries[tabbedIndex - 1], false, false, true);
//         }
//       }
//     }
//   }

//   lookupCountry = callingCode => {
//     return callingCode.toString().trim() === '1' ? countries.countries.US : countries.lookup.countries({ countryCallingCodes: `+${callingCode}` }).filter((country) => country.status === 'assigned')[0];
//   }

//   testNumber = number => {
//     return new RegExp(/^[0-9]+$/).test(number);
//   }

//   unformatNumber = number => {
//     const _number = !isNaN(number) ? number.toString() : number;
//     return _number ? _number.replace(/[^0-9]/g, '') : number;
//   }

//   getNationalNumber = (alpha2, number) => {
//     return number && alpha2 && alpha2.length ? number.substr(alpha2.length + 1) : '';
//   }

//   onChangeText = value => {
//     const { onChange } = this.props;
//     const { selectedCountry } = this.state;

//     this.setState({ phoneNumber: value });
//     onChange(selectedCountry.countryCallingCodes[0], value);
//   }

//   cancelMultiSelect = () => {
//     this.setState({ 
//       multiSelectOpen: false,
//       multiSelectItem: {} 
//     }, 
//     () => this.multiSelect.style.zIndex = '-1');
//   }

//   onChangeMultiSelect = select => {
//     this.multiSelect = select;
//   }

//   onChangeTypeAhead = value => {
//     const { preferredCountries } = this.state
//     const filteredCountries = this.countries.filter((country) => {
//       const { name, countryCallingCodes } = country
//       const searchCriteria = `${name} ${countryCallingCodes.join(' ')}`
//       return new RegExp(escapeStringRegexp(value.trim()), 'gi').test(searchCriteria)
//     })
//     this.setState({ filteredCountries: value.trim() === '' ? preferredCountries : filteredCountries, searchTerm: value, tabbedIndex: -1 })
//   }

//   selectCountry = (country, mounted = false, multiSelect = false, onClick = false) => {
//     const { onChange } = this.props;
//     const { countryCallingCodes, alpha2 } = country;
//     const { phoneNumber, searchTerm } = this.state;

//     if (countryCallingCodes && countryCallingCodes.length > 1 && !multiSelect) {
//       return this.setState({ multiSelectOpen: true, multiSelectItem: country }, () => {
//         this.multiSelect.style.zIndex = '101'
//       });
//     }

//     const callingCode = multiSelect || (countryCallingCodes && countryCallingCodes[0]);
//     this.validatePhoneNumber(alpha2+phoneNumber);

//     this.setState({ selectedCountry: country, callingCode, open: false, tabbedIndex: -1, searchTerm: searchTerm.trim() }, () => {
//       this.cancelMultiSelect();
//       if (!mounted) {
//         // this.phoneInput.focus();
//         if (onChange) {
//           onChange(callingCode, phoneNumber);
//         }
//       }
//     })
//   }

//   pageClick = () => {
//     if (!this.mouseDownOnMenu) {
//       this.setState({ open: false, tabbedIndex: -1 }, () => {
//         this.countryDropdown.scrollTop = 0;
//       });
//       this.cancelMultiSelect();
//     }
//   }

//   onOpenHandler = () => {
//     const { open } = this.state;
//     this.setState({ open: !open });
//     if (!open) {
//       // this.phoneInput.focus();
//     } else {
//       this.setState({ tabbedIndex: -1 });
//     }
//   }

//   clearInput = () => {
//     const { open } = this.state;
//     if (open) {
//       this.setState({ searchTerm: '', filteredCountries: this.getPreferredCountries(), multiSelectItem: [], multiSelectOpen: false });
//     } else {
//       this.setState({ phoneNumber: '' });
//       this.cancelMultiSelect();
//     }
//     // this.phoneInput.focus();
//   }

//   mouseDownHandler = () => {
//     this.mouseDownOnMenu = true;
//   }

//   mouseUpHandler = () => {
//     this.mouseDownOnMenu = false;
//   }

//   componentWillReceiveProps = nextProps => {
//     const { reset, defaultValue } = nextProps;
//     if (reset || (this.props.defaultValue !== defaultValue)) {
//       this.propChangeHandler(nextProps, false, reset);
//     }
//   }

//   componentDidMount = () => {
//     window.addEventListener('mousedown', this._pageClick);
//     this.setState({ filteredCountries: this.getPreferredCountries() });
//   }

//   componentWillUnmount = () => {
//     window.removeEventListener('mousedown', this._pageClick);
//   }

//   getFlag = country => {
//     const { alpha2 } = country;
//     return (MISSING_FLAGS[alpha2] ? MISSING_FLAGS[alpha2] : alpha2.toUpperCase()) || 'WW';
//   } 

//   render() {
//     const { open, filteredCountries, selectedCountry, phoneNumber, searchTerm, message, paginateCount } = this.state;
//     const { removeToken, error, placeholder, inputClassName, paginate, errorText, style } = this.props;
//     const inputID = uuid.v4();
//     const flag = this.getFlag(selectedCountry);
//     let countryCode = "+1";
//     if (typeof selectedCountry !== "undefined" && selectedCountry.hasOwnProperty("countryCallingCodes")) {
//       countryCode = selectedCountry.countryCallingCodes[0];
//     }
//     // const countryCode = selectedCountry ? selectedCountry.countryCodes[0] : null;

//     return (
//       <div
//         style={{ 
//           position: 'relative',
//           height: "inherit",
//           boxShadow: open ? this.boxShadowStyle : null,
//           borderRightStyle: "solid",
//           borderRightWidth: 1,
//           borderRightColor: text.tertiary.dark,
//           ...style
//         }}
//         className={`intl-phone-input${open ? ' open' : ''}`}
//         onMouseDown={() => this.mouseDownHandler()}
//         onMouseUp={() => this.mouseUpHandler()}>
//         <div className='input-group' style={{ display: "flex", alignItems: "center", height: "inherit", borderWidth: 1, borderRadius: 2 }}>
//           <div
//             className='input-group-btn'
//             style={{ 
//               height: "inherit",
//               borderRight: text.tertiary.dark,
//               borderRightStyle: "solid",
//               borderWidth: 1
//             }}
//           >
//             <button
//               type='button'
//               tabIndex={0}
//               aria-hidden
//               style={{ height: "100%", border: "none", borderBottomLeftRadius: open ? 0 : null, transition: this.bgColorTransitionStyle, cursor: 'pointer' }}
//               className='btn btn-secondary btn-primary dropdown-toggle country-selector'
//               onClick={(e) => this.onOpenHandler(e)}>
//               {flag &&
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <FlagIcon code={flag} size={24} />
//                   <span style={{ fontSize: "1.2em", marginLeft: 10 }}>
//                     {countryCode}
//                   </span>
//                 </div>
//               }
//             </button>
//           </div>
//           {open && searchTerm.length > 0 &&
//             <span
//               aria-hidden='true'
//               className='remove-token-container'
//               style={{position: 'absolute', userSelect: 'none', zIndex: 10, fontSize: 26, right: 15, cursor: 'pointer'}}>
//               <span style={{cursor: 'pointer'}} onClick={() => this.clearInput()}>{removeToken}</span>
//             </span>
//           }
//           <label style={{display: "none"}}htmlFor={inputID} aria-hidden={!open} className='sr-only'>Please enter your country's calling code followed by your phone number</label>
//           <div id='validation-info' style={{display: "none"}} aria-hidden={!open} aria-live='assertive' className='sr-only'>
//             {message}. {(Object.keys(selectedCountry).length > 0 && selectedCountry.name) ? `You have entered a calling code for ${selectedCountry.name}.` : ''}
//           </div>
//           <TextField
//             style={{
//               width: "100%",
//               borderBottomLeftRadius: open ? 0 : null,
//               borderBottomRightRadius: open ? 0 : null,
//               marginLeft: 10,
//               marginRight: 38
//             }}
//             error={error}
//             helperText={error ? errorText : ''}
//             id={inputID}
//             autoComplete={'off'}
//             aria-describedby={'validation-info'}
//             className={`form-control phone-input${inputClassName ? inputClassName : ''}`}
//             placeholder={open ? '555-555-5555' : placeholder}
//             onKeyDown={(e) => this.onKeyDown(e)}
//             value={open ? searchTerm : phoneNumber}
//             onChange={(e) => open ? this.onChangeTypeAhead(e.target.value) : this.onChangeText(e.target.value)}
//           />
//         </div>
//         <CountryList
//           filteredCountries={filteredCountries}
//           onSelectCountry={(country, arg1, arg2, arg3) => this.selectCountry(country, arg1, arg2, arg3)}
//           open={open}
//           paginate={paginate}
//           paginateCount={paginateCount}
//           handleMultiSelect={this.onChangeMultiSelect}
//           setCountryDropDown={this.setDropDown}
//           style={{ position: "absolute", bottom: 0 }}
//         />
//       </div>
//     )
//   }
// }
