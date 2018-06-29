import canadianProvinces from './canada/provinces.json';
import USStates from './usa/states.json';

const countries = {
  US: {
    name: 'USA',
    countryCode: 'US',
    provincialKey: 'state',
    provinces: USStates,
  },
  CA: {
    name: 'Canada',
    countryCode: 'CA',
    provincialKey: 'province',
    provinces: canadianProvinces,
  },
};

export default countries;
