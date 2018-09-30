module.exports = {
  rootDir: "../..",
  setupTestFrameworkScriptFile: "<rootDir>/config/jest/setupEnzyme.js",
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testRegex: "(test).(ts|tsx|js)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  moduleNameMapper: {
    "\\.(css|pcss)$": "identity-obj-proxy"
  }
};
