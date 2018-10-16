// const object = {
// 	AddressValidateResponse: {
// 		Address: [
// 			{
// 				$: { ID: '0' },
// 				Address2: ['1 INFINITE LOOP'],
// 				City: ['CUPERTINO'],
// 				State: ['CA'],
// 				Zip5: ['95014'],
// 				Zip4: ['2083'],
// 			},
// 		],
// 	},
// };

const simplifyObject = (obj) => {
  const hash = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'object') {
      hash[key] === obj[key];
    } else if (Array.isArray(obj[key])) {
      const arr = obj[key];
      hash[key] = arr.length <= 1 ? arr[0] : arr;
    } else {
      simplifyObject(obj[key]);
    }
  });

  console.log(hash);
  return hash;
};

export default simplifyObject;
