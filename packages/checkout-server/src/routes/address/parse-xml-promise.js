import Promise from 'bluebird';
import { parseString } from 'xml2js';

const parseXML = (xml) =>
  new Promise((res, rej) => {
    parseString(xml, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });

export default parseXML;
