//@ts-check
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig.json');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
    testMatch: [
        '**/+(*.)+(spec|test).+(ts|js)?(x)'
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageProvider: 'v8',
    coverageDirectory: '../coverage',
    coverageThreshold: {
        global: {
            'branches': 80,
            'functions': 80,
            'lines': 80,
            'statements': 80
        }
    },
    roots: [
        '<rootDir>/../shared/'
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/../'
    })
};