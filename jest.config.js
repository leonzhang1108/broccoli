/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const path = require("path")

module.exports = {
  rootDir: path.join(__dirname, '.'),
  moduleNameMapper: {
    "^.+\\.(css|scss|less)$": "identity-obj-proxy",
    '^@/(.*)$': '<rootDir>/src/$1',
    'components/(.*)$': '<rootDir>/src/components/$1',
  },
  setupFiles: [
    "<rootDir>/test/jestsetup.js"
  ],
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
}