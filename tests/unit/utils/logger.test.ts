import { logInfo, logError } from '../../../src/utils/logger';

describe('Logger Utilities', () => {
  const message = 'Test message';
  const context = 'test';

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('logInfo should log an info message', () => {
    logInfo(message, context);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  test('logError should log an error message', () => {
    const error = new Error('Test error');
    logError(error, context);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Test error'));
  });
});