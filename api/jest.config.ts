import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/modules/.*?/dtos/.*\\.ts$',
    '<rootDir>/src/modules/.*?/infra/typeorm/entities/.*\\.ts$',
    '<rootDir>/src/shared/infra/typeorm/migrations/.*\\.ts$',
    '<rootDir>/src/shared/infra/http/routes/.*\\.ts$',
    '<rootDir>/src/shared/infra/config/.*\\.ts$',
    '<rootDir>/src/shared/infra/http/app.ts$',
  ],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
};

export default config;
