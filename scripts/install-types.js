const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const directory = require('@njmyers/directory');
const { pipeAsync } = require('smalldash');

const packages = fs.readdirSync(path.resolve(__dirname, '../packages'));

const dependencies = []
  .concat(
    ...packages.map((pkg) =>
      directory(path.resolve(__dirname, '../packages', pkg), {
        recursive: false,
        filter: '.json',
        read: true,
      })
    )
  )
  .filter((obj) => /package.json/.test(obj.path))
  .map((obj) => JSON.parse(obj.file))
  .map((obj) => ({
    ...(obj.dependencies || {}),
    ...(obj.peerDependencies || {}),
  }))
  .reduce((prevObj, nextObj) => ({ ...prevObj, ...(nextObj || {}) }), {});

const pipeline = pipeAsync(
  ...Object.entries(dependencies).map((entry) => () =>
    new Promise((res, rej) => {
      const [pkg, version] = entry;

      const proc = spawn('flow-typed', ['install', '-s', `${pkg}@${version}`], {
        stdio: 'inherit',
      });

      proc.on('close', (code) => {
        res(code);
      });
    })
  )
);

pipeline()
  .then(() => console.log('all types installed'))
  .catch((error) => console.log(error));
