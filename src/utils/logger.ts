// Log levels for better categorization
type LogLevel = 'info' | 'warn' | 'error';

// Base logger function
const log = (level: LogLevel, message: string, context?: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = context
    ? `[${timestamp}] [${level.toUpperCase()}] [${context}] ${message}`
    : `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  switch (level) {
    case 'info':
      console.log(logMessage);
      break;
    case 'warn':
      console.warn(logMessage);
      break;
    case 'error':
      console.error(logMessage);
      break;
    default:
      console.log(logMessage);
  }
};

// Log informational messages
export const logInfo = (message: string, context?: string) => {
  log('info', message, context);
};

// Log warning messages
export const logWarn = (message: string, context?: string) => {
  log('warn', message, context);
};

// Log error messages
export const logError = (error: any, context?: string) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  log('error', errorMessage, context);

  // Optionally log the full error stack for debugging
  if (error instanceof Error && error.stack) {
    log('error', error.stack, context);
  }
};

// Log messages with context (e.g., user messages)
export const logMessage = (message: string, context?: string) => {
  log('info', message, context);
};