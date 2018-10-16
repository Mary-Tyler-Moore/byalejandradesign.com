// @flow
import bodyParser from 'body-parser';

const urlEncoded = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();

export default [urlEncoded, json];
