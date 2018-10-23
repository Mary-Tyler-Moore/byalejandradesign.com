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
  .map((obj) => ({ ...obj, json: JSON.parse(obj.file) }))
  .map((obj) => ({
    ...obj,
    dependencies: {
      ...(obj.json.dependencies || {}),
      ...(obj.json.peerDependencies || {}),
    },
  }))
  .map((obj) => ({
    dependencies: Object.entries(obj.dependencies),
    path: obj.path.split('/package.json')[0],
  }))
  .reduce(
    (prevDeps, nextPackage) => [
      ...prevDeps,
      ...nextPackage.dependencies.map((entry) => ({
        pkg: entry[0],
        version: entry[1],
        cwd: nextPackage.path,
      })),
    ],
    []
  );

const pipeline = pipeAsync(
  ...dependencies.map(({ pkg, version, cwd }) => () =>
    new Promise((res, rej) => {
      const proc = spawn('flow-typed', ['install', '-s', `${pkg}@${version}`], {
        stdio: 'inherit',
        cwd,
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
