import axios from 'axios';

/* Axios API Stub Method */
const api = axios.create({
	baseURL: 'http://production.shippingapis.com/ShippingAPITest.dll',
});

const createXMLRequest = ({
	userID = process.env.USPS_USER_ID,
	addressID = 0,
	address1,
	address2,
	city,
	state,
	zip5,
	zip4,
}) =>
	`<AddressValidateRequest USERID="${userID}"><Address ID="${addressID}"><Address1>${address1}</Address1><Address2>${address2}</Address2><City>${city}</City><State>${state}</State><Zip5>${zip5}</Zip5><Zip4>${zip4}</Zip4></Address></AddressValidateRequest>`;

export default (query) => {
	const URL = `?API=Verify&XML=${createXMLRequest(query)}`;
	return api.get(URL);
};
