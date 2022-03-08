/* eslint-disable import/no-extraneous-dependencies */
const { initPlugin: snapshotInit } = require('cypress-plugin-snapshots/plugin');
const coverageInit = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  snapshotInit(on, config);
  coverageInit(on, config);

  return {
    ...config,
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
  };
};
