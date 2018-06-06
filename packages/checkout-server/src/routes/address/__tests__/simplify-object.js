import simplifyObject from '../simplify-object';

const object = {
	AddressValidateResponse: {
		Address: [
			{
				$: { ID: '0' },
				Address2: ['1 INFINITE LOOP'],
				City: ['CUPERTINO'],
				State: ['CA'],
				Zip5: ['95014'],
				Zip4: ['2083'],
			},
		],
	},
};

const expectedObject = {
	AddressValidateResponse: {
		Address: {
			$: { ID: '0' },
			Address2: '1 INFINITE LOOP',
			City: 'CUPERTINO',
			State: 'CA',
			Zip5: '95014',
			Zip4: '2083',
		},
	},
};

test('expect array items of length one to be simplified to strings', () => {
	expect(simplifyObject(object)).toMatchObject(expectedObject);
});
