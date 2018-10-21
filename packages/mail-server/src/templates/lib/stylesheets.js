/** @flow */
const stylesheets = (args: string | Array<string>): string => {
  const sheets = Array.isArray(args) ? args : [args];

  return sheets
    .map((sheet) => `<link href="${sheet}" rel="stylesheet" type="text/css">`)
    .reduce((prevString, string) => `${prevString}\n    ${string}`);
};

export default stylesheets;
