module.exports = {
    testEnvironment: "jsdom",
    setupFiles: ['<rootDir>/spec/jest/setupFiles/'],
    moduleNameMapper: {
        "~/(.*)$": "<rootDir>/$1",
        "Actions/(.*)$": "<rootDir>/src/actions/$1",
        "Components/(.*)$": "<rootDir>/src/components/$1",
        "Helpers/(.*)$": "<rootDir>/src/helpers/$1",
    },
}


