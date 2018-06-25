const fakeAddress = {
  fullName: 'Steve Jobs',
  streetAddress1: 'One Infinite Loop',
  streetAddress2: '',
  city: 'Cupertino',
  countryCode: 'US',
  postalCode: '95014',
  province: 'CA',
  phone: '123.456.7890',
};

const blankAddress = {
  fullName: '',
  streetAddress1: '',
  streetAddress2: '',
  city: '',
  // everything is province for easier use
  province: '',
  // everything is postalCode for easier use
  postalCode: '',
  // must define default country **important**
  countryCode: 'US',
};

const initialAddress =
  process.env.NODE_ENV === 'development' ? fakeAddress : blankAddress;

const addressReducer = (slice) => (state = initialAddress, action) => {
  if (action.slice !== slice) return state;

  switch (action.type) {
    case 'UPDATE_ADDRESS_FIELD':
      return {
        ...state,
        [action.key]: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
