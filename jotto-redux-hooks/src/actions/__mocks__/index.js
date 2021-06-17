// NOTE - __mocks__ folder must be at the same level as the files that are using them
// except for mocking node_modules with create-react-app - https://github.com/facebook/create-react-app/issues/7539
// to avoid global mocks from resetting beforeEach test, see this comment - https://github.com/facebook/jest/issues/9131#issuecomment-668790615
module.exports = {
  ...jest.requireActual(".."),
  __esModule: true,
  getSecretWord: jest.fn().mockReturnValue({ type: "mock" }),
};
