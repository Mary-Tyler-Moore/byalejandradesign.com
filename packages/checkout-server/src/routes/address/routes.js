import USPS from './USPS';
import parseXML from './parse-xml-promise';

const mapShippingAddressToUSPS = ({
  fullName,
  streetAddress1,
  streetAddress2,
  city,
  countryCode,
  postalCode,
  province,
  phone,
}) => ({
  address1: streetAddress1,
  address2: streetAddress2,
  city,
  state: province,
  zip5: postalCode,
});

const routes = (app) => {
  app.post('/address_validation', async (req, res) => {
    try {
      const address = req.body;
      const { data } = await USPS(mapShippingAddressToUSPS(address));
      console.log(data);
      const json = await parseXML(data);
      console.log(json);

      res.status(200).json({
        status: 200,
        ...json,
      });
    } catch (e) {
      res.status(404).json({
        status: 404,
        message: e,
      });
    }
  });
};

export default routes;
