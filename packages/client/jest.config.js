import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(scss|jpg|png|gif|svg)$': '<rootDir>/file.mock.js',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^router(.*)$': '<rootDir>/src/router$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
  },
};
