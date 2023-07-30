// jest.config.js
export default {
    verbose: true,
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.js"],
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
      "^mongoose$": "<rootDir>/node_modules/mongoose"
    },
};
