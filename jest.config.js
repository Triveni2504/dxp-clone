// export default {
//     testEnvironment: 'jsdom',
//     transform: {
//       '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to transform TypeScript and JSX files
//     },
//     moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
//     setupFilesAfterEnv: ['@testing-library/jest-dom'], // Add jest-dom for custom matchers
//   };

//   export default {
//     testEnvironment: 'jest-environment-jsdom', // Use the installed jsdom environment
//     transform: {
//       '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to transform TypeScript and JSX files
//     },
//     moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
//     setupFilesAfterEnv: ['@testing-library/jest-dom'], // Add jest-dom for custom matchers
//   };


  export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Add jest-dom setup file
  };