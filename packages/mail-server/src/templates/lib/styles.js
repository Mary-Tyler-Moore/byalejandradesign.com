/** @flow */
import path from 'path';
import fs from 'fs';

const styles = (rootPath) => {
  const rootPaths = Array.isArray(rootPath) ? rootPath : [rootPath];

  return []
    .concat(
      ...rootPaths
        .map((rootPath) => path.resolve(__dirname, '../', rootPath))
        .map((absolutePath) => fs.readFileSync(absolutePath, 'utf8').toString())
    )
    .reduce((prevString, string) => `${prevString}${string}`, '');
};

export default styles;
