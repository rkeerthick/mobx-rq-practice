/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleDirectories: ["node_modules", "bower_components"],
  //   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  errorOnUnhandledRejection: false,
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy",
    "^@/(.+)": "<rootDir>/src/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
    "module_name_(.*)": "<rootDir>/substituted_module_$1.js",
    "assets/(.*)": [
      "<rootDir>/src/assets/$1",
    ],
    moduleFileExtensions: [
      "js",
      "mjs",
      "cjs",
      "jsx",
      "ts",
      "tsx",
      "json",
      "node",
    ],
  },
};
