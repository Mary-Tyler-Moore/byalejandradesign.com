import parseXML from '../parse-xml-promise';

const xml =
  '<?xml version="1.0" encoding="UTF-8"?><AddressValidateResponse><Address ID="0"><Address2>1 INFINITE LOOP</Address2><City>CUPERTINO</City><State>CA</State><Zip5>95014</Zip5><Zip4>2083</Zip4></Address></AddressValidateResponse>';

const expectJSON = {
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

test('it returns a promise', () => {
  expect(parseXML(xml)).toHaveProperty('then');
});

test('it resolves the data correctly', async () => {
  try {
    const json = await parseXML(xml);
    expect(json).toMatchObject(expectJSON);
  } catch (e) {
    console.log(e);
  }
});
